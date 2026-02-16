import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/tspProductDetails.json");
const OUT_ROOT = path.join(ROOT, "public/assets/products");
const PUBLIC_PREFIX = "/assets/products";

const UPLOAD_RE = /https?:\/\/www\.tspco\.jp\/wp-content\/uploads\/[^"'<>\s)]+/g;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sanitizeSegment(input) {
  return String(input || "")
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "item";
}

function basenameFromUrl(url) {
  const clean = String(url || "").split("?")[0].split("#")[0];
  const base = path.basename(clean);
  return base || "image.png";
}

async function downloadToFile(url, outPath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

function collectUrls(entry) {
  const urls = new Set();
  if (entry.cardImage && /^https?:\/\//.test(entry.cardImage)) {
    urls.add(entry.cardImage);
  }
  for (const img of entry.detailImages || []) {
    if (/^https?:\/\//.test(img)) urls.add(img);
  }
  const html = entry.detailHtml || "";
  for (const m of html.matchAll(UPLOAD_RE)) {
    urls.add(m[0]);
  }
  return [...urls];
}

async function main() {
  ensureDir(OUT_ROOT);
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const data = JSON.parse(raw);
  const globalMap = new Map();
  let downloaded = 0;
  let reused = 0;
  let failed = 0;

  for (const [key, entry] of Object.entries(data)) {
    const folder = sanitizeSegment(entry.model || entry.productName || key);
    const modelDir = path.join(OUT_ROOT, folder);
    ensureDir(modelDir);

    const urls = collectUrls(entry);
    for (const url of urls) {
      if (!/https?:\/\/www\.tspco\.jp\/wp-content\/uploads\//.test(url)) continue;
      if (globalMap.has(url)) continue;

      const fileName = sanitizeSegment(basenameFromUrl(url).replace(/\.(png|jpe?g|webp|gif|avif)$/i, "")) +
        path.extname(basenameFromUrl(url)).toLowerCase();
      const outPath = path.join(modelDir, fileName);
      const publicPath = `${PUBLIC_PREFIX}/${folder}/${fileName}`;

      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
        globalMap.set(url, publicPath);
        reused += 1;
        continue;
      }

      try {
        await downloadToFile(url, outPath);
        globalMap.set(url, publicPath);
        downloaded += 1;
      } catch (err) {
        failed += 1;
        // keep original URL when download fails
      }
    }
  }

  // Rewrite JSON paths.
  for (const entry of Object.values(data)) {
    if (entry.cardImage && globalMap.has(entry.cardImage)) {
      entry.cardImage = globalMap.get(entry.cardImage);
    }
    entry.detailImages = (entry.detailImages || []).map((img) => globalMap.get(img) || img);
    if (entry.detailHtml) {
      entry.detailHtml = entry.detailHtml.replace(UPLOAD_RE, (url) => globalMap.get(url) || url);
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(
    `Mirroring complete. downloaded=${downloaded} reused=${reused} failed=${failed} mapped=${globalMap.size}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

