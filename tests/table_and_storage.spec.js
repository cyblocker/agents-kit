const { test, expect } = require('@playwright/test');

async function mockBrowserDate(page, dateStr) {
  await page.addInitScript((isoDate) => {
    const RealDate = Date;
    const timeOffset = new RealDate(isoDate).getTime() - RealDate.now();
    window.Date = function(...args) {
      if (!new.target) {
        return new RealDate(RealDate.now() + timeOffset).toString();
      }
      if (args.length === 0) {
        return new RealDate(RealDate.now() + timeOffset);
      }
      return new RealDate(...args);
    };
    window.Date.prototype = RealDate.prototype;
    window.Date.now = function() {
      return RealDate.now() + timeOffset;
    };
    window.Date.UTC = RealDate.UTC;
    window.Date.parse = RealDate.parse;
  }, dateStr);
}

test.describe('Ingress Planner Table and LocalStorage Verification', () => {

  test.beforeEach(async ({ page }) => {
    // Capture console messages and errors
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

    // Disable service worker registration to prevent caching issues in tests
    await page.addInitScript(() => {
      delete window.navigator.__proto__.serviceWorker;
    });

    // Use a fixed date to keep tests deterministic
    await mockBrowserDate(page, '2026-05-25T12:00:00Z');
  });

  test('should display default values when local storage is empty', async ({ page }) => {
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:8001/?lang=en');

    // Verify global total is 0
    const globalTotalInput = page.locator('#global-total-actual');
    await expect(globalTotalInput).toHaveValue('0');

    // Verify some default rows are present
    const bountyRow = page.locator('tr:has-text("Daily Bounties")');
    await expect(bountyRow).toBeVisible();

    // In default state, bounty actual should be 0 and planned range shows seeRange
    const seeRangeText = bountyRow.locator('span:has-text("See projected range")');
    await expect(seeRangeText).toBeVisible();

    // Actual calculated bounties value should be 0
    await expect(bountyRow.locator('span.text-green-400')).toHaveText('0');

    // Verify other activities have 0 inputs
    const anomalyRow = page.locator('tr:has-text("Anomaly On-site")');
    await expect(anomalyRow).toBeVisible();
    await expect(anomalyRow.locator('input[aria-label*="Planned"]')).toHaveValue('0');
    await expect(anomalyRow.locator('input[aria-label*="Actual"]')).toHaveValue('0');
  });

  test('should correctly render values loaded from local storage', async ({ page }) => {
    const mockData = {
      '2026_q2_orion': {
        globalTotal: 12000,
        activities: {
          anomaly: { planned: 10000, actual: 5000, lastUpdate: '2026-05-24 12:00' },
          ifs_apr: { planned: 2500, actual: 2500, lastUpdate: '2026-04-05 10:00' }
        }
      }
    };

    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate((data) => {
      localStorage.setItem('ingress_planner_all_seasons', JSON.stringify(data));
    }, mockData);
    await page.goto('http://localhost:8001/?lang=en');

    // 1. Verify global total is loaded correctly
    const globalTotalInput = page.locator('#global-total-actual');
    await expect(globalTotalInput).toHaveValue('12000');

    // 2. Verify stored activity inputs (anomaly)
    const anomalyRow = page.locator('tr:has-text("Anomaly On-site")');
    await expect(anomalyRow.locator('input[aria-label*="Planned"]')).toHaveValue('10000');
    await expect(anomalyRow.locator('input[aria-label*="Actual"]')).toHaveValue('5000');
    await expect(anomalyRow.locator('#time-anomaly')).toHaveText('2026-05-24 12:00');

    // 3. Verify stored activity inputs (IFS - April)
    const ifsRow = page.locator('tr:has-text("IFS - April")');
    await expect(ifsRow.locator('input[aria-label*="Planned"]')).toHaveValue('2500');
    await expect(ifsRow.locator('input[aria-label*="Actual"]')).toHaveValue('2500');
    await expect(ifsRow.locator('#time-ifs_apr')).toHaveText('2026-04-05 10:00');

    // 4. Verify Daily Bounties row dynamically calculated results:
    // otherActualSum = 5000 (anomaly) + 2500 (ifs_apr) = 7500.
    // calculatedBounty = 12000 - 7500 = 4500.
    // daysCompleted = Math.floor(4500 / 80) = 56.
    const bountyRow = page.locator('tr:has-text("Daily Bounties")');
    await expect(bountyRow.locator('span.text-green-400')).toHaveText('4500');
    await expect(bountyRow.locator('text=~56 days completed')).toBeVisible();
  });
});
