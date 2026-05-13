const { test, expect } = require('@playwright/test');

// This test works even if your code points to https://agentskit.org
// It intercepts the navigation and redirects it to localhost:8001 for testing.

test.describe('Ingress Data Migration Flow', () => {

  test('should successfully migrate 2026 Q2 Orion data from legacy to new site', async ({ page }) => {
    
    // Step 1: Navigate to the legacy site with DEBUG flag and seed mock data
    await page.goto('http://localhost:8000/?migration_debug=true');
    
    const mockLegacyData = {
      "2026_q2_orion": {
        globalTotal: 15500,
        activities: {
           anomaly: { planned: 1000, actual: 800, lastUpdate: "2026-05-13 10:00" }
        }
      }
    };
    
    await page.evaluate((data) => {
      localStorage.setItem('ingress_planner_all_seasons', JSON.stringify(data));
      location.reload();
    }, mockLegacyData);
    
    // Step 2: Intercept the redirect to production and route it to localhost:8001
    let migrationHash = '';
    await page.route('**/#migration=*', async (route) => {
      const url = route.request().url();
      migrationHash = url.split('#')[1];
      await route.abort(); 
    });

    // Step 3: Trigger the migration
    const migrateBtn = page.locator('#btn-migrate-now');
    await expect(migrateBtn).toBeVisible();
    await migrateBtn.click();
    await page.waitForTimeout(1000); 

    // Step 4: Manually jump to local new site with the captured hash
    const capturedHash = await page.evaluate(() => window.location.hash);
    const finalHash = capturedHash.includes('migration=') ? capturedHash : '#migration=TEST_FALLBACK';
    await page.goto(`http://localhost:8001/${finalHash}`);

    // Step 5: Handle Dialogs on the new site
    page.on('dialog', async dialog => {
      if (dialog.message().includes('Overwrite') || dialog.message().includes('Migration successful')) {
        await dialog.accept();
      }
    });

    // Step 6: Verify Data on New Site
    await page.waitForLoadState('networkidle');
    const newSiteStorage = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('ingress_planner_all_seasons'));
    });
    
    expect(newSiteStorage['2026_q2_orion'].globalTotal).toBe(15500);
    
    // Step 7: Verify Legacy Lockout
    await page.goto('http://localhost:8000/');
    await expect(page.locator('#migrated-overlay')).toBeVisible();
  });
});
