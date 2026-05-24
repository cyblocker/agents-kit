// ==================== MAIN APPLICATION LOGIC ====================

// Explicitly export I18N to window so core.js t() function can access it
window.I18N = {
    zh: {
        phTitle: 'Ingress 赛季计划工具',
        phDesc: '敬请期待新赛季！在此期间，您可以回顾以下历史赛季：',
        inputTotal: '输入游戏内当前总分',
        inputPlaceholder: '点击输入',
        inputHint: 'Season Tokens 统计值',
        plannedRange: '计划最终获得区间',
        calculatingStatus: '根据潜力计算中...',
        nextTierLabel: '下一等级还差',
        loading: '加载中...',
        thActivity: '活动项目',
        thMax: '单项最大值',
        thPlanned: '计划完成度',
        thActual: '实际完成(计算/输入)',
        thUpdated: '最后更新',
        footerFormula: '每日任务得分 = 总分 - 其他项目实得分之和。',
        seeRange: '请见最终得分区间',
        daysCompleted: (d) => `约完成 ${d} 天`,
        bountyHint: (p) => `明天起至季末最高还可得: ${p} tokens`,
        reachedPlatinum: '已达成 Platinum!',
        toTier: (name) => `距离 ${name} 勋章`,
        maxTierForecast: (name) => `最高预计可获 ${name} 勋章`,
        noTierForecast: '预计不足以获得勋章',
        localTime: '本地时间',
        contactMe: '联系我：',
        textMigration: '数据迁移',
        btnShareUrl: '分享链接 & 二维码',
        btnExportJson: '导出 JSON 文件',
        btnImportJson: '导入 JSON 文件',
        modalShareTitle: '数据分享',
        modalShareDesc: '扫码或复制链接在其他设备上同步您的计划。',
        btnClose: '关闭',
        btnCopy: '复制链接',
        copySuccess: '链接已复制到剪贴板',
        syncConfirm: '检测到同步数据，是否覆盖本地记录？',
        importSuccess: '导入成功！',
        invalidData: '无效的数据格式！',
        wrongSeason: (s) => `此数据属于其他赛季 (${s})，是否仍要导入？`,
        confirmMergeAllSeasons: '检测到多赛季全量数据，是否覆盖本地所有赛季记录？',
        textCardModule: '赛季纪念卡片',
        agentPlaceholder: '特工代号 (Agent Name)',
        optThemeDefault: '默认 (深色)',
        optThemeRes: '抵抗军 (蓝色)',
        optThemeEnl: '启盟军 (绿色)',
        btnGenerateCard: '生成纪念卡片',
        modalCardTitle: '保存纪念卡片',
        modalCardDesc: '生成完成！电脑上可右键另存为，手机上长按下方图片保存到相册，或分享给朋友。',
        statBounties: '每日任务',
        statIFS: 'IFS (First Saturday)',
        statEvents: '现场活动与行动',
        statAnomaly: 'Anomaly 现场',
        pctComplete: (p) => `目标完成 ${p}%`,
        bountyComplete: (p) => `完成 ${p}%`,
        congratsCardMsg: (t) => `获得 ${t} 奖牌！`,
        motivationBadge: (t) => `恭喜您已达成 ${t} 奖牌，快来生成纪念卡片分享一下吧！`,
        motivationNormal: '赛季即将结束，来生成一张专属您的赛季成绩卡片吧！',
        startsIn: (t) => `${t} 后开始`,
        endsIn: (t) => `${t} 后结束`,
        ended: '已结束',
        unitDay: '天',
        unitHour: '小时',
        unitMinute: '分',
        max_anomaly: '单项限制见说明',
        btnSyncLegacy: '从旧版网站同步',
        btnManualImportStr: '手动导入旧版网站数据',
        migNoDataFound: '在迁移数据中未找到 2026 Q2 Orion 的数据。',
        migOverwriteConfirm: '发现现有 2026 Q2 Orion 记录。是否覆盖为来自 cyblocker.com/ingress 的旧数据？警告：此操作无法撤销。',
        migSuccess: '迁移成功！您的旧数据已导入。',
        promptManualImport: '粘贴手动导出文本（以 AGENTSKIT_ 开头）：',
        migInvalidFormatStr: '格式无效。文本必须以 AGENTSKIT_ 开头',
        migBannerTitle: '新赛季数据迁移',
        migBannerDesc: '检测到您尚未在 Agents Kit 记录数据。如果您有旧站点的记录，可以通过以下方式快速同步。',
        limitLabel: '上限',
    },
    en: {
        phTitle: 'Ingress Season Planner',
        phDesc: 'Please look forward to the new season! Meanwhile, review past seasons below:',
        inputTotal: 'Enter Current In-Game Total',
        inputPlaceholder: 'Click to enter',
        inputHint: 'Season Tokens total',
        plannedRange: 'Projected Final Range',
        calculatingStatus: 'Calculating based on potential...',
        nextTierLabel: 'Until Next Tier',
        loading: 'Loading...',
        thActivity: 'Activity',
        thMax: 'Max Tokens',
        thPlanned: 'Planned',
        thActual: 'Actual (Calc/Input)',
        thUpdated: 'Last Updated',
        footerFormula: 'Daily bounty score = Total - sum of all other actual scores.',
        seeRange: 'See projected range',
        daysCompleted: (d) => `~${d} days completed`,
        bountyHint: (p) => `Max remaining from tomorrow to season end: ${p} tokens`,
        reachedPlatinum: 'Platinum Achieved!',
        toTier: (name) => `Until ${name} Badge`,
        maxTierForecast: (name) => `Projected max: ${name} Badge`,
        noTierForecast: 'Not enough for any badge',
        localTime: 'local time',
        contactMe: 'Contact Me: ',
        textMigration: 'Data Migration',
        btnShareUrl: 'Share Link & QR',
        btnExportJson: 'Export JSON',
        btnImportJson: 'Import JSON',
        modalShareTitle: 'Share Data',
        modalShareDesc: 'Scan the QR or copy the link to sync your plan on other devices.',
        btnClose: 'Close',
        btnCopy: 'Copy Link',
        copySuccess: 'Link copied to clipboard',
        syncConfirm: 'Sync data detected. Overwrite local records?',
        importSuccess: 'Import successful!',
        invalidData: 'Invalid data format!',
        wrongSeason: (s) => `This data belongs to another season (${s}). Import anyway?`,
        confirmMergeAllSeasons: 'Multi-season data detected. Overwrite all local season records?',
        textCardModule: 'Commemorative Card',
        agentPlaceholder: 'Agent Name',
        optThemeDefault: 'Default (Dark)',
        optThemeRes: 'Resistance (Blue)',
        optThemeEnl: 'Enlightened (Green)',
        btnGenerateCard: 'Generate Card',
        modalCardTitle: 'Save Commemorative Card',
        modalCardDesc: 'Card generated! Right-click to save on PC, or long-press the image on mobile devices.',
        statBounties: 'Bounties',
        statIFS: 'IFS (First Saturday)',
        statEvents: 'Events & Ops',
        statAnomaly: 'Anomaly',
        pctComplete: (p) => `${p}% of Target`,
        bountyComplete: (p) => `${p}% Complete`,
        congratsCardMsg: (t) => `${t} Badge Earned!`,
        motivationBadge: (t) => `Congratulations on reaching the ${t} badge! Generate a card to share it!`,
        motivationNormal: 'The season is coming to a close. Generate your personalized commemorative card!',
        startsIn: (t) => `Starts in ${t}`,
        endsIn: (t) => `Ends in ${t}`,
        ended: 'Ended',
        unitDay: 'd',
        unitHour: 'h',
        unitMinute: 'm',
        max_anomaly: 'See desc for limits',
        btnSyncLegacy: 'Sync from Legacy Site',
        btnManualImportStr: 'Manual Import String',
        migNoDataFound: 'No 2026 Q2 Orion data found in the migration payload.',
        migOverwriteConfirm: 'Found existing record. Overwrite with legacy data from cyblocker.com/ingress? WARNING: This cannot be undone.',
        migSuccess: 'Migration successful! Your legacy data has been imported.',
        promptManualImport: 'Paste the manual export string (starting with AGENTSKIT_):',
        migInvalidFormatStr: 'Invalid format. The string must start with AGENTSKIT_',
        migBannerTitle: 'Data Migration',
        migBannerDesc: 'It seems you haven\'t recorded any data on Agents Kit yet. If you have records on the legacy site, you can sync them now.',
        limitLabel: 'Limit',
    },
    ja: {
        phTitle: 'Ingress シーズンプランナー',
        phDesc: '新シーズンにご期待ください！その间、以下の过去のシーズンを振り返ることができます：',
        inputTotal: 'ゲーム内の現在の総トークンを入力',
        inputPlaceholder: 'クリックして入力',
        inputHint: 'Season Tokens 合计値',
        plannedRange: '予想获得トークン範囲',
        calculatingStatus: 'ポテンシャルから计算中...',
        nextTierLabel: '次のランクまで',
        loading: '読み込み中...',
        thActivity: 'OP/イベント',
        thMax: '最大値',
        thPlanned: '計画',
        thActual: '実績（計算/入力）',
        thUpdated: '最終更新',
        footerFormula: 'デイリータスクトークン = 総トークン - 他項目の実績合計',
        seeRange: '予想範囲を参照',
        daysCompleted: (d) => `約${d}日完了`,
        bountyHint: (p) => `明日からシーズン終了までの最大獲得可能数: ${p} tokens`,
        reachedPlatinum: 'Platinum 達成！',
        toTier: (name) => `${name} メダルまであと`,
        maxTierForecast: (name) => `予想される最大メダル: ${name}`,
        noTierForecast: 'メダル獲得には不十分と予想されます',
        localTime: '現地時間',
        contactMe: '連絡先：',
        textMigration: 'データ移行',
        btnShareUrl: 'リンク & QRコードを共有',
        btnExportJson: 'JSONをエクスポート',
        btnImportJson: 'JSONをインポート',
        modalShareTitle: 'データ共有',
        modalShareDesc: 'QRコードをスキャンするか、リンクをコピーして他のデバイスと同期します。',
        btnClose: '閉じる',
        btnCopy: 'リンクをコピー',
        copySuccess: 'リンクをクリップボードにコピーしました',
        syncConfirm: '同期データが検出されました。ローカルの記録を上書きしますか？',
        importSuccess: 'インポート成功！',
        invalidData: '無効なデータ形式です！',
        wrongSeason: (s) => `このデータは別のシーズン (${s}) のものです。インポートしますか？`,
        confirmMergeAllSeasons: '複数シーズンのデータを検出しました。ローカルの全記録を上書きしますか？',
        textCardModule: '記念カード生成',
        agentPlaceholder: 'エージェント名 (AG)',
        optThemeDefault: 'デフォルト (ダーク)',
        optThemeRes: 'レジスタンス (青)',
        optThemeEnl: 'エンライテンド (緑)',
        btnGenerateCard: 'カードを生成',
        modalCardTitle: '記念カードを保存',
        modalCardDesc: '生成完了！PCでは右クリック、スマートフォンでは画像を長押しして保存してください。',
        statBounties: 'デイリーバウンティ',
        statIFS: 'IFS (First Saturday)',
        statEvents: 'イベント & OP',
        statAnomaly: 'アノマリー',
        pctComplete: (p) => `計画達成率 ${p}%`,
        bountyComplete: (p) => `達成率 ${p}%`,
        congratsCardMsg: (t) => `${t} メダル獲得！`,
        motivationBadge: (t) => `${t} メダル獲得おめでとうございます！記念カードを生成してシェアしましょう！`,
        motivationNormal: 'シーズンが終了に近づいています。あなただけの記念カードを作りましょう！',
        startsIn: (t) => `あと ${t} で開始`,
        endsIn: (t) => `あと ${t} で終了`,
        ended: '終了',
        unitDay: '日',
        unitHour: '時間',
        unitMinute: '分',
        max_anomaly: '詳細は説明を参照',
        btnSyncLegacy: '旧サイトから同期',
        btnManualImportStr: '文字列を手動インポート',
        migNoDataFound: '移行データに 2026 Q2 Orion のデータが見つかりませんでした。',
        migOverwriteConfirm: '既存の記録が見つかりました。cyblocker.com/ingress の旧データで上書きしますか？ 警告: この操作は元に戻せません。',
        migSuccess: '移行に成功しました！旧データがインポートされました。',
        promptManualImport: '手動エクスポート用の文字列（AGENTSKIT_ で始まる）を貼り付けてください：',
        migInvalidFormatStr: '無効な形式です。文字列は AGENTSKIT_ で始まる必要があります',
        migBannerTitle: 'データ移行',
        migBannerDesc: 'Agents Kit にまだデータが記録されていないようです。旧サイトに記録がある場合は、今すぐ同期できます。',
        limitLabel: '上限',
    }
};

// ==================== DYNAMIC SCRIPT LOADER FOR LAZY LOADING ====================
function loadScript(url) {
    if (!window.loadedScripts) window.loadedScripts = {};
    if (window.loadedScripts[url]) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        script.onload = () => {
            window.loadedScripts[url] = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ==================== STATE & UTILITIES ====================
const GLOBAL_STORAGE_KEY = 'ingress_planner_all_seasons';

let activeSeasonId = CURRENT_SEASON_ID;
let TIERS = [];
let ACTIVITIES = [];
let SEASON_END = new Date();

let allSeasonsData = {};
let userData = {};

function formatTimeRemaining(ms) {
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const mins = totalMinutes % 60;

    if (days > 0) {
        return `${days}${t('unitDay')} ${hours}${t('unitHour')} ${mins}${t('unitMinute')}`;
    } else if (hours > 0) {
        return `${hours}${t('unitHour')} ${mins}${t('unitMinute')}`;
    } else {
        return `${mins}${t('unitMinute')}`;
    }
}

function loadAllSeasonsData() {
    const saved = localStorage.getItem(GLOBAL_STORAGE_KEY);
    if (saved) {
        allSeasonsData = JSON.parse(saved);
    } else {
        const seasonKey = 'ingress_planner_data_' + CURRENT_SEASON_ID;
        const legacyKey = 'ingress_orion_planner_v3';

        const migratedData = localStorage.getItem(seasonKey) || localStorage.getItem(legacyKey);
        if (migratedData) {
            allSeasonsData[CURRENT_SEASON_ID] = JSON.parse(migratedData);
            localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(allSeasonsData));
        }
    }
}

loadAllSeasonsData();

function updateSyncButtonVisibility() {
    const btnSync = document.getElementById('btn-sync-legacy');
    const btnManual = document.getElementById('btn-manual-import-card');
    if (!btnSync) return;

    const existingLocalData = allSeasonsData['2026_q2_orion'];
    const hasData = existingLocalData && (existingLocalData.globalTotal > 0 || Object.keys(existingLocalData.activities).length > 0);

    if (hasData) {
        btnSync.className = 'btn-outline flex items-center text-xs opacity-70';
        if (btnManual) btnManual.className = 'btn-outline flex items-center text-xs opacity-70';
    } else {
        btnSync.className = 'btn-primary flex items-center bg-green-600 hover:bg-green-700 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
        if (btnManual) btnManual.className = 'btn-outline flex items-center';
    }
}

function updateBannerVisibility() {
    const banner = document.getElementById('sync-banner');
    if (!banner) return;

    const isPlaceholderMode = (!CURRENT_SEASON_ID || !SEASON_DB[CURRENT_SEASON_ID] || new URLSearchParams(window.location.search).get('placeholder') === 'true');
    const is26q2Active = (activeSeasonId === '2026_q2_orion') && !isPlaceholderMode;

    if (!is26q2Active) {
        banner.style.display = 'none';
        return;
    }

    const existingLocalData = allSeasonsData['2026_q2_orion'];
    const hasData = existingLocalData && (existingLocalData.globalTotal > 0 || Object.keys(existingLocalData.activities).length > 0);

    if (hasData) {
        localStorage.setItem('agentskit_banner_dismissed', 'true');
    }

    const isDismissed = localStorage.getItem('agentskit_banner_dismissed') === 'true';

    if (!hasData && !isDismissed) {
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

window.dismissBanner = function () {
    localStorage.setItem('agentskit_banner_dismissed', 'true');
    updateBannerVisibility();
};

function init() {
    checkMigrationHash();
    initContact();
    checkHashData();
    updateSyncButtonVisibility();
    updateBannerVisibility();

    const isPlaceholderMode = (!CURRENT_SEASON_ID || !SEASON_DB[CURRENT_SEASON_ID] || new URLSearchParams(window.location.search).get('placeholder') === 'true');

    if (isPlaceholderMode) {
        document.getElementById('tracker-view').style.display = 'none';
        document.getElementById('placeholder-view').style.display = 'block';

        const migrationOptions = document.getElementById('migration-sync-options');
        if (migrationOptions) migrationOptions.style.display = 'none';

        document.getElementById('page-title').style.display = 'none';
        document.getElementById('page-subtitle').style.display = 'none';
        document.getElementById('footer-source').style.display = 'none';
        document.getElementById('footer-formula').style.display = 'none';
        renderPlaceholder();
    } else {
        activeSeasonId = CURRENT_SEASON_ID;
        initSeason(activeSeasonId);
    }
    applyLanguage();
}

function renderPlaceholder() {
    const phSeasons = document.getElementById('ph-seasons');
    phSeasons.innerHTML = '';
    Object.values(SEASON_DB).forEach(season => {
        const btn = document.createElement('button');
        btn.className = 'btn-outline text-left py-3 px-4 flex justify-between items-center';

        let badgeHtml = '';
        if (allSeasonsData[season.id]) {
            const total = allSeasonsData[season.id].globalTotal || 0;
            const earnedTier = [...season.tiers].reverse().find(t => total >= t.value);
            if (earnedTier) {
                const imgSrc = season.badgePath + earnedTier.name.toLowerCase() + '.png';
                badgeHtml = `<img src="${imgSrc}" class="h-6 w-6 ml-2" alt="${earnedTier.name}">`;
            }
        }

        btn.innerHTML = `<div class="flex items-center text-left"><span>${season.name}</span>${badgeHtml}</div> <span class="ml-2 flex-shrink-0">→</span>`;
        btn.onclick = () => {
            activeSeasonId = season.id;
            initSeason(activeSeasonId);
        };
        phSeasons.appendChild(btn);
    });
}

window.switchSeason = function (id) {
    if (id) {
        activeSeasonId = id;
        initSeason(id);
    }
};

function initSeason(id) {
    document.getElementById('placeholder-view').style.display = 'none';
    document.getElementById('tracker-view').style.display = 'block';

    const migrationOptions = document.getElementById('migration-sync-options');
    if (migrationOptions) {
        migrationOptions.style.display = (id === '2026_q2_orion') ? 'flex' : 'none';
    }

    document.getElementById('page-title').style.display = 'block';
    document.getElementById('page-subtitle').style.display = 'block';
    document.getElementById('footer-source').style.display = 'block';
    document.getElementById('footer-formula').style.display = 'block';

    updateBannerVisibility();

    const season = SEASON_DB[id];
    TIERS = season.tiers;
    ACTIVITIES = season.activities;
    SEASON_END = new Date(season.endTime);

    // Populate selector
    const selector = document.getElementById('season-selector');
    selector.innerHTML = '';
    if (Object.keys(SEASON_DB).length > 1) {
        Object.values(SEASON_DB).forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id;
            opt.textContent = s.name;
            if (s.id === id) opt.selected = true;
            selector.appendChild(opt);
        });
        selector.style.display = 'inline-block';
    } else {
        selector.style.display = 'none';
    }

    const cardModule = document.getElementById('card-module');
    if (cardModule) {
        const isPassed = new Date() > new Date(season.endTime);
        cardModule.style.display = (season.cardEnabled || isPassed) ? 'block' : 'none';
    }

    if (!allSeasonsData[id]) {
        allSeasonsData[id] = { globalTotal: 0, activities: {} };
    }
    userData = allSeasonsData[id];

    document.getElementById('global-total-actual').value = userData.globalTotal || 0;
    renderProgressBarUI(season);
    applyLanguage();
    renderTable();
    calculate();
}

function renderProgressBarUI(season) {
    const badgeContainer = document.getElementById('badge-container');
    const progressContainer = document.getElementById('progress-bar-container');

    badgeContainer.innerHTML = '';
    Array.from(progressContainer.querySelectorAll('.badge-marker')).forEach(m => m.remove());

    if (!TIERS || TIERS.length === 0) return;
    const maxTierValue = TIERS[TIERS.length - 1].value;

    TIERS.forEach((tier, index) => {
        const isLast = index === TIERS.length - 1;
        const pct = (tier.value / maxTierValue) * 100;

        const div = document.createElement('div');
        div.className = 'absolute text-center transition-all duration-300 badge-item';
        div.style.left = pct + '%';
        div.style.transform = isLast ? 'translateX(-100%)' : 'translateX(-50%)';
        div.style.top = '0';

        const imgSrc = season.badgePath + tier.name.toLowerCase() + '.png';
        const formatValue = tier.value >= 1000 ? (tier.value / 1000) + 'k' : tier.value;
        const color = tier.color || 'rgba(255,255,255,0.5)';

        div.innerHTML = `
            <img src="${imgSrc}" class="w-10 h-10 mx-auto" style="filter: drop-shadow(0 0 5px ${color})" alt="${tier.name}">
            <span class="text-[10px] whitespace-nowrap mt-1 block">${tier.name} (${formatValue})</span>
        `;
        badgeContainer.appendChild(div);

        const marker = document.createElement('div');
        marker.className = 'badge-marker';
        marker.style.left = pct + '%';
        progressContainer.insertBefore(marker, document.getElementById('main-progress-bar'));
    });
}

// core.js language buttons register handlers, here we just define applyLanguage
window.applyLanguage = function () {
    const langMap = { zh: 'zh-CN', en: 'en', ja: 'ja' };
    document.documentElement.lang = langMap[currentLang] || currentLang;

    const isPlaceholder = document.getElementById('placeholder-view').style.display === 'block';
    if (isPlaceholder) {
        document.getElementById('ph-title').textContent = t('phTitle');
        document.getElementById('ph-desc').textContent = t('phDesc');
    }

    document.getElementById('page-title').textContent = t('pageTitle');
    document.getElementById('page-subtitle').textContent = t('pageSubtitle');
    document.getElementById('label-input-total').textContent = t('inputTotal');
    document.getElementById('global-total-actual').placeholder = t('inputPlaceholder');
    document.getElementById('label-input-hint').textContent = t('inputHint');
    document.getElementById('label-planned-range').textContent = t('plannedRange');
    document.getElementById('label-next-tier').textContent = t('nextTierLabel');

    document.getElementById('th-activity').textContent = t('thActivity');
    document.getElementById('th-max').textContent = t('thMax');
    document.getElementById('th-planned').textContent = t('thPlanned');
    document.getElementById('th-actual').textContent = t('thActual');
    document.getElementById('th-updated').textContent = t('thUpdated');

    document.getElementById('footer-source').textContent = t('footerSource');
    document.getElementById('footer-formula').textContent = t('footerFormula');
    document.getElementById('label-contact').textContent = t('contactMe');

    document.getElementById('text-migration').textContent = t('textMigration');
    document.getElementById('btn-share-url').textContent = t('btnShareUrl');
    document.getElementById('btn-export-json').textContent = t('btnExportJson');
    document.getElementById('btn-import-json').textContent = t('btnImportJson');
    document.getElementById('modal-share-title').textContent = t('modalShareTitle');
    document.getElementById('modal-share-desc').textContent = t('modalShareDesc');
    document.getElementById('btn-close-modal').textContent = t('btnClose');
    document.getElementById('btn-copy-url').textContent = t('btnCopy');

    document.getElementById('text-card-module').textContent = t('textCardModule');
    document.getElementById('agent-name-input').placeholder = t('agentPlaceholder');
    document.getElementById('opt-theme-default').textContent = t('optThemeDefault');
    document.getElementById('opt-theme-res').textContent = t('optThemeRes');
    document.getElementById('opt-theme-enl').textContent = t('optThemeEnl');
    document.getElementById('btn-generate-card').querySelector('span').textContent = t('btnGenerateCard');

    document.getElementById('modal-card-title').textContent = t('modalCardTitle');
    document.getElementById('modal-card-desc').textContent = t('modalCardDesc');
    document.getElementById('btn-close-card').textContent = t('btnClose');

    document.getElementById('ctl-bounties').textContent = t('statBounties');
    document.getElementById('ctl-ifs').textContent = t('statIFS');
    document.getElementById('ctl-events').textContent = t('statEvents');
    document.getElementById('ctl-anomaly').textContent = t('statAnomaly');

    const elBannerTitle = document.getElementById('mig-banner-title'); if (elBannerTitle) elBannerTitle.textContent = t('migBannerTitle');
    const elBannerDesc = document.getElementById('mig-banner-desc'); if (elBannerDesc) elBannerDesc.textContent = t('migBannerDesc');
    const elBtnSyncBanner = document.getElementById('btn-sync-legacy-banner'); if (elBtnSyncBanner) elBtnSyncBanner.textContent = t('btnSyncLegacy');
    const elBtnManualBanner = document.getElementById('btn-manual-import-banner'); if (elBtnManualBanner) elBtnManualBanner.textContent = t('btnManualImportStr');

    const elBtnSyncLegacy = document.getElementById('btn-sync-legacy'); if (elBtnSyncLegacy) elBtnSyncLegacy.querySelector('span').textContent = t('btnSyncLegacy');

    const elBtnManualCard = document.getElementById('btn-manual-import-card-text'); if (elBtnManualCard) elBtnManualCard.textContent = t('btnManualImportStr');

    if (isPlaceholder) {
        document.title = t('phTitle');
    } else {
        const titleText = t('pageTitle');
        const formattedWords = titleText.split(' ').map(w => {
            if (!w) return w;
            return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        });
        document.title = 'Ingress ' + formattedWords.join(' ');
    }

    renderTable();
    calculate();
};

function getRemainingBountyPotential() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (tomorrow > SEASON_END) return 0;
    const diffDays = Math.ceil((SEASON_END - tomorrow) / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays) * 80;
}

function initContact() {
    const el = document.getElementById('email-link');
    if (!el) return;
    const parts = [105, 110, 103, 114, 101, 115, 115, 64, 99, 121, 98, 108, 111, 99, 107, 101, 114, 46, 99, 111, 109];
    const email = parts.map(c => String.fromCharCode(c)).join('');
    el.href = 'mailto:' + email;
    el.textContent = email;
}

function renderTable() {
    const tbody = document.getElementById('activity-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    const potential = getRemainingBountyPotential();

    let otherActualSum = 0;
    ACTIVITIES.forEach(act => {
        if (!act.isBounty) {
            otherActualSum += (userData.activities[act.id]?.actual || 0);
        }
    });

    const calculatedBounty = Math.max(0, (userData.globalTotal || 0) - otherActualSum);

    ACTIVITIES.forEach(act => {
        const stored = userData.activities[act.id] || { planned: 0, actual: 0, lastUpdate: '-' };
        const row = document.createElement('tr');
        row.className = 'border-t border-slate-800 hover:bg-slate-800/30 transition-colors';

        let plannedInput = '';
        let actualInput = '';
        let hint = '';

        let displayDesc = act.descKey ? t(act.descKey) : '';
        if (act.utcStart && act.utcEnd) {
            const start = new Date(act.utcStart);
            const end = new Date(act.utcEnd);
            const now = new Date();
            const fmt = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
            displayDesc = `${start.toLocaleString([], fmt)} - ${end.toLocaleString([], fmt)} (${t('localTime')})`;

            let statusBadge = '';
            if (now < start) {
                const diff = start - now;
                statusBadge = `<div class="mt-1 text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">${t('startsIn')(formatTimeRemaining(diff))}</div>`;
            } else if (now < end) {
                const diff = end - now;
                statusBadge = `<div class="mt-1 text-[10px] text-amber-400 font-semibold uppercase tracking-wider animate-pulse">${t('endsIn')(formatTimeRemaining(diff))}</div>`;
            } else {
                statusBadge = `<div class="mt-1 text-[10px] text-rose-500 font-semibold uppercase tracking-wider opacity-70">${t('ended')}</div>`;
            }
            displayDesc += statusBadge;
        }

        if (act.isBounty) {
            plannedInput = `<span class="text-slate-600 italic text-sm">${t('seeRange')}</span>`;
            actualInput = `
                <div class="flex flex-col">
                    <span class="text-green-400 font-mono font-bold text-lg">${calculatedBounty}</span>
                    <div class="text-[10px] text-slate-500 mt-1">${t('daysCompleted')(Math.floor(calculatedBounty / 80))}</div>
                </div>
            `;
            hint = `<div class="bounty-hint">${t('bountyHint')(potential)}</div>`;
            plannedInput = `
                <input type="number" min="0" max="${act.max}" value="${stored.planned}" 
                       aria-label="${t(act.nameKey)} (${t('thPlanned')})"
                       onchange="updateValue('${act.id}', 'planned', this.value)">
            `;
            actualInput = `
                <input type="number" min="0" max="${act.max}" value="${stored.actual}" 
                       aria-label="${t(act.nameKey)} (${t('thActual')})"
                       onchange="updateValue('${act.id}', 'actual', this.value)">
            `;
        }

        const displayMax = (act.id === 'anomaly') ? t('max_anomaly') : act.max;

        row.innerHTML = `
            <td class="p-4">
                <div class="font-semibold text-slate-200 text-sm sm:text-base">${t(act.nameKey)}</div>
                <div class="show-on-narrow text-[10px] sm:text-xs text-slate-400 font-mono mt-0.5">${t('limitLabel')}: ${displayMax}</div>
                <div class="text-[10px] sm:text-xs text-slate-500">${displayDesc}</div>
                ${hint}
            </td>
            <td class="p-4 text-slate-400 font-mono text-xs sm:text-sm hide-on-narrow">${displayMax}</td>
            <td class="p-4">${plannedInput}</td>
            <td class="p-4">${actualInput}</td>
            <td class="p-4 hide-on-mobile">
                <div id="time-${act.id}" class="timestamp font-mono">${stored.lastUpdate}</div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

window.updateGlobalTotal = function (val) {
    userData.globalTotal = parseInt(val) || 0;
    saveAndRefresh();
};

window.updateValue = function (id, type, value) {
    if (!userData.activities[id]) {
        userData.activities[id] = { planned: 0, actual: 0, lastUpdate: '-' };
    }

    userData.activities[id][type] = parseInt(value) || 0;

    const now = new Date();
    userData.activities[id].lastUpdate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    saveAndRefresh();
};

function saveAndRefresh() {
    allSeasonsData[CURRENT_SEASON_ID] = userData;
    localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(allSeasonsData));
    renderTable();
    calculate();
}

function calculate() {
    let totalActual = userData.globalTotal || 0;
    let otherPlannedSum = 0;

    ACTIVITIES.forEach(act => {
        if (!act.isBounty) {
            const stored = userData.activities[act.id] || { planned: 0, actual: 0 };
            let valToUse = stored.planned;

            const now = new Date();
            const hasEnded = act.utcEnd && now > new Date(act.utcEnd);

            if (stored.actual > stored.planned || hasEnded) {
                valToUse = stored.actual;
            }

            otherPlannedSum += valToUse;
        }
    });

    const potential = getRemainingBountyPotential();

    let otherActualSum = 0;
    ACTIVITIES.forEach(act => { if (!act.isBounty) otherActualSum += (userData.activities[act.id]?.actual || 0); });
    const currentBountyActual = Math.max(0, totalActual - otherActualSum);

    const plannedMin = otherPlannedSum + currentBountyActual;
    const plannedMax = plannedMin + potential;

    const rangeEl = document.getElementById('planned-total-range');
    if (rangeEl) rangeEl.innerText = `${plannedMin.toLocaleString()} - ${plannedMax.toLocaleString()}`;

    let nextTier = TIERS.find(t => t.value > totalActual);
    const nextDiffEl = document.getElementById('next-tier-diff');
    if (nextDiffEl) {
        if (!nextTier) {
            nextDiffEl.innerText = 'MAX';
            document.getElementById('next-tier-name').innerText = t('reachedPlatinum');
            nextDiffEl.className = 'text-3xl font-bold accent-green';
        } else {
            const diff = nextTier.value - totalActual;
            nextDiffEl.innerText = diff.toLocaleString();
            document.getElementById('next-tier-name').innerText = t('toTier')(nextTier.name);
            nextDiffEl.className = 'text-3xl font-bold accent-purple';
        }
    }

    const plannedStatusEl = document.getElementById('planned-status');
    if (plannedStatusEl) {
        let plannedTierMax = [...TIERS].reverse().find(tier => tier.value <= plannedMax);
        plannedStatusEl.innerText = plannedTierMax ? t('maxTierForecast')(plannedTierMax.name) : t('noTierForecast');
    }

    const mainProgressEl = document.getElementById('main-progress-bar');
    if (mainProgressEl) {
        const maxTierValue = TIERS.length > 0 ? TIERS[TIERS.length - 1].value : 25000;
        const progressPercent = Math.min((totalActual / maxTierValue) * 100, 100);
        mainProgressEl.style.width = progressPercent + '%';
    }

    const cardMotivationEl = document.getElementById('card-motivation');
    if (cardMotivationEl) {
        let earnedTier = [...TIERS].reverse().find(t => totalActual >= t.value);
        if (earnedTier) {
            cardMotivationEl.innerHTML = t('motivationBadge')(earnedTier.name) + ' 🎉';
        } else {
            cardMotivationEl.innerHTML = t('motivationNormal');
        }
    }
}

// ==================== MIGRATION & SHARING ====================
let qrcode = null;

window.showShareModal = async function () {
    if (typeof LZString === 'undefined') {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js');
    }
    if (typeof QRCode === 'undefined') {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js');
    }

    const data = {
        v: 4,
        currentSeasonId: CURRENT_SEASON_ID,
        lang: currentLang,
        allSeasons: allSeasonsData
    };
    const jsonStr = JSON.stringify(data);
    const compressedData = LZString.compressToEncodedURIComponent(jsonStr);
    const url = window.location.origin + window.location.pathname + '#data=' + compressedData;

    document.getElementById('share-url').textContent = url;
    document.getElementById('shareModal').style.display = 'block';

    if (qrcode) {
        qrcode.clear();
        qrcode.makeCode(url);
    } else {
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
};

window.closeModal = function (id) {
    document.getElementById(id).style.display = 'none';
};

window.copyShareUrl = function () {
    const url = document.getElementById('share-url').textContent;
    navigator.clipboard.writeText(url).then(() => {
        alert(t('copySuccess'));
    });
};

window.exportDataToFile = async function () {
    const data = {
        v: 4,
        currentSeasonId: CURRENT_SEASON_ID,
        lang: currentLang,
        allSeasons: allSeasonsData
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ingress_all_seasons_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

window.importDataFromFile = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            processImport(data);
        } catch (err) {
            alert(t('invalidData'));
        }
    };
    reader.readAsText(file);
    event.target.value = '';
};

async function checkHashData() {
    const hash = window.location.hash;
    if (hash.startsWith('#data=')) {
        const dataStr = hash.substring(6);
        try {
            if (typeof LZString === 'undefined') {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js');
            }
            let jsonStr = LZString.decompressFromEncodedURIComponent(dataStr);

            if (!jsonStr) {
                try {
                    jsonStr = decodeURIComponent(escape(atob(dataStr)));
                } catch (e) {
                    jsonStr = null;
                }
            }

            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                window.history.replaceState(null, null, window.location.pathname);

                if (confirm(t('syncConfirm'))) {
                    processImport(data);
                }
            }
        } catch (err) {
            console.error('Failed to parse hash data', err);
        }
    }
}

async function checkMigrationHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#migration=')) {
        const dataStr = hash.substring(11);
        try {
            if (typeof LZString === 'undefined') {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js');
            }
            let jsonStr = LZString.decompressFromEncodedURIComponent(dataStr);
            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                handleMigrationData(data);
            }
        } catch (err) {
            console.error('Failed to parse migration data', err);
        }
    }
}

function handleMigrationData(data) {
    let legacyOrionData = null;
    if (data && data.allSeasons && data.allSeasons['2026_q2_orion']) {
        legacyOrionData = data.allSeasons['2026_q2_orion'];
    } else if (data && data.planner && data.seasonId === '2026_q2_orion') {
        legacyOrionData = data.planner;
    } else if (data && data.currentSeasonId === '2026_q2_orion' && data.allSeasons) {
        legacyOrionData = data.allSeasons['2026_q2_orion'];
    }

    if (!legacyOrionData) {
        alert(t('migNoDataFound'));
        window.history.replaceState(null, null, window.location.pathname);
        return;
    }

    const existingLocalData = allSeasonsData['2026_q2_orion'];
    let shouldImport = true;

    if (existingLocalData && (existingLocalData.globalTotal > 0 || Object.keys(existingLocalData.activities).length > 0)) {
        shouldImport = confirm(t('migOverwriteConfirm'));
    }

    if (shouldImport) {
        allSeasonsData['2026_q2_orion'] = legacyOrionData;
        localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(allSeasonsData));
        alert(t('migSuccess'));
    }

    window.history.replaceState(null, null, window.location.pathname);
    window.location.reload();
}

window.manualImportData = async function () {
    const input = prompt(t('promptManualImport'));
    if (input && input.startsWith("AGENTSKIT_")) {
        const dataStr = input.substring(10);
        try {
            if (typeof LZString === 'undefined') {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js');
            }
            let jsonStr = LZString.decompressFromEncodedURIComponent(dataStr);
            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                handleMigrationData(data);
            } else {
                alert(t('invalidData'));
            }
        } catch (err) {
            alert(t('invalidData'));
        }
    } else if (input) {
        alert(t('migInvalidFormatStr'));
    }
};

// ==================== CARD GENERATION ====================
window.generateCard = async function () {
    const agentName = document.getElementById('agent-name-input').value.trim() || 'UNKNOWN AGENT';
    const theme = document.getElementById('card-theme-select').value;

    const btn = document.getElementById('btn-generate-card');
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = '...';
    btn.disabled = true;

    // Lazy load html2canvas if not present
    if (typeof html2canvas === 'undefined') {
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        } catch (err) {
            console.error("Failed to load html2canvas", err);
            alert("Failed to load card generator library.");
            btn.querySelector('span').textContent = originalText;
            btn.disabled = false;
            return;
        }
    }

    // Populate template
    const template = document.getElementById('card-template');
    template.className = theme;

    document.getElementById('ct-title-l1').textContent = t('pageSubtitle');
    document.getElementById('ct-title-l2').textContent = t('pageTitle');
    document.getElementById('ct-footer-text').textContent = `GENERATED BY ${t('pageTitle').toUpperCase()}`;

    document.getElementById('ct-agent').textContent = agentName;

    const total = userData.globalTotal || 0;
    document.getElementById('ct-score').textContent = total.toLocaleString();

    let earnedTier = [...TIERS].reverse().find(t => total >= t.value);
    const badgeImg = document.getElementById('ct-badge');
    const congratsMsg = document.getElementById('ct-congrats');

    let imgLoadPromise = Promise.resolve();

    if (earnedTier) {
        const prefix = SEASON_DB[activeSeasonId].badgePath || 'static/orion/';
        badgeImg.src = `${prefix}${earnedTier.name.toLowerCase()}.png`;
        badgeImg.style.display = 'block';
        congratsMsg.textContent = t('congratsCardMsg')(earnedTier.name);
        congratsMsg.style.display = 'block';

        imgLoadPromise = new Promise((resolve) => {
            badgeImg.onload = resolve;
            badgeImg.onerror = resolve;
        });
    } else {
        badgeImg.style.display = 'none';
        congratsMsg.style.display = 'none';
    }

    let stats = {
        ifs: { a: 0, p: 0 },
        bounties: { a: 0, p: 0 },
        events: { a: 0, p: 0 },
        anomaly: { a: userData.activities['anomaly']?.actual || 0, p: userData.activities['anomaly']?.planned || 0 }
    };

    ACTIVITIES.forEach(act => {
        const actual = userData.activities[act.id]?.actual || 0;
        const planned = userData.activities[act.id]?.planned || 0;

        if (act.id.startsWith('ifs')) {
            stats.ifs.a += actual;
            stats.ifs.p += planned;
        } else if (act.isBounty) {
            stats.bounties.p = act.max;
        } else if (act.id !== 'anomaly') {
            stats.events.a += actual;
            stats.events.p += planned;
        }
    });

    let otherActualSum = stats.ifs.a + stats.events.a + stats.anomaly.a;
    stats.bounties.a = Math.max(0, total - otherActualSum);

    function formatStatHTML(a, p, isBounty = false) {
        if (p > 0) {
            const pct = Math.round((a / p) * 100);
            const pctText = isBounty ? t('bountyComplete')(pct) : t('pctComplete')(pct);
            return `${a.toLocaleString()}<div class="stat-pct">${pctText}</div>`;
        }
        return a.toLocaleString();
    }

    document.getElementById('ct-bounties').innerHTML = formatStatHTML(stats.bounties.a, stats.bounties.p, true);
    document.getElementById('ct-ifs').innerHTML = formatStatHTML(stats.ifs.a, stats.ifs.p);
    document.getElementById('ct-events').innerHTML = formatStatHTML(stats.events.a, stats.events.p);
    document.getElementById('ct-anomaly').innerHTML = formatStatHTML(stats.anomaly.a, stats.anomaly.p);

    try {
        await imgLoadPromise;
        await new Promise(r => setTimeout(r, 50));
        const canvas = await html2canvas(template, {
            scale: 2,
            backgroundColor: null,
            logging: false,
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');
        const container = document.getElementById('card-preview-container');
        container.innerHTML = `<img src="${imgData}" alt="Orion Card">`;

        document.getElementById('cardModal').style.display = 'block';
    } catch (err) {
        console.error("Card generation failed", err);
        alert("Generation failed. Please try again.");
    } finally {
        btn.querySelector('span').textContent = originalText;
        btn.disabled = false;
    }
};

function processImport(data) {
    if (data && (data.allSeasons || data.planner)) {
        let importedSeasons = {};

        if (data.allSeasons) {
            importedSeasons = data.allSeasons;
        } else if (data.planner) {
            const sid = data.seasonId || CURRENT_SEASON_ID;
            if (sid !== CURRENT_SEASON_ID) {
                if (!confirm(t('wrongSeason')(sid))) return;
            }
            importedSeasons[sid] = data.planner;
        }

        Object.keys(importedSeasons).forEach(sid => {
            allSeasonsData[sid] = importedSeasons[sid];
        });

        if (data.lang && I18N[data.lang]) {
            currentLang = data.lang;
            localStorage.setItem('agentskit_lang', currentLang);
        }

        localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(allSeasonsData));
        userData = allSeasonsData[activeSeasonId] || { globalTotal: 0, activities: {} };

        const inputEl = document.getElementById('global-total-actual');
        if (inputEl) inputEl.value = userData.globalTotal || 0;
        applyLanguage();
        alert(t('migSuccess'));
    } else {
        alert(t('invalidData'));
    }
}

// Initialize application
init();
