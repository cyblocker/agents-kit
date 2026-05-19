#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Extract critical I18N strings and core layout logic
 * This creates a minimal JS file needed for initial page render
 */

const criticalI18N = {
    zh: {
        phTitle: 'Ingress 赛季计划工具',
        inputTotal: '输入游戏内当前总分',
        loading: '加载中...',
    },
    en: {
        phTitle: 'Ingress Season Planner',
        inputTotal: 'Enter Current In-Game Total',
        loading: 'Loading...',
    },
    ja: {
        phTitle: 'Ingress シーズンプランナー',
        inputTotal: 'ゲーム内の現在の総トークンを入力',
        loading: '読み込み中...',
    }
};

const coreLogic = `
// Language detection & switching
let currentLang = localStorage.getItem('agentskit_lang') || detectLanguage();

function detectLanguage() {
    const browserLangs = navigator.languages || [navigator.language];
    for (const lang of browserLangs) {
        const short = lang.split('-')[0].toLowerCase();
        if (CRITICAL_I18N[short]) return short;
    }
    return 'en';
}

const CRITICAL_I18N = ${JSON.stringify(criticalI18N)};

// Quick i18n lookup for initial render
function t(key) {
    return CRITICAL_I18N[currentLang]?.[key] || CRITICAL_I18N['en'][key] || key;
}

// Set up language toggle
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            currentLang = lang;
            localStorage.setItem('agentskit_lang', lang);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Set initial active button
    document.querySelector(\`[data-lang="\${currentLang}"]\`)?.classList.add('active');
});

// Lazy load heavy scripts
function loadScriptsLazily() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadScripts);
    } else {
        loadScripts();
    }
}

function loadScripts() {
    // Load data.js after initial render
    const dataScript = document.createElement('script');
    dataScript.src = 'data.min.js?v=' + new Date().getTime();
    dataScript.defer = true;
    document.head.appendChild(dataScript);
    
    // Load main app logic after data is ready
    dataScript.onload = () => {
        const appScript = document.createElement('script');
        appScript.src = 'app.min.js?v=' + new Date().getTime();
        appScript.defer = true;
        document.head.appendChild(appScript);
    };
}

// Start lazy loading
loadScriptsLazily();
`;

// Write core.min.js
const OUTPUT_DIR = 'dist';
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(
    path.join(OUTPUT_DIR, 'core.min.js'),
    coreLogic
);

console.log('✓ Generated core.min.js with critical I18N and lazy loading');
console.log(`  Size: ${coreLogic.length} bytes`);
