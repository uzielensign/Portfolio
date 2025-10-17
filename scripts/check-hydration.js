const { chromium } = require('playwright');
const http = require('http');

// Config
const URL = process.env.CHECK_URL || 'http://localhost:3000/';
const TIMEOUT = Number(process.env.CHECK_TIMEOUT) || 15000;
const HYDRATION_KEYWORDS = [
  'Hydration failed',
  'AppDevOverlay',
  'DevRootHTTPAccessFallbackBoundary',
  'ReplaySsrOnlyErrors',
  '__next_dev_overlay',
  'HotReload',
];

(async () => {
  console.log(`Checking hydration warnings at ${URL}`);

  // Wait for server to be reachable (short loop)
  const deadline = Date.now() + TIMEOUT;
  while (Date.now() < deadline) {
    try {
      await new Promise((res, rej) => {
        const req = http.request(URL, { method: 'HEAD', timeout: 2000 }, (r) => {
          res();
        });
        req.on('error', rej);
        req.on('timeout', () => req.destroy(new Error('timeout')));
        req.end();
      });
      break;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleMessages.push({ type: msg.type(), text });
    // also print to stdout so the runner captures messages live
    console.log(`[console:${msg.type()}] ${text}`);
  });

  let error = null;
  try {
    const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: TIMEOUT });
    if (!resp) throw new Error('No response from server');

    // Give the page some time to hydrate and log
    await page.waitForTimeout(1200);

    // Inspect console messages for hydration keywords
    const hits = consoleMessages.filter((m) => HYDRATION_KEYWORDS.some((k) => m.text.includes(k)));
    if (hits.length > 0) {
      console.error('\nHydration warning(s) detected:');
      hits.forEach((h) => console.error(`- [${h.type}] ${h.text}`));
      error = new Error('Hydration warnings detected');
    } else {
      console.log('\nNo hydration warnings detected.');
    }
  } catch (err) {
    console.error('Error during check:', err);
    error = err;
  } finally {
    await browser.close();
  }

  if (error) {
    process.exitCode = 2;
    console.error('\nCheck failed.');
  } else {
    console.log('\nCheck passed.');
  }
})();

