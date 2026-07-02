// Drives the locally-served Jekyll site with headless Chromium.
// Usage: node driver.mjs [shots-dir]
// Requires: `jekyll serve --config _config.yml,_config_dev.yml` already
// running on http://localhost:4000 (see SKILL.md).

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const shots = process.argv[2] || '/tmp/panipatw-site-shots';
const base = 'http://localhost:4000';
mkdirSync(shots, { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));

const routes = ['/', '/info/', '/publications/', '/projects/', '/blog/', '/contact/'];
for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const name = route === '/' ? 'home' : route.replace(/\//g, '');
  await page.screenshot({ path: `${shots}/${name}.png`, fullPage: true });
  console.log('shot:', route, '->', `${shots}/${name}.png`);
}

// Representative interaction: click a nav link and confirm navigation.
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.click('a:has-text("About")');
await page.waitForURL('**/info/**');
await page.screenshot({ path: `${shots}/nav-click-about.png`, fullPage: true });
console.log('clicked About nav link, landed on', page.url());

console.log('console errors:', errors.length ? errors : 'none');
await browser.close();

if (errors.length) process.exit(1);
