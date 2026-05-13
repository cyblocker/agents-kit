const { test, expect } = require('@playwright/test');

test.describe('Ingress Data Migration Flow', () => {

  test('should successfully migrate 2026 Q2 Orion data from legacy to new site via manual export', async ({ page }) => {
    
    // Step 1: Navigate to the legacy site and seed mock data
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
    
    // Step 2: Capture the Manual Export String from the prompt
    let exportString = '';
    page.on('dialog', async dialog => {
        if (dialog.type() === 'prompt') {
            exportString = dialog.defaultValue();
            await dialog.accept();
        } else {
            await dialog.accept();
        }
    });

    // Step 3: Trigger Manual Export from the Banner
    const manualBtn = page.locator('#btn-manual-export');
    await expect(manualBtn).toBeVisible();
    await manualBtn.click();
    
    // Wait for the string to be captured
    await page.waitForFunction(() => true); 
    console.log('Captured Export String:', exportString);

    if (!exportString || !exportString.startsWith('AGENTSKIT_')) {
        throw new Error("Failed to capture valid manual export string");
    }

    // Step 4: Navigate to local new site with the captured string as a hash
    const dataPart = exportString.replace('AGENTSKIT_', '');
    await page.goto(`http://localhost:8001/#migration=${dataPart}`, { waitUntil: 'networkidle' });

    // Step 5: Verify Data on New Site
    const newSiteStorage = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('ingress_planner_all_seasons'));
    });
    
    expect(newSiteStorage).not.toBeNull();
    expect(newSiteStorage['2026_q2_orion']).toBeDefined();
    expect(newSiteStorage['2026_q2_orion'].globalTotal).toBe(15500);
    
    // Step 6: Verify Legacy Lockout
    await page.goto('http://localhost:8000/');
    await expect(page.locator('#migrated-overlay')).toBeVisible();
  });
});
