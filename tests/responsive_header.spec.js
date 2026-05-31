const { test, expect } = require('@playwright/test');

test.describe('Responsive Header Verification', () => {
  test('header elements should fit on one line on mobile viewport', async ({ page }) => {
    // Set viewport to 375px width (iPhone SE / older iPhones)
    await page.setViewportSize({ width: 375, height: 812 });

    // Navigate to local site
    await page.goto('http://localhost:8001/');

    // Get the bounding boxes of the brand logo and language selector
    const logo = page.locator('nav > div').first();
    const langToggle = page.locator('#lang-toggle');

    await expect(logo).toBeVisible();
    await expect(langToggle).toBeVisible();

    const logoBox = await logo.boundingBox();
    const langToggleBox = await langToggle.boundingBox();

    const langToggleStyles = await page.evaluate(() => {
      const el = document.getElementById('lang-toggle');
      const style = window.getComputedStyle(el);
      const childStyles = Array.from(el.children).map(child => {
        return {
          tag: child.tagName,
          text: child.textContent,
          display: window.getComputedStyle(child).display,
          width: window.getComputedStyle(child).width,
          flexShrink: window.getComputedStyle(child).flexShrink
        };
      });
      return {
        display: style.display,
        flexWrap: style.flexWrap,
        width: style.width,
        children: childStyles
      };
    });

    console.log('Lang toggle styles:', JSON.stringify(langToggleStyles, null, 2));

    console.log('Logo box:', logoBox);
    console.log('Lang toggle box:', langToggleBox);

    // If they are on the same line, their top coordinates should be close
    const yDifference = Math.abs(logoBox.y - langToggleBox.y);
    console.log('Y difference:', yDifference);

    // Take screenshot for visual inspection
    await page.screenshot({ path: 'test-results/header-mobile.png' });

    // Assert they are on the same line (Y difference should be very small, e.g. < 10px)
    expect(yDifference).toBeLessThan(15);

    // Assert they did not wrap internally (single line height)
    expect(logoBox.height).toBeLessThan(22);
    expect(langToggleBox.height).toBeLessThan(30);
  });
});
