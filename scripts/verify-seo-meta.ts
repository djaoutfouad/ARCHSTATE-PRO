import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

let failures: string[] = [];
let passes: string[] = [];

function assert(condition: boolean, passMsg: string, failMsg: string) {
  if (condition) {
    passes.push(`✓ ${passMsg}`);
  } else {
    failures.push(`✗ ${failMsg}`);
  }
}

console.log('--- ArchEstate Pro Strict SEO & Accessibility Audit ---');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Fatal: dist directory not found. Run npm run build first.');
  process.exit(1);
}

// Recursively get all HTML files in dist
function getAllHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
assert(htmlFiles.length >= 24, `Found ${htmlFiles.length} HTML files in dist/`, `Expected at least 24 HTML files, found ${htmlFiles.length}`);

for (const filePath of htmlFiles) {
  const relPath = path.relative(DIST_DIR, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  // 1. NO keywords meta tag anywhere
  assert(
    !content.includes('name="keywords"') && !content.includes("name='keywords'"),
    `[${relPath}] Does NOT contain <meta name="keywords">`,
    `[${relPath}] CONTAINS forbidden <meta name="keywords">`
  );

  // 2. Title length check (45 - 55 chars)
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  assert(
    Boolean(titleMatch),
    `[${relPath}] Has <title> tag`,
    `[${relPath}] Missing <title> tag`
  );
  if (titleMatch) {
    const titleText = titleMatch[1].trim()
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    const len = titleText.length;
    assert(
      len >= 45 && len <= 55,
      `[${relPath}] Title "${titleText}" length (${len}) is within [45, 55]`,
      `[${relPath}] Title "${titleText}" length (${len}) OUTSIDE [45, 55]`
    );
  }

  // 3. Meta description length check (130 - 155 chars)
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ||
                    content.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  assert(
    Boolean(descMatch),
    `[${relPath}] Has <meta name="description">`,
    `[${relPath}] Missing <meta name="description">`
  );
  if (descMatch) {
    const descText = descMatch[1].trim()
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    const len = descText.length;
    assert(
      len >= 130 && len <= 155,
      `[${relPath}] Description length (${len}) is within [130, 155]`,
      `[${relPath}] Description length (${len}) OUTSIDE [130, 155]: "${descText}"`
    );
  }

  // 4. Canonical & OG:URL verification (excluding 404)
  if (relPath !== '404.html') {
    const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
    assert(
      Boolean(canonicalMatch),
      `[${relPath}] Has canonical tag`,
      `[${relPath}] Missing canonical tag`
    );
    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      assert(
        canonical.startsWith('https://archstate-pro.pages.dev/'),
        `[${relPath}] Canonical starts with https://archstate-pro.pages.dev/ (got "${canonical}")`,
        `[${relPath}] Canonical does NOT use https://archstate-pro.pages.dev/ (got "${canonical}")`
      );
      assert(
        canonical.endsWith('/'),
        `[${relPath}] Canonical ends with trailing slash (/) (got "${canonical}")`,
        `[${relPath}] Canonical MISSING trailing slash: "${canonical}"`
      );
      assert(
        !canonical.includes('archestatepro.com'),
        `[${relPath}] Canonical does not use external archestatepro.com`,
        `[${relPath}] Canonical contains external archestatepro.com: "${canonical}"`
      );
    }

    const ogUrlMatch = content.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i);
    if (ogUrlMatch) {
      const ogUrl = ogUrlMatch[1];
      assert(
        ogUrl.startsWith('https://archstate-pro.pages.dev/'),
        `[${relPath}] og:url starts with https://archstate-pro.pages.dev/`,
        `[${relPath}] og:url does not use active domain: "${ogUrl}"`
      );
      assert(
        ogUrl.endsWith('/'),
        `[${relPath}] og:url ends with trailing slash (/): "${ogUrl}"`,
        `[${relPath}] og:url MISSING trailing slash: "${ogUrl}"`
      );
    }
  }

  // 5. Internal links check: All internal links must end with /
  const hrefMatches = content.matchAll(/href="(\/[^" #?]*)/g);
  for (const match of hrefMatches) {
    const href = match[1];
    // Ignore assets, images, files with extensions (.xml, .txt, .html, .ico, .css, .js)
    if (
      href.startsWith('/assets/') ||
      href.startsWith('/images/') ||
      /\.(xml|txt|ico|png|jpg|jpeg|webp|svg|css|js|json)$/i.test(href)
    ) {
      continue;
    }
    // Root / is fine, all other internal paths must end with /
    assert(
      href.endsWith('/'),
      `[${relPath}] Internal link "${href}" ends with /`,
      `[${relPath}] Internal link "${href}" DOES NOT end with trailing slash /`
    );
  }

  // 6. Check Google Fonts display=swap
  if (content.includes('fonts.googleapis.com')) {
    assert(
      content.includes('display=swap'),
      `[${relPath}] Google Fonts includes display=swap`,
      `[${relPath}] Google Fonts missing display=swap`
    );
  }
}

// 7. Check homepage hero banner & preload
const homeHtmlPath = path.join(DIST_DIR, 'index.html');
const homeContent = fs.readFileSync(homeHtmlPath, 'utf-8');
assert(
  homeContent.includes('rel="preload"') && homeContent.includes('hero-construction-blueprint.jpg'),
  'Homepage includes <link rel="preload"> for hero-construction-blueprint.jpg',
  'Homepage missing hero banner preload'
);
assert(
  homeContent.includes('fetchpriority="high"') || homeContent.includes('fetchPriority="high"'),
  'Homepage includes fetchpriority="high" for hero image',
  'Homepage missing fetchpriority="high" for hero image'
);

// 8. Check card image attributes
const cardImgMatches = homeContent.matchAll(/<img[^>]+src="\/images\/calculators\/[^>]+>/g);
let cardCount = 0;
for (const match of cardImgMatches) {
  cardCount++;
  const imgTag = match[0];
  assert(
    imgTag.includes('width="360"') && imgTag.includes('height="200"'),
    `Card image #${cardCount} specifies explicit width="360" height="200"`,
    `Card image #${cardCount} missing explicit width="360" height="200": ${imgTag}`
  );
  assert(
    imgTag.includes('loading="lazy"'),
    `Card image #${cardCount} specifies loading="lazy"`,
    `Card image #${cardCount} missing loading="lazy": ${imgTag}`
  );
  assert(
    imgTag.includes('decoding="async"'),
    `Card image #${cardCount} specifies decoding="async"`,
    `Card image #${cardCount} missing decoding="async": ${imgTag}`
  );
}
assert(cardCount === 15, `Found exactly 15 calculator cards with images on homepage (found ${cardCount})`, `Expected 15 calculator cards, found ${cardCount}`);

// Summary
console.log('\n--- SEO & Metadata Audit Summary ---');
console.log(`Passed checks: ${passes.length}`);
console.log(`Failed checks: ${failures.length}`);

if (failures.length > 0) {
  console.error('\nFailures encountered:');
  failures.slice(0, 15).forEach((f) => console.error(f));
  if (failures.length > 15) {
    console.error(`...and ${failures.length - 15} more failures.`);
  }
  process.exit(1);
} else {
  console.log('\nAll SEO, Canonical, Trailing Slash, LCP, Accessibility, and Meta Length tests PASSED perfectly! ✨');
  process.exit(0);
}
