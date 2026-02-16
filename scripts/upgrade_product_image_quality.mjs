import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/tspProductDetails.json");
const PUBLIC_ROOT = path.join(ROOT, "public");
const PREFIX = "/assets/products/";

function tryHighResName(fileName) {
  return fileName.replace(/-\d+x\d+(?=\.(png|jpe?g|webp|gif|avif)$)/i, "");
}

async function download(url, outPath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return true;
}

function getModelFolderFromLocalPath(localPath) {
  const parts = localPath.split("/").filter(Boolean);
  // /assets/products/<model>/<file>
  if (parts.length < 4) return "";
  return parts[2];
}

async function ensureHighRes(localPath) {
  if (!localPath.startsWith(PREFIX)) return null;
  const localFsPath = path.join(PUBLIC_ROOT, localPath.replace(/^\//, ""));
  const fileName = path.basename(localFsPath);
  const highResName = tryHighResName(fileName);
  if (highResName === fileName) return null;

  const modelFolder = getModelFolderFromLocalPath(localPath);
  if (!modelFolder) return null;
  const highResLocalPath = `${PREFIX}${modelFolder}/${highResName}`;
  const highResFsPath = path.join(PUBLIC_ROOT, highResLocalPath.replace(/^\//, ""));

  if (fs.existsSync(highResFsPath) && fs.statSync(highResFsPath).size > 0) {
    return highResLocalPath;
  }

  const remoteUrl = `https://www.tspco.jp/wp-content/uploads/${encodeURI(highResName)}`;
  const ok = await download(remoteUrl, highResFsPath);
  return ok ? highResLocalPath : null;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  let upgraded = 0;

  for (const entry of Object.values(data)) {
    if (entry.cardImage) {
      const high = await ensureHighRes(entry.cardImage);
      if (high) {
        entry.cardImage = high;
        upgraded += 1;
      }
    }

    if (Array.isArray(entry.detailImages)) {
      const next = [];
      for (const img of entry.detailImages) {
        const high = await ensureHighRes(img);
        if (high) {
          next.push(high);
          upgraded += 1;
        } else {
          next.push(img);
        }
      }
      entry.detailImages = Array.from(new Set(next));
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`Image quality upgrade complete. upgraded=${upgraded}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

