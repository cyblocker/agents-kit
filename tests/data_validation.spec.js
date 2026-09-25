const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');

test.describe('Ingress Season Data Validation & Integrity', () => {

  let SEASON_DB;

  test.beforeAll(() => {
    const dataCode = fs.readFileSync('data.js', 'utf8') + '\nglobalThis.__SEASON_DB = SEASON_DB;';
    vm.runInThisContext(dataCode);
    SEASON_DB = globalThis.__SEASON_DB;
    expect(SEASON_DB).toBeDefined();
  });

  test('all seasons should have valid endTime and strictly ascending tiers', () => {
    for (const [seasonId, season] of Object.entries(SEASON_DB)) {
      expect(season.id, `Season ${seasonId} id property`).toBe(seasonId);
      expect(season.name, `Season ${seasonId} name property`).toBeTruthy();

      const seasonEnd = new Date(season.endTime);
      expect(isNaN(seasonEnd.getTime()), `Season ${seasonId} valid endTime`).toBe(false);

      expect(season.tiers && season.tiers.length > 0, `Season ${seasonId} has tiers`).toBe(true);
      for (let i = 0; i < season.tiers.length; i++) {
        expect(season.tiers[i].value, `Season ${seasonId} tier ${season.tiers[i].name} value > 0`).toBeGreaterThan(0);
        if (i < season.tiers.length - 1) {
          expect(
            season.tiers[i].value,
            `Season ${seasonId} tier ${season.tiers[i].name} < ${season.tiers[i + 1].name}`
          ).toBeLessThan(season.tiers[i + 1].value);
        }
      }
    }
  });

  test('all seasons should have a valid lastEventStartDate that precedes season endTime', () => {
    for (const [seasonId, season] of Object.entries(SEASON_DB)) {
      const seasonEndUtc = new Date(season.endTime + 'Z');

      let lastStartUtc = null;
      let nonBountyCount = 0;

      for (const act of season.activities) {
        if (act.isBounty) {
          // Verify bounty math if localStart and localEnd exist
          if (act.localStart && act.localEnd) {
            const s = new Date(act.localStart);
            const e = new Date(act.localEnd);
            const days = Math.ceil((e - s) / 86400000);
            expect(days * act.dailyMax, `Bounty calculation in ${seasonId}`).toBe(act.max);
          }
          continue;
        }

        nonBountyCount++;
        const sStr = act.utcStart || (act.localStart ? act.localStart + 'Z' : null);
        if (sStr) {
          const s = new Date(sStr);
          if (!lastStartUtc || s > lastStartUtc) {
            lastStartUtc = s;
          }
          expect(s.getTime(), `${seasonId} activity ${act.id} start precedes season endTime`).toBeLessThan(seasonEndUtc.getTime());
        }

        const eStr = act.utcEnd || (act.localEnd ? act.localEnd + 'Z' : null);
        if (eStr) {
          const e = new Date(eStr);
          expect(e.getTime(), `${seasonId} activity ${act.id} end does not exceed season endTime`).toBeLessThanOrEqual(seasonEndUtc.getTime());
        }

        if (sStr && eStr) {
          expect(new Date(sStr).getTime(), `${seasonId} activity ${act.id} start precedes end`).toBeLessThan(new Date(eStr).getTime());
        }
      }

      expect(lastStartUtc, `Season ${seasonId} should have at least one non-bounty activity with start date`).not.toBeNull();
      expect(lastStartUtc.getTime(), `Season ${seasonId} lastEventStartDate must precede season endTime`).toBeLessThan(seasonEndUtc.getTime());
    }
  });

  test('all seasons should have complete i18n dictionaries for all activities', () => {
    const requiredLangs = ['zh', 'en', 'ja', 'de'];
    for (const [seasonId, season] of Object.entries(SEASON_DB)) {
      expect(season.i18n, `Season ${seasonId} has i18n`).toBeDefined();

      for (const lang of requiredLangs) {
        const dict = season.i18n[lang];
        expect(dict, `Season ${seasonId} has dictionary for ${lang}`).toBeDefined();
        expect(dict.pageTitle, `${seasonId} [${lang}] pageTitle`).toBeTruthy();
        expect(dict.pageSubtitle, `${seasonId} [${lang}] pageSubtitle`).toBeTruthy();
        expect(dict.footerSource, `${seasonId} [${lang}] footerSource`).toBeTruthy();

        for (const act of season.activities) {
          if (act.nameKey) {
            expect(dict[act.nameKey], `${seasonId} [${lang}] missing nameKey ${act.nameKey}`).toBeTruthy();
          }
          if (act.descKey) {
            expect(dict[act.descKey], `${seasonId} [${lang}] missing descKey ${act.descKey}`).toBeTruthy();
          }
        }
      }
    }
  });
});
