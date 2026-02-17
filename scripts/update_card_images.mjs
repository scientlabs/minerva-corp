import fs from "node:fs";
import path from "node:path";
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/tspProductDetails.json");

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

function parseTSPProductsPage(html) {
  const products = {};
  // Split HTML into lines or find blocks
  // Find all img followed by a link or vice versa
  const blocks = html.split(/### \[/);
  for (const block of blocks) {
    const imgMatch = block.match(/<img[^>]*src="([^"]*)"[^>]*>/i);
    const linkMatch = block.match(/<a[^>]*href="([^"]*\/products\/[^"]*)"[^>]*>/i);
    if (imgMatch && linkMatch) {
      const imgSrc = imgMatch[1];
      const url = linkMatch[1];
      const urlMatch = url.match(/\/products\/([^\/]+)/);
      if (urlMatch && imgSrc.includes('wp-content/uploads')) {
        const slug = urlMatch[1];
        products[slug] = {
          url: url.startsWith('http') ? url : `https://www.tspco.jp${url}`,
          cardImage: imgSrc
        };
      }
    }
  }
  return products;
}

async function updateCardImages() {
  const html = fetch('https://www.tspco.jp/products/');
  if (!html) return;

  // Parse HTML for product cards
  const products = {};
  // Find all div or article with product info
  const productBlocks = html.split(/### \[/).slice(1);
  for (const block of productBlocks) {
    const linkMatch = block.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const imgMatch = block.match(/!\[.*?\]\(([^)]+)\)/);
    if (linkMatch && imgMatch) {
      const name = linkMatch[1];
      const url = linkMatch[2];
      const imgSrc = imgMatch[1];
      const urlMatch = url.match(/\/products\/([^\/]+)/);
      if (urlMatch && imgSrc.includes('wp-content/uploads')) {
        const slug = urlMatch[1];
        products[slug] = {
          url: url,
          cardImage: imgSrc
        };
      }
    }
  }
  console.log('Parsed TSP products:', Object.keys(products));

  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  for (const key in data) {
    const product = data[key];
    if (product.pageUrl && product.pageUrl.includes('tspco.jp/products/')) {
      const urlMatch = product.pageUrl.match(/\/products\/([^\/]+)/);
      if (urlMatch) {
        const slug = urlMatch[1];
        if (products[slug]) {
          const cardImageUrl = products[slug].cardImage;
          if (cardImageUrl) {
            // Download the card image
            const fileName = path.basename(cardImageUrl);
            const folderName = product.model.toLowerCase().replace(/\//g, '-').replace(/\s+/g, '-');
            const localPath = path.join(ROOT, 'public/assets/products', folderName, fileName);
            if (!fs.existsSync(localPath)) {
              console.log(`Downloading card image ${cardImageUrl} to ${localPath}`);
              try {
                execSync(`curl -L --retry 2 --retry-delay 1 --connect-timeout 10 --max-time 30 '${cardImageUrl}' -o '${localPath}'`, {
                  stdio: 'inherit'
                });
              } catch (e) {
                console.error(`Failed to download ${cardImageUrl}`);
                continue;
              }
            }
            product.cardImage = `/assets/products/${folderName}/${fileName}`;
          }
        }
      }
    }
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Card images updated.");
}

updateCardImages().catch((err) => {
  console.error(err);
  process.exit(1);
});