#!/usr/bin/env node
/**
 * Extracts core initialization & i18n code from index.html
 * Creates: core.js - minimal code for layout + language toggle
 */
const fs = require('fs');
const path = require('path');

const coreLogic = `
// ==================== I18N ====================
const I18N = {
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
        daysCompleted: (d) => \`约完成 \${d} 天\`,
        bountyHint: (p) => \`明天起至季末最高还可得: \${p} tokens\`,
        reachedPlatinum: '已达成 Platinum!',
        toTier: (name) => \`距离 \${name} 勋章\`,
        maxTierForecast: (name) => \`最高预计可获 \${name} 勋章\`,
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
        wrongSeason: (s) => \`此数据属于其他赛季 (\${s})，是否仍要导入？\`,
        confirmMergeAllSeasons: '检测到多赛季全量数据，是否覆盖本地所有赛季记录？',
        textCardModule: '赛季纪念卡片',
        agentPlaceholder: '特工代号 (Agent Name)',
        optThemeDefault: '默认 (深色)',
        optThemeRes: '抵抗军 (蓝色)',
        optThemeEnl: '启蒙军 (绿色)',
        btnGenerateCard: '生成纪念卡片',
        modalCardTitle: '保存纪念卡片',
        modalCardDesc: '生成完成！电脑上可右键另存为，手机上长按下方图片保存到相册，或分享给朋友。',
        statBounties: '每日任务',
        statIFS: 'IFS (First Saturday)',
        statEvents: '现场活动与行动',
        statAnomaly: 'Anomaly 现场',
        pctComplete: (p) => \`目标完成 \${p}%\`,
        bountyComplete: (p) => \`完成 \${p}%\`,
        congratsCardMsg: (t) => \`获得 \${t} 奖牌！\`,
        motivationBadge: (t) => \`恭喜您已达成 \${t} 奖牌，快来生成纪念卡片分享一下吧！\`,
        motivationNormal: '赛季即将结束，来生成一张专属您的赛季成绩卡片吧！',
        startsIn: (t) => \`\${t} 后开始\`,
        endsIn: (t) => \`\${t} 后结束\`,
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
        daysCompleted: (d) => \`~\${d} days completed\`,
        bountyHint: (p) => \`Max remaining from tomorrow to season end: \${p} tokens\`,
        reachedPlatinum: 'Platinum Achieved!',
        toTier: (name) => \`Until \${name} Badge\`,
        maxTierForecast: (name) => \`Projected max: \${name} Badge\`,
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
        wrongSeason: (s) => \`This data belongs to another season (\${s}). Import anyway?\`,
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
        pctComplete: (p) => \`\${p}% of Target\`,
        bountyComplete: (p) => \`\${p}% Complete\`,
        congratsCardMsg: (t) => \`\${t} Badge Earned!\`,
        motivationBadge: (t) => \`Congratulations on reaching the \${t} badge! Generate a card to share it!\`,
        motivationNormal: 'The season is coming to a close. Generate your personalized commemorative card!',
        startsIn: (t) => \`Starts in \${t}\`,
        endsIn: (t) => \`Ends in \${t}\`,
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
        migBannerDesc: 'It seems you haven\\'t recorded any data on Agents Kit yet. If you have records on the legacy site, you can sync them now.',
        limitLabel: 'Limit',
    },
    ja: {
        phTitle: 'Ingress シーズンプランナー',
        phDesc: '新シーズンにご期待ください！その間、以下の過去のシーズンを振り返ることができます：',
        inputTotal: 'ゲーム内の現在の総トークンを入力',
        inputPlaceholder: 'クリックして入力',
        inputHint: 'Season Tokens 合計値',
        plannedRange: '予想獲得トークン範囲',
        calculatingStatus: 'ポテンシャルから計算中...',
        nextTierLabel: '次のランクまで',
        loading: '読み込み中...',
        thActivity: 'OP/イベント',
        thMax: '最大値',
        thPlanned: '計画',
        thActual: '実績（計算/入力）',
        thUpdated: '最終更新',
        footerFormula: 'デイリータスクトークン = 総トークン - 他項目の実績合計',
        seeRange: '予想範囲を参照',
        daysCompleted: (d) => \`約\${d}日完了\`,
        bountyHint: (p) => \`明日からシーズン終了までの最大獲得可能数: \${p} tokens\`,
        reachedPlatinum: 'Platinum 達成！',
        toTier: (name) => \`\${name} メダルまであと\`,
        maxTierForecast: (name) => \`予想される最大メダル: \${name}\`,
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
        wrongSeason: (s) => \`このデータは別のシーズン (\${s}) のものです。インポートしますか？\`,
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
        pctComplete: (p) => \`計画達成率 \${p}%\`,
        bountyComplete: (p) => \`達成率 \${p}%\`,
        congratsCardMsg: (t) => \`\${t} メダル獲得！\`,
        motivationBadge: (t) => \`\${t} メダル獲得おめでとうございます！記念カードを生成してシェアしましょう！\`,
        motivationNormal: 'シーズンが終了に近づいています。あなただけの記念カードを作りましょう！',
        startsIn: (t) => \`あと \${t} で開始\`,
        endsIn: (t) => \`あと \${t} で終了\`,
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

function detectLanguage() {
    const saved = localStorage.getItem('agentskit_lang');
    if (saved) return saved;

    const browserLangs = navigator.languages || [navigator.language];
    for (const lang of browserLangs) {
        const short = lang.split('-')[0].toLowerCase();
        if (I18N[short]) return short;
    }
    return 'en';
}

let currentLang = detectLanguage();

// Language toggle handlers
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', function() {
            currentLang = this.dataset.lang;
            localStorage.setItem('agentskit_lang', currentLang);
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
        });
    });
});

function t(key) {
    let seasonI18n = SEASON_DB[activeSeasonId]?.i18n;
    if (seasonI18n && seasonI18n[currentLang] && seasonI18n[currentLang][key]) {
        return seasonI18n[currentLang][key];
    }
    if (I18N[currentLang] && I18N[currentLang][key]) {
        return I18N[currentLang][key];
    }
    return typeof I18N['en'][key] === 'function' ? I18N['en'][key] : key;
}
`;

fs.writeFileSync(path.join('dist', 'core.js'), coreLogic);
console.log('✓ Generated core.js (I18N + Language toggle)');
