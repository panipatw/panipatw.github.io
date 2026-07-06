// Drives the locally-served Jekyll site with headless Chromium.
// Usage: node driver.mjs [shots-dir]
// Requires: `jekyll serve --config _config.yml,_config_dev.yml` already
// running on http://localhost:4000 (see SKILL.md).

import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');

const shots = process.argv[2] || '/tmp/panipatw-site-shots';
const base = 'http://localhost:4000';
mkdirSync(shots, { recursive: true });

// The portfolio page's permalink is a deliberately rotating random
// slug (unlisted-by-obscurity), so read it from the front matter
// instead of hardcoding it — it will go stale otherwise.
function readPermalink(relPath) {
  const text = readFileSync(path.join(repoRoot, relPath), 'utf8');
  const match = text.match(/^permalink:\s*"([^"]+)"/m);
  if (!match) throw new Error(`no permalink found in ${relPath}`);
  return match[1];
}

const portfolioUrl = readPermalink('pages/portfolio.md');
const notFoundUrl = readPermalink('pages/pages-root-folder/404.md');

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
let expectMainFrame404 = false;
page.on('console', (msg) => {
  if (msg.type() !== 'error') return;
  // Chromium logs the main document's own non-200 response as a
  // console error too; expected exactly once, for the deliberate
  // bogus-route check below, so don't treat it as a real failure.
  if (expectMainFrame404 && /status of 404/.test(msg.text())) return;
  errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(String(err)));

const routes = ['/', '/info/', '/publications/', '/projects/', '/blog/', '/contact/', portfolioUrl];
for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const name = route === '/' ? 'home' : route.replace(/^\/portfolio-.*$/, 'portfolio').replace(/\//g, '');
  await page.screenshot({ path: `${shots}/${name}.png`, fullPage: true });
  console.log('shot:', route, '->', `${shots}/${name}.png`);
}

// Representative interaction: click a nav link and confirm navigation.
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.click('a:has-text("About")');
await page.waitForURL('**/info/**');
await page.screenshot({ path: `${shots}/nav-click-about.png`, fullPage: true });
console.log('clicked About nav link, landed on', page.url());

// Real blog post: pull the first post link off the blog index rather
// than hardcoding a filename that may get deleted/renamed.
await page.goto(base + '/blog/', { waitUntil: 'networkidle' });
const firstPostHref = await page.getAttribute('h2 a', 'href');
if (!firstPostHref) {
  errors.push('blog index has no post links to follow');
} else {
  await page.goto(firstPostHref, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${shots}/blog-post.png`, fullPage: true });
  console.log('shot: blog post ->', firstPostHref, '->', `${shots}/blog-post.png`);
}

// 404 page: hit a route that can't possibly exist and confirm the
// custom 404 (not Jekyll/WEBrick's own directory listing) is served.
const bogusRoute = '/this-route-should-not-exist-404-check/';
expectMainFrame404 = true;
const response = await page.goto(base + bogusRoute, { waitUntil: 'networkidle' });
expectMainFrame404 = false;
await page.screenshot({ path: `${shots}/404.png`, fullPage: true });
console.log('shot:', bogusRoute, '->', `${shots}/404.png`, '(status', response.status() + ')');
if (response.status() !== 404) {
  errors.push(`expected 404 status for ${bogusRoute}, got ${response.status()}`);
}

// Also hit the 404 page directly by its own permalink, since that's
// the URL GitHub Pages actually serves on a real miss.
await page.goto(base + notFoundUrl, { waitUntil: 'networkidle' });
await page.screenshot({ path: `${shots}/404-direct.png`, fullPage: true });
console.log('shot:', notFoundUrl, '->', `${shots}/404-direct.png`);

console.log('console errors:', errors.length ? errors : 'none');
await browser.close();

if (errors.length) process.exit(1);
