const { test, expect } = require('@playwright/test');
const fs = require('fs');

test.describe('Ingress Planner Persistence and Share Verification', () => {

  test.beforeEach(async ({ page }) => {
    // Disable service worker registration to prevent caching issues in tests
    await page.addInitScript(() => {
      delete window.navigator.__proto__.serviceWorker;
    });
  });

  test('should persist agent name and card theme in localStorage and DOM', async ({ page }) => {
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:8001/?lang=en');

    // Fill in agent name and change theme
    const agentInput = page.locator('#agent-name-input');
    await agentInput.fill('AgentAlpha');
    
    const themeSelect = page.locator('#card-theme-select');
    await themeSelect.selectOption('theme-res');

    // Verify localStorage has these values saved
    const savedName = await page.evaluate(() => localStorage.getItem('agentskit_agent_name'));
    const savedTheme = await page.evaluate(() => localStorage.getItem('agentskit_card_theme'));
    expect(savedName).toBe('AgentAlpha');
    expect(savedTheme).toBe('theme-res');

    // Reload the page and ensure the fields are populated correctly from storage
    await page.reload();
    await expect(page.locator('#agent-name-input')).toHaveValue('AgentAlpha');
    await expect(page.locator('#card-theme-select')).toHaveValue('theme-res');
  });

  test('should export agent name and card theme in JSON export file', async ({ page }) => {
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('agentskit_agent_name', 'AgentBeta');
      localStorage.setItem('agentskit_card_theme', 'theme-enl');
    });
    await page.goto('http://localhost:8001/?lang=en');

    // Click Export JSON and capture the download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('span:has-text("Export JSON")')
    ]);

    const path = await download.path();
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));

    expect(data.v).toBe(4);
    expect(data.agentName).toBe('AgentBeta');
    expect(data.cardTheme).toBe('theme-enl');
    expect(data.allSeasons).toBeDefined();
  });

  test('should import new JSON payload and update values (two-way compatibility: new payload)', async ({ page }) => {
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:8001/?lang=en');

    const newPayload = {
      v: 4,
      currentSeasonId: '2026_q2_orion',
      lang: 'en',
      agentName: 'ImportedGamma',
      cardTheme: 'theme-res',
      allSeasons: {
        '2026_q2_orion': {
          globalTotal: 777,
          activities: {}
        }
      }
    };

    // Capture dialogs
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Upload files directly to hidden input
    await page.setInputFiles('#import-file', {
      name: 'imported.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(newPayload))
    });

    // Verify UI matches imported values
    await expect(page.locator('#agent-name-input')).toHaveValue('ImportedGamma');
    await expect(page.locator('#card-theme-select')).toHaveValue('theme-res');
    await expect(page.locator('#global-total-actual')).toHaveValue('777');

    // Verify localStorage matches
    const savedName = await page.evaluate(() => localStorage.getItem('agentskit_agent_name'));
    const savedTheme = await page.evaluate(() => localStorage.getItem('agentskit_card_theme'));
    expect(savedName).toBe('ImportedGamma');
    expect(savedTheme).toBe('theme-res');
  });

  test('should import old JSON payload without overwriting existing local values (two-way compatibility: old payload)', async ({ page }) => {
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('agentskit_agent_name', 'LocalName');
      localStorage.setItem('agentskit_card_theme', 'theme-res');
    });
    await page.goto('http://localhost:8001/?lang=en');

    // Verify state before import
    await expect(page.locator('#agent-name-input')).toHaveValue('LocalName');
    await expect(page.locator('#card-theme-select')).toHaveValue('theme-res');

    const oldPayload = {
      v: 4,
      currentSeasonId: '2026_q2_orion',
      lang: 'en',
      // agentName and cardTheme omitted
      allSeasons: {
        '2026_q2_orion': {
          globalTotal: 999,
          activities: {}
        }
      }
    };

    // Capture dialogs
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await page.setInputFiles('#import-file', {
      name: 'old_imported.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(oldPayload))
    });

    // Verify imported global total is updated
    await expect(page.locator('#global-total-actual')).toHaveValue('999');

    // Verify existing agent name and theme remain intact
    await expect(page.locator('#agent-name-input')).toHaveValue('LocalName');
    await expect(page.locator('#card-theme-select')).toHaveValue('theme-res');

    const savedName = await page.evaluate(() => localStorage.getItem('agentskit_agent_name'));
    const savedTheme = await page.evaluate(() => localStorage.getItem('agentskit_card_theme'));
    expect(savedName).toBe('LocalName');
    expect(savedTheme).toBe('theme-res');
  });
  test('should sync agent name and theme via share URL (two-way compatibility)', async ({ page }) => {
    // 1. Seed data, generate URL
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('agentskit_agent_name', 'ShareAgent');
      localStorage.setItem('agentskit_card_theme', 'theme-enl');
    });
    await page.goto('http://localhost:8001/?lang=en');

    await page.click('span:has-text("Share Link & QR")');
    const shareUrlBox = page.locator('#share-url');
    await expect(shareUrlBox).toBeVisible();
    const url = await shareUrlBox.textContent();

    // 2. Open another page/state, reset localStorage
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => localStorage.clear());

    // 3. Open share URL and confirm import dialog
    let dialogCount = 0;
    page.on('dialog', async dialog => {
      dialogCount++;
      if (dialogCount === 1) {
        expect(dialog.message()).toContain('Sync data detected. Overwrite local records?');
        await dialog.accept();
      } else {
        expect(dialog.message()).toContain('Migration successful');
        await dialog.accept();
      }
    });

    await page.goto(url);

    // 4. Verify values imported successfully
    await expect(page.locator('#agent-name-input')).toHaveValue('ShareAgent');
    await expect(page.locator('#card-theme-select')).toHaveValue('theme-enl');
  });

  test('should import old share URL without overwriting local values (two-way compatibility)', async ({ page }) => {
    // 1. Seed current local values
    await page.goto('http://localhost:8001/?lang=en');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('agentskit_agent_name', 'DontOverwriteMe');
      localStorage.setItem('agentskit_card_theme', 'theme-res');
    });
    await page.goto('http://localhost:8001/?lang=en');

    // 2. Generate a URL from old payload (no agentName or cardTheme)
    // We can compress this JSON: {v: 4, currentSeasonId: '2026_q2_orion', lang: 'en', allSeasons: { '2026_q2_orion': { globalTotal: 100, activities: {} } }}
    // In our browser we have LZString loaded on window if we trigger the modal or we can evaluate it
    await page.click('span:has-text("Share Link & QR")');
    const shareUrlBox = page.locator('#share-url');
    await expect(shareUrlBox).toBeVisible();
    const url = await shareUrlBox.textContent();
    // Let's modify the hash to represent old data by decoding it, removing properties, and re-encoding it
    const hash = new URL(url).hash;
    const compressedData = hash.substring(6);

    const oldCompressedData = await page.evaluate(async (dataStr) => {
      // LZString will be available because opening the modal loads it
      const jsonStr = LZString.decompressFromEncodedURIComponent(dataStr);
      const data = JSON.parse(jsonStr);
      delete data.agentName;
      delete data.cardTheme;
      data.allSeasons['2026_q2_orion'].globalTotal = 12345;
      return LZString.compressToEncodedURIComponent(JSON.stringify(data));
    }, compressedData);

    const oldUrl = `http://localhost:8001/#data=${oldCompressedData}`;

    // 3. Setup dialog listeners and load old URL
    let dialogCount = 0;
    page.on('dialog', async dialog => {
      dialogCount++;
      if (dialogCount === 1) {
        expect(dialog.message()).toContain('Sync data detected. Overwrite local records?');
        await dialog.accept();
      } else {
        expect(dialog.message()).toContain('Migration successful');
        await dialog.accept();
      }
    });

    await page.goto(oldUrl);

    // 4. Verify imported data is updated but local name/theme remain unchanged
    await expect(page.locator('#global-total-actual')).toHaveValue('12345');
    await expect(page.locator('#agent-name-input')).toHaveValue('DontOverwriteMe');
    await expect(page.locator('#card-theme-select')).toHaveValue('theme-res');
  });
});
