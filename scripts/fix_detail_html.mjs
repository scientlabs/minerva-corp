import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/tspProductDetails.json");

function getFolderName(model) {
  return model.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');
}

function toHtmlString(html) {
  if (Array.isArray(html)) return html.join("\n");
  return html || "";
}

function toReadableHtmlArray(html) {
  if (!html) return [];
  return html
    .replace(/\r\n?/g, "\n")
    .replace(/>\s*</g, ">\n<")
    .replace(/(<br\s*\/?>)/gi, "$1\n")
    .replace(/\n{2,}/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function updateDetailHtml(html, model) {
  if (!html) return html;
  const folderName = getFolderName(model);
  return html.replace(/<img\s+[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/gi, (tag, src) => {
    if (src.startsWith('/assets/products/')) {
      const parts = src.split('/');
      if (parts.length >= 4) {
        const fileName = parts[parts.length - 1];
        // Capitalize the filename to match the downloaded files
        const newFileName = fileName.replace(/^tsp/, 'TSP').replace(/-p1/g, '-P1').replace(/-0211/g, '-0211').replace(/_p1/g, '_P1').replace(/_0211/g, '_0211').replace(/_ai/g, '_AI').replace(/_yk/g, '_yk').replace(/_at/g, '_at').replace(/_set/g, '_set').replace(/_ph01_s/g, '_ph01_s').replace(/_line/g, '_LINE').replace(/_line2/g, '_LINE2');
        parts[parts.length - 1] = newFileName;
        const newSrc = parts.join('/');
        return tag.replace(src, newSrc);
      }
    } else if (src.includes('tspco.jp')) {
      const url = new URL(src);
      const fileName = path.basename(url.pathname);
      let normalizedFileName = fileName.toLowerCase().replace(/-(\d+)x(\d+)\./, '.$1');
      // If it's a low res line image, use the high res _500.png
      if (normalizedFileName.includes('line')) {
        normalizedFileName = normalizedFileName.replace(/line\.\d+png$/, '_500.png');
      }
      const newSrc = `/assets/products/${folderName}/${normalizedFileName}`;
      return tag.replace(src, newSrc);
    }
    return tag;
  });
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  for (const key in data) {
    const product = data[key];
    if (product.detailHtml) {
      const html = toHtmlString(product.detailHtml);
      const updated = updateDetailHtml(html, product.model);
      product.detailHtml = toReadableHtmlArray(updated);
    }
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Detail HTML updated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
