import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/tspProductDetails.json");

function cleanImages(images) {
  return images.filter(img => !/-300x200\./.test(img));
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  for (const key in data) {
    const product = data[key];
    if (product.detailImages) {
      product.detailImages = cleanImages(product.detailImages);
    }
    if (product.cardImage && /-300x200\./.test(product.cardImage)) {
      // Find a replacement without -300x200
      const replacement = product.detailImages.find(img => !/-300x200\./.test(img));
      if (replacement) {
        product.cardImage = replacement;
      } else {
        // If no other, keep it, but since we deleted files, perhaps remove
        delete product.cardImage;
      }
    }
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("JSON cleaned of low res images.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});