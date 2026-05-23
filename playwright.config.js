const { defineConfig } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Support both local development (sibling folder) and CI container paths
const legacyPath = fs.existsSync(path.join(__dirname, 'legacy-site/ingress'))
  ? 'legacy-site/ingress'
  : '../cyblocker.github.io/ingress';

module.exports = defineConfig({
  testDir: '.',
  testMatch: 'migration_test.spec.js',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  webServer: [
    {
      command: `npx serve ${legacyPath} -p 8000`,
      port: 8000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npx serve dist -p 8001',
      port: 8001,
      reuseExistingServer: !process.env.CI,
    }
  ]
});
