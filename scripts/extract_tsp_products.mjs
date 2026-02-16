import { execSync } from 'node:child_process';
import fs from 'node:fs';

const categoryUrls = [
  'https://www.tspco.jp/products_category/security_camera_system/',
  'https://www.tspco.jp/products_category/access_control_system/',
  'https://www.tspco.jp/products_category/network_devices_and_peripherals/',
  'https://www.tspco.jp/products_category/network_devices/'
];
const extraProductUrls = [
  'https://www.tspco.jp/products/poeinjector/',
  'https://www.tspco.jp/products/tsp-pm1418/',
  'https://www.tspco.jp/products/ultralongrange_extenderkit/',
  'https://www.tspco.jp/products/outdoor_poeswitch/'
];

function fetch(url) {
  return execSync(`curl -Ls --retry 2 --retry-delay 1 --connect-timeout 10 --max-time 30 '${url}'`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024
  });
}

function decodeHtml(str = '') {
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function stripTags(str = '') {
  return decodeHtml(str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
}

function normalizeSrc(html = '') {
  return html.replace(/src="\/(wp-content\/uploads\/[^\"]+)"/g, 'src="https://www.tspco.jp/$1"');
}

function collectUploadImageUrls(raw = '') {
  const text = raw || '';
  const candidates = [];

  const attrPatterns = [
    /(?:src|data-src|data-lazy-src|data-large-image|data-thumb|href)\s*=\s*"([^"]+)"/gi,
    /(?:src|data-src|data-lazy-src|data-large-image|data-thumb|href)\s*=\s*'([^']+)'/gi
  ];
  for (const re of attrPatterns) {
    for (const m of text.matchAll(re)) {
      candidates.push(m[1]);
    }
  }

  for (const m of text.matchAll(/https?:\/\/www\.tspco\.jp\/wp-content\/uploads\/[^\s"'<>\\)]+/gi)) {
    candidates.push(m[0]);
  }

  for (const m of text.matchAll(/\/wp-content\/uploads\/[^\s"'<>\\)]+/gi)) {
    candidates.push(`https://www.tspco.jp${m[0]}`);
  }

  return candidates
    .map((u) => decodeHtml(String(u || '')))
    .map((u) => u.replace(/\\\//g, '/'))
    .map((u) => u.replace(/&amp;/g, '&'))
    .map((u) => (u.startsWith('http') ? u : `https://www.tspco.jp${u.startsWith('/') ? '' : '/'}${u}`))
    .map((u) => u.split('#')[0])
    .map((u) => u.replace(/\?.*$/, ''))
    .filter((u) => /\/wp-content\/uploads\//i.test(u))
    .filter((u) => /\.(png|jpe?g|webp|gif|avif)$/i.test(u))
    .filter((u) => !/no-image-logo|head_logo|logo|cropped-|icon-|favicon/i.test(u))
    .filter((u, i, arr) => arr.indexOf(u) === i);
}

function extractByRegex(html, re) {
  const m = html.match(re);
  return m ? decodeHtml(m[1]) : '';
}

function extractProduct(html, pageUrl) {
  const compact = html.replace(/\r?\n/g, ' ');

  const pageModel = extractByRegex(compact, /<h1 class="title first"><span>(.*?)<\/span><\/h1>/i) ||
    extractByRegex(compact, /<title>(.*?)\|/i);

  const detailTitle = extractByRegex(compact, /<h2 class="ttl ttl_products">(.*?)<\/h2>/i);

  const dlBlock = (compact.match(/<h2 class="ttl ttl_products">[\s\S]*?<dl>([\s\S]*?)<\/dl>/i) || [,''])[1];
  const dts = [...dlBlock.matchAll(/<dt>(.*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/gi)].map((m) => ({
    key: stripTags(m[1]).replace(/：$/, ''),
    value: stripTags(m[2])
  }));
  const detailMap = Object.fromEntries(dts.map((d) => [d.key, d.value]));

  const productName = detailMap['製品名'] || pageModel;
  const model = detailMap['型番'] || pageModel;
  const supportedFunction = detailMap['対応機能'] || detailTitle;

  const detailImage = extractByRegex(compact, /<div class="detail_image">[\s\S]*?<img[^>]+src="(.*?)"/i);

  const pdfAnchorIdx = compact.indexOf('PDFはこちら');
  let startIdx = -1;
  if (pdfAnchorIdx >= 0) {
    const closeDivIdx = compact.indexOf('</div>', pdfAnchorIdx);
    if (closeDivIdx >= 0) {
      startIdx = closeDivIdx + '</div>'.length;
    }
  }
  if (startIdx < 0) {
    const startCandidates = [
      compact.indexOf('<h3>'),
      compact.indexOf('<figure class="block1">'),
      compact.indexOf('<div class="column01">'),
      compact.indexOf('<table class="responsive')
    ].filter((n) => n >= 0);
    startIdx = startCandidates.length ? Math.min(...startCandidates) : -1;
  }

  const endCandidates = [
    compact.indexOf('<div id="page_products_cta"', startIdx),
    compact.indexOf('<div class="pagereturn_btn', startIdx),
    compact.indexOf('<h2 class="mt0 txtstyle02">お問い合わせ</h2>', startIdx)
  ].filter((n) => n >= 0);
  const endIdx = endCandidates.length ? Math.min(...endCandidates) : compact.length;

  let detailHtml = startIdx >= 0 ? compact.slice(startIdx, endIdx) : '';

  // Remove any PDF CTA blocks explicitly.
  detailHtml = detailHtml.replace(/<div class="link_btn[^>]*>[\s\S]*?PDFはこちら[\s\S]*?<\/div>/gi, '');
  detailHtml = detailHtml.replace(/<a[^>]*>PDFはこちら<\/a>/gi, '');
  detailHtml = detailHtml.replace(/^\s*<\/a><\/div>/i, '');
  detailHtml = detailHtml.replace(/^\s*<p><\/p>/i, '');

  detailHtml = normalizeSrc(detailHtml).trim();
  if (!detailHtml || /^<\/div>\s*$/i.test(detailHtml) || stripTags(detailHtml).length < 8) {
    // Some product pages only have a short feature/spec paragraph between <dl> and detail_image.
    const preImageBlock = (compact.match(/<\/dl>\s*([\s\S]*?)<div class="detail_image">/i) || [,''])[1]
      .replace(/<div class="link_btn[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<a[^>]*>PDFはこちら<\/a>/gi, '')
      .replace(/^\s*<p><\/p>\s*/i, '')
      .trim();
    const preImageNormalized = normalizeSrc(preImageBlock).trim();
    detailHtml = stripTags(preImageNormalized).length >= 8 ? preImageNormalized : '';
  }

  const detailHtmlImages = collectUploadImageUrls(detailHtml);
  const pageImages = collectUploadImageUrls(compact);
  const allImages = [detailImage, ...detailHtmlImages, ...pageImages]
    .filter(Boolean)
    .map((src) => src.startsWith('http') ? src : `https://www.tspco.jp${src.startsWith('/') ? '' : '/'}${src}`)
    .filter((src, idx, arr) => arr.indexOf(src) === idx);

  return {
    pageUrl,
    detailTitle,
    productName,
    model,
    supportedFunction,
    detailHtml,
    detailImages: allImages,
    cardImage: allImages[0] || ''
  };
}

const categoryProductUrls = categoryUrls.flatMap((url) => {
  const html = fetch(url);
  return (html.match(/https:\/\/www\.tspco\.jp\/products\/[^"#]+/g) || []).map((u) => u.trim());
});
const productUrls = [...new Set([...categoryProductUrls, ...extraProductUrls])].sort();

const details = {};
for (const [idx, url] of productUrls.entries()) {
  try {
    console.log(`[${idx + 1}/${productUrls.length}] ${url}`);
    const html = fetch(url);
    const product = extractProduct(html, url);
    const key = product.model || product.productName;
    if (key) {
      details[key] = product;
    }
  } catch (err) {
    console.error(`Failed: ${url} -> ${err.message}`);
  }
}

fs.writeFileSync('src/data/tspProductDetails.json', JSON.stringify(details, null, 2) + '\n', 'utf8');
console.log(`Saved ${Object.keys(details).length} products to src/data/tspProductDetails.json`);
