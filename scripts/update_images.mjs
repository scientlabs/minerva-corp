import fs from "node:fs";
import path from "node:path";
import { execSync } from 'node:child_process';
import crypto from "node:crypto";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/tspProductDetails.json");
const PUBLIC_ROOT = path.join(ROOT, "public");
const CACHE_ROOT = path.join(PUBLIC_ROOT, "assets/products_cache");
const HASH_INDEX_PATH = path.join(CACHE_ROOT, "hash_index.json");

function fetch(url) {
  try {
    return execSync(`curl -Ls --retry 2 --retry-delay 1 --connect-timeout 10 --max-time 30 '${url}'`, {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024
    });
  } catch (e) {
    console.error(`Failed to fetch ${url}: ${e.message}`);
    return '';
  }
}

function collectUploadImageUrls(html) {
  const candidates = [];
  const attrPatterns = [
    /(?:src|data-src|data-lazy-src|data-large-image|data-thumb|href)\s*=\s*"([^"]+)"/gi,
    /(?:src|data-src|data-lazy-src|data-large-image|data-thumb|href)\s*=\s*'([^']+)'/gi
  ];
  for (const re of attrPatterns) {
    for (const m of html.matchAll(re)) {
      candidates.push(m[1]);
    }
  }
  for (const m of html.matchAll(/https?:\/\/www\.tspco\.jp\/wp-content\/uploads\/[^\s"'<>\\)]+/gi)) {
    candidates.push(m[0]);
  }
  for (const m of html.matchAll(/\/wp-content\/uploads\/[^\s"'<>\\)]+/gi)) {
    candidates.push(`https://www.tspco.jp${m[0]}`);
  }
  return candidates
    .map((u) => u.replace(/\\\//g, '/'))
    .map((u) => u.replace(/&amp;/g, '&'))
    .map((u) => (u.startsWith('http') ? u : `https://www.tspco.jp${u.startsWith('/') ? '' : '/'}${u}`))
    .map((u) => u.split('#')[0])
    .map((u) => u.replace(/\?.*$/, ''))
    .filter((u) => /\/wp-content\/uploads\//i.test(u))
    .filter((u) => /\.(png|jpe?g|webp|gif|avif)$/i.test(u))
    .filter((u) => !/no-image-logo|head_logo|logo|cropped-|icon-|favicon|scrolldpwn_circle/i.test(u))
    .filter((u, i, arr) => arr.indexOf(u) === i);
}

async function download(url, outPath) {
  try {
    execSync(`curl -L --retry 2 --retry-delay 1 --connect-timeout 10 --max-time 30 "${url}" -o "${outPath}"`, {
      stdio: 'inherit'
    });
    return fs.existsSync(outPath) && fs.statSync(outPath).size > 0;
  } catch (e) {
    console.error(`Failed to download ${url}: ${e.message}`);
    return false;
  }
}

function getFolderName(model) {
  return model.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');
}

function loadHashIndex() {
  if (!fs.existsSync(HASH_INDEX_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(HASH_INDEX_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveHashIndex(index) {
  fs.writeFileSync(HASH_INDEX_PATH, JSON.stringify(index, null, 2) + "\n", "utf8");
}

function fileSha256(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function safeLinkOrCopy(fromPath, toPath) {
  if (fs.existsSync(toPath)) return;
  try {
    fs.linkSync(fromPath, toPath);
  } catch {
    fs.copyFileSync(fromPath, toPath);
  }
}

function pickCanonicalName(url) {
  const remoteName = path.basename(url).replace(/\?.*$/, '');
  const lower = remoteName.toLowerCase();
  // For known line images, prefer non-resized canonical names.
  return lower.replace(/-(\d+)x(\d+)(?=\.(png|jpe?g|webp|gif|avif)$)/i, "");
}

function buildDownloadCandidates(url) {
  const original = url.replace(/-(\d+)x(\d+)(?=\.(png|jpe?g|webp|gif|avif)$)/i, "");
  if (original !== url) return [original, url];
  return [url];
}

async function updateProductImages(product) {
  const { pageUrl, model } = product;
  if (!pageUrl || !model) return;

  const folderName = getFolderName(model);
  const folderPath = path.join(PUBLIC_ROOT, "assets/products", folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const html = fetch(pageUrl);
  if (!html) return;

  const imageUrls = collectUploadImageUrls(html);
  const downloaded = [];

  if (!fs.existsSync(CACHE_ROOT)) fs.mkdirSync(CACHE_ROOT, { recursive: true });
  const hashIndex = loadHashIndex();

  for (const url of imageUrls) {
    const fileName = pickCanonicalName(url);
    if (!fileName) {
      console.warn(`Skipping ${url} — no filename`);
      continue;
    }
    const cachePath = path.join(CACHE_ROOT, fileName);

    // Try original-size URL first, then fallback to the resized URL if needed.
    let ok = false;
    const tryUrls = buildDownloadCandidates(url);
    for (const tryUrl of tryUrls) {
      console.log(`Downloading ${tryUrl} to cache ${cachePath}`);
      ok = await download(tryUrl, cachePath);
      if (ok) break;
    }
    if (!ok) {
      console.warn(`Skipping ${url} — failed to download to cache`);
      continue;
    }

    const hash = fileSha256(cachePath);
    const indexedName = hashIndex[hash];
    let canonicalCachePath = cachePath;
    if (indexedName && indexedName !== fileName && fs.existsSync(path.join(CACHE_ROOT, indexedName))) {
      canonicalCachePath = path.join(CACHE_ROOT, indexedName);
    } else {
      hashIndex[hash] = fileName;
      canonicalCachePath = cachePath;
    }

    // link or copy into product folder so each product keeps its own filenames
    const localPath = path.join(folderPath, fileName);
    safeLinkOrCopy(canonicalCachePath, localPath);
    downloaded.push(`/assets/products/${folderName}/${fileName}`);
  }
  saveHashIndex(hashIndex);

  // Update cardImage: pick the card image, prefer _s.png or model match
  const modelSlug = model.toLowerCase().replace(/\//g, '-');
  const cardCandidate = downloaded.find(d => d.includes('_s.png') && d.includes(modelSlug)) ||
                        downloaded.find(d => d.includes(modelSlug) && !d.includes('_ai') && !d.includes('_yk') && !d.includes('_at') && !d.includes('_set') && !d.includes('_line'));
  if (cardCandidate) {
    product.cardImage = cardCandidate;
  } else {
    // Fallback to first
    product.cardImage = downloaded[0];
  }

  // Update detailImages: all downloaded (unique, preserve order)
  product.detailImages = Array.from(new Set(downloaded));

  console.log(`Updated ${model}: ${downloaded.length} images`);
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const tspProducts = Object.values(data).filter(p => p.pageUrl && p.pageUrl.includes('tspco.jp'));

  for (const product of tspProducts) {
    await updateProductImages(product);
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Image update complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
