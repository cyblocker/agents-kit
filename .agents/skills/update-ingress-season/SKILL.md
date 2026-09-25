---
name: update-ingress-season
description: >-
  Use this skill when updating or adding a new Ingress anomaly season to agents-kit
  (e.g., from an official Ingress news announcement or season schedule).
---

# Updating Ingress Anomaly Season in Agents-Kit

This runbook guides you through adding a new Ingress Anomaly Season or updating an upcoming season in `agents-kit`.

## Overview of Project Architecture

- **`data.js`**: Contains `CURRENT_SEASON_ID` and `SEASON_DB` with season configurations, activities, tiers, and localized translations (`zh`, `en`, `ja`, `de`).
- **`app.js`**: Application logic. Handles reactive calculations, bounty projections, countdown timers, season switching, persistence, and share URLs. Automatically parses `SEASON_DB` keys matching `/^(\d{4})_(q\d)_(.+)$/i` for the season selector dropdown.
- **`style.css`**: Defines CSS rules, card styles, and fallback badges (`.badge-bronze`, `.badge-silver`, `.badge-gold`, `.badge-platinum`, `.badge-onyx`).
- **`scripts/convert_badges.py`**: Python script using Pillow that scans a target season directory and converts all `<tier>.png` badge files into `<tier>.webp` (full size) and `<tier>_small.webp` (80×80).
- **`build.js`**: Minifies `core.js`, `data.js`, `app.js` into `dist/` and computes asset hashes for `dist/sw.js`.
- **`tests/`**: Playwright test suite validating data integrity (`data_validation.spec.js`), table calculations, localStorage persistence, URL share payloads, legacy migration, and season transitions.

---

## Step-by-Step Procedure

### 1. Extract Season Information from Official Source

Read the official announcement (e.g. from `https://ingress.com/news/...` via `read_url_content` or user-provided notes):

1. **Season ID & Naming**:
   - Format: `YYYY_qX_name` (e.g., `2026_q4_cygnus`, `2027_q1_polaris`).
   - Title: e.g., `"Cygnus Anomaly Season (2026 Q4)"`.
2. **Season Dates**:
   - `endTime`: ISO local date string for midnight of final day (e.g., `"2026-12-31T23:59:59"`). Must always be later than all event dates within the season.
3. **Medal Tiers Setup (Variable Tier Counts)**:
   - **Crucial**: Medal tiers vary across seasons! Do not assume exactly 3 tiers:
     - **3 Tiers** (e.g., Apollo, Cygnus): Bronze, Silver, Gold.
     - **4 Tiers** (e.g., Orion): Bronze, Silver, Gold, Platinum.
     - **5 Tiers** (Classic Ingress hierarchy): Bronze, Silver, Gold, Platinum, Onyx.
     - **Single Tier / Custom**: Single participation medal or unique event badge names.
   - Inspect the announcement to determine the exact number of tiers and token requirements.
   - For each tier, create an object: `{ name: '<TierName>', value: <threshold>, color: '<rgba_color>' }`.
   - Standard tier colors:
     - Bronze: `rgba(205,127,50,0.5)`
     - Silver: `rgba(192,192,192,0.5)`
     - Gold: `rgba(255,215,0,0.5)`
     - Platinum: `rgba(229,228,226,0.5)`
     - Onyx: `rgba(51,65,85,0.6)`
4. **Activities**:
   - **Daily Bounties**:
     - `localStart`: Start date `"YYYY-MM-DDT00:00:00"`.
     - `localEnd`: End date `"YYYY-MM-DDT23:59:59"`.
     - Calculate total days $D$.
     - `dailyMax`: Max tokens earnable daily (usually 60 or 80).
     - `max`: $D \times \text{dailyMax}$.
     - `isBounty: true`.
   - **First Saturday (IFS)**:
     - 1 entry per month (e.g., `ifs_oct`, `ifs_nov`, `ifs_dec`).
     - `type: 'binary'`, `max: 2500`, `unit: 'tokens'`.
   - **Global Campaigns / Operations**:
     - `utcStart`: UTC start ISO string (e.g. `"2026-10-01T18:00:00Z"`).
     - `utcEnd`: UTC end ISO string (e.g. `"2026-10-28T18:00:00Z"`).
     - `type: 'presets'`, `max: <token_limit>`.
   - **Shard Storm / XM Anomaly**:
     - Check whether the season features traditional on-site Anomalies, Shard Storms, or both.
     - **Shard Storm**: Use `type: 'incremental'`, `presets: [2500]`, and `max: 7500` (which automatically generates `+2.5k` and `Reset` buttons).
     - **XM Anomaly**: Use `type: 'incremental'`, `presets: [3000, 5000]`, and `max: 30000` (which automatically generates `+3k`, `+5k`, and `Reset` buttons).
5. **Localization (`i18n`)**:
   - Provide translations across all four supported languages:
     - `zh` (Simplified Chinese)
     - `en` (English)
     - `ja` (Japanese)
     - `de` (German)
   - Include: `pageTitle`, `pageSubtitle`, `cardTitle`, `footerSource`, activity names (`act_*`), and descriptions (`desc_*`).

---

### 2. Badge Acquisition and Card Generation Setup

Adapt your actions according to whether badge assets are available:

1. **If Badge Images Are Available in the Announcement**:
   - For **every tier** in the season's setup:
     - Find the corresponding 512×512 PNG image URL (e.g. `googleusercontent.com` URLs with `=s0`).
     - Save as `static/<season_name>/<tier_name_lowercase>.png`.
       - For 3-tier: `bronze.png`, `silver.png`, `gold.png`.
       - For 4-tier: `bronze.png`, `silver.png`, `gold.png`, `platinum.png`.
       - For 5-tier: `bronze.png`, `silver.png`, `gold.png`, `platinum.png`, `onyx.png`.
   - Run the badge conversion script:
     ```powershell
     python scripts/convert_badges.py static/<season_name>
     ```
     `convert_badges.py` will process every `.png` in the folder and generate:
     - `<tier_name_lowercase>.webp` (full resolution for card generation)
     - `<tier_name_lowercase>_small.webp` (80×80 for progress bar markers)
   - Set in `data.js`:
     - `badgePath: "static/<season_name>/"`
     - `cardEnabled: true` (or `false` if you want it to unlock automatically only when criteria are met)

2. **If Badge Images Are NOT Yet Available**:
   - Set in `data.js`:
     - `badgePath: ""`
     - `cardEnabled: false`
   - The UI automatically falls back to rendering circular CSS badges with the first letter of each tier and class `badge-${tier.name.toLowerCase()}`.
   - Verify that `style.css` contains matching CSS classes for any custom tier names (e.g. `.badge-bronze`, `.badge-silver`, `.badge-gold`, `.badge-platinum`, `.badge-onyx`).

3. **Automatic Card Visibility Conditions**:
   The commemorative card generation module (`#card-module`) dynamically reveals itself when **any** of the following conditions are met:
   - `season.cardEnabled === true`: Manual override flag in `data.js`.
   - **Highest Medal Tier Achieved**: User's `totalActual` meets or exceeds the top tier requirement (`totalActual >= season.tiers[season.tiers.length - 1].value`).
   - **Last Event Starts**: The current date/time is at or past the start of the final non-bounty event of the season (`new Date() >= lastEventStartDate`).
   - **Season Concluded**: Current date has passed `season.endTime`.

---

### 3. Update `data.js`

1. Determine `CURRENT_SEASON_ID`:
   - If setting the new season as active immediately, set `const CURRENT_SEASON_ID = '<new_season_id>';`.
   - If keeping the current ongoing season active until the quarter starts, keep `CURRENT_SEASON_ID` unchanged and append the new season to `SEASON_DB`.
2. Add the complete season object under `SEASON_DB["<new_season_id>"]`:
   - `id`, `name`, `cardEnabled`, `badgePath`, `endTime`, `tiers`, `activities`, `i18n`.

---

### 4. Build Assets

Run the build script to compile Tailwind utilities and minify JS files into `dist/`:
```powershell
npm run build
```

Verify that `dist/data.min.js`, `dist/core.min.js`, `dist/app.min.js`, `dist/style.css`, and static badge folders are copied to `dist/`, and `dist/sw.js` has a fresh hash.

---

### 5. Run Test Suite

Run Playwright tests:
```powershell
npm test
```

The test suite includes `tests/data_validation.spec.js`, which automatically validates:
- `endTime` covers all activity start and end dates.
- Tiers are strictly ascending in value.
- Bounty formulas match the days and daily maximum.
- All 4 languages (`zh`, `en`, `ja`, `de`) have complete i18n dictionaries for all activities.

If `CURRENT_SEASON_ID` was changed:
- Check `tests/table_and_storage.spec.js`: Test 1 verifies that non-bounty activities default to 0 on initial page load. Ensure the locator references an activity row that actually exists in the new default season (e.g. `locator('tr:has-text("...")')`).

---

### 6. Validation Checklist

- [ ] Number of tiers and tier names match the official announcement exactly (support 1, 3, 4, 5+ tiers).
- [ ] If `badgePath` is set, every tier has `<tier_name_lowercase>.png`, `<tier_name_lowercase>.webp`, and `<tier_name_lowercase>_small.webp` in `static/<season_name>/`.
- [ ] If `badgePath` is empty (`""`), verify fallback CSS `.badge-<tier>` exists in `style.css`.
- [ ] Season `endTime` strictly covers all activity dates (`lastEventStartDate < endTime`).
- [ ] Bounty calculation: $\text{days} \times \text{dailyMax} == \text{max}$.
- [ ] UTC start and end strings end with `Z` (e.g., `2026-10-01T18:00:00Z`).
- [ ] All four language dictionaries (`zh`, `en`, `ja`, `de`) have entries for every `nameKey` and `descKey`.
- [ ] Season ID adheres to `YYYY_qX_name` format so `app.js` dropdown renders `Name (YYYYQX)` cleanly.
- [ ] `npm run build` succeeds without warnings.
- [ ] `npm test` passes 100% (including `data_validation.spec.js`).
