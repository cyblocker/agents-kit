const { test, expect } = require('@playwright/test');

const mockDataJS = `
let CURRENT_SEASON_ID = '2026_q2_orion';
const SEASON_DB = {
  "2026_q2_orion": {
    id: "2026_q2_orion",
    name: "Orion Anomaly Season (2026 Q2)",
    cardEnabled: false,
    badgePath: "static/orion/",
    endTime: "2026-06-30T23:59:59",
    tiers: [
      { name: 'Bronze', value: 5000, color: 'rgba(205,127,50,0.5)' },
      { name: 'Silver', value: 8000, color: 'rgba(192,192,192,0.5)' },
      { name: 'Gold', value: 15000, color: 'rgba(255,215,0,0.5)' },
      { name: 'Platinum', value: 25000, color: 'rgba(229,228,226,0.5)' }
    ],
    activities: [
      { id: 'bounties', nameKey: 'act_bounties', descKey: 'desc_bounties', max: 6720, unit: 'tokens', isBounty: true },
      { id: 'anomaly', nameKey: 'act_anomaly', descKey: 'desc_anomaly', max: 30000, unit: 'tokens' }
    ],
    i18n: {
      en: {
        pageTitle: 'ORION SEASON PLANNER',
        pageSubtitle: '2026 Q2 (Apr 8 - Jun 30)',
        footerSource: 'Source: Ingress 2026 Q2 Orion Season.',
        act_bounties: 'Daily Bounties',
        act_anomaly: 'Anomaly On-site',
        desc_bounties: 'Apr 8 - Jun 30 (84 days), up to 80 tokens/day',
        desc_anomaly: 'Up to 5000 tokens per site',
        max_anomaly: '5000 x #sites',
        limitLabel: 'Limit',
        textCardModule: 'Commemorative Card',
        agentPlaceholder: 'Agent Name',
        optThemeDefault: 'Default (Dark)',
        optThemeRes: 'Resistance (Blue)',
        optThemeEnl: 'Enlightened (Green)',
        btnGenerateCard: 'Generate Card',
        modalCardTitle: 'Save Commemorative Card',
        modalCardDesc: 'Card generated!',
        statBounties: 'Bounties',
        statIFS: 'IFS',
        statEvents: 'Events',
        statAnomaly: 'Anomaly',
        pctComplete: (p) => \`\${p}% of Target\`,
        bountyComplete: (p) => \`\${p}% Complete\`,
        congratsCardMsg: (t) => \`\${t} Badge Earned!\`,
        motivationBadge: (t) => \`Congratulations on reaching the \${t} badge!\`,
        motivationNormal: 'The season is coming to a close.',
        startsIn: (t) => \`Starts in \${t}\`,
        endsIn: (t) => \`Ends in \${t}\`,
        ended: 'Ended',
        unitDay: 'd',
        unitHour: 'h',
        unitMinute: 'm',
        btnSyncLegacy: 'Sync from Legacy Site',
        btnManualImportStr: 'Manual Import String',
        migNoDataFound: 'No 2026 Q2 Orion data found.',
        migOverwriteConfirm: 'Overwrite?',
        migSuccess: 'Migration successful!',
        promptManualImport: 'Paste string:',
        migInvalidFormatStr: 'Invalid format.',
        migBannerTitle: 'Data Migration',
        migBannerDesc: 'It seems you haven\\'t recorded...',
      }
    }
  },
  "mock_past_season": {
    id: "mock_past_season",
    name: "Mock Past Season (2026 Q1)",
    cardEnabled: false,
    badgePath: "static/orion/",
    endTime: "2026-03-31T23:59:59",
    tiers: [
      { name: 'Bronze', value: 5000, color: 'rgba(205,127,50,0.5)' }
    ],
    activities: [
      { id: 'bounties', nameKey: 'act_bounties', descKey: 'desc_bounties', max: 6720, unit: 'tokens', isBounty: true }
    ],
    i18n: {
      en: {
        pageTitle: 'MOCK PAST PLANNER',
        pageSubtitle: '2026 Q1 (Jan 1 - Mar 31)',
        footerSource: 'Past season.',
        act_bounties: 'Daily Bounties',
        desc_bounties: 'Ended',
        limitLabel: 'Limit',
        textCardModule: 'Commemorative Card',
        agentPlaceholder: 'Agent Name',
        optThemeDefault: 'Default (Dark)',
        optThemeRes: 'Resistance (Blue)',
        optThemeEnl: 'Enlightened (Green)',
        btnGenerateCard: 'Generate Card',
        modalCardTitle: 'Save Commemorative Card',
        modalCardDesc: 'Card generated!',
        statBounties: 'Bounties',
        statIFS: 'IFS',
        statEvents: 'Events',
        statAnomaly: 'Anomaly',
        pctComplete: (p) => \`\${p}% of Target\`,
        bountyComplete: (p) => \`\${p}% Complete\`,
        congratsCardMsg: (t) => \`\${t} Badge Earned!\`,
        motivationBadge: (t) => \`Congratulations!\`,
        motivationNormal: 'Ended.',
      }
    }
  }
};
if (typeof window !== 'undefined') {
  window.CURRENT_SEASON_ID = CURRENT_SEASON_ID;
  window.SEASON_DB = SEASON_DB;
}
`;

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

test.describe('Ingress Season Transition & Visibility', () => {

  test.beforeEach(async ({ page }) => {
    // Capture console messages and errors
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

    // Disable service worker registration to prevent caching issues in tests
    await page.addInitScript(() => {
      delete window.navigator.__proto__.serviceWorker;
    });

    // Intercept data.min.js and serve the mock seasonal database
    await page.route('**/data.min.js', async (route) => {
      await route.fulfill({
        contentType: 'application/javascript',
        body: mockDataJS
      });
    });
  });

  test('should hide card module during ongoing season and show it after season ends', async ({ page }) => {
    // 1. Ongoing season (Date: 2026-05-15, before June 30 end)
    await mockBrowserDate(page, '2026-05-15T12:00:00Z');
    
    // Clear localStorage to start clean
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:8001/?lang=en');

    // Card module should be hidden
    const cardModule = page.locator('#card-module');
    await expect(cardModule).toBeHidden();

    // 2. Season ended (Date: 2026-07-05, after June 30 end)
    const pageEnded = await page.context().newPage();
    // Re-attach listeners for new page
    pageEnded.on('console', msg => console.log('BROWSER LOG ENDED:', msg.text()));
    pageEnded.on('pageerror', err => console.log('BROWSER ERROR ENDED:', err.message));
    
    await pageEnded.route('**/data.min.js', async (route) => {
      await route.fulfill({
        contentType: 'application/javascript',
        body: mockDataJS
      });
    });
    // Disable service worker on new page
    await pageEnded.addInitScript(() => {
      delete window.navigator.__proto__.serviceWorker;
    });
    
    await mockBrowserDate(pageEnded, '2026-07-05T12:00:00Z');
    await pageEnded.goto('http://localhost:8001/?lang=en');

    // Card module should be visible
    const cardModuleEnded = pageEnded.locator('#card-module');
    await expect(cardModuleEnded).toBeVisible();
  });

  test('should correctly control legacy migration banner visibility', async ({ page }) => {
    // Set date to ongoing
    await mockBrowserDate(page, '2026-05-15T12:00:00Z');

    // Scenario A: Active season is 2026_q2_orion and no data is recorded -> Banner shown
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:8001/?lang=en');

    const banner = page.locator('#sync-banner');
    await expect(banner).toBeVisible();

    // Scenario B: Placeholder view is shown -> Banner hidden
    await page.goto('http://localhost:8001/?lang=en&placeholder=true');
    await expect(banner).toBeHidden();

    // Scenario C: Switch to mock_past_season -> Banner hidden
    await page.goto('http://localhost:8001/?lang=en');
    await expect(banner).toBeVisible();
    
    const selector = page.locator('#season-selector');
    await expect(selector).toBeVisible(); // Make sure selector is visible first
    await selector.selectOption('mock_past_season');
    await expect(banner).toBeHidden();

    // Scenario D: Dismiss banner -> Banner hidden
    await selector.selectOption('2026_q2_orion');
    await expect(banner).toBeVisible();
    await page.locator('#sync-banner button[aria-label="Dismiss sync banner"]').click();
    await expect(banner).toBeHidden();

    // Scenario E: Banner hidden when data is present
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('ingress_planner_all_seasons', JSON.stringify({
        '2026_q2_orion': {
          globalTotal: 12000,
          activities: {}
        }
      }));
    });
    await page.goto('http://localhost:8001/?lang=en');
    await expect(banner).toBeHidden();
  });

  test('should handle season switching and content updates properly', async ({ page }) => {
    await mockBrowserDate(page, '2026-05-15T12:00:00Z');
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:8001/?lang=en');

    // Initially 2026_q2_orion
    const title = page.locator('#page-title');
    await expect(title).toHaveText('ORION SEASON PLANNER');

    // Switch to mock_past_season
    const selector = page.locator('#season-selector');
    await expect(selector).toBeVisible();
    await selector.selectOption('mock_past_season');

    // Verify title and page content updates
    await expect(title).toHaveText('MOCK PAST PLANNER');
    
    // Card module should be visible since mock_past_season has ended (March 31)
    const cardModule = page.locator('#card-module');
    await expect(cardModule).toBeVisible();

    // Switch back to 2026_q2_orion
    await selector.selectOption('2026_q2_orion');
    await expect(title).toHaveText('ORION SEASON PLANNER');
    // Card module should be hidden again
    await expect(cardModule).toBeHidden();
  });
});
