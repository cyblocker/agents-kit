// ==================== CORE INITIALIZATION & LOADING ====================

const CRITICAL_I18N = {
    zh: {
        phTitle: 'Ingress 赛季计划工具',
        pageTitle: 'Ingress 赛季计划工具',
        pageSubtitle: '加载中...',
        inputTotal: '输入游戏内当前总分',
        loading: '加载中...',
    },
    en: {
        phTitle: 'Ingress Season Planner',
        pageTitle: 'Ingress Season Planner',
        pageSubtitle: 'Loading...',
        inputTotal: 'Enter Current In-Game Total',
        loading: 'Loading...',
    },
    ja: {
        phTitle: 'Ingress シーズンプランナー',
        pageTitle: 'Ingress シーズンプランナー',
        pageSubtitle: '読み込み中...',
        inputTotal: 'ゲーム内の現在の総トークンを入力',
        loading: '読み込み中...',
    },
    de: {
        phTitle: 'Ingress Saisonplaner',
        pageTitle: 'Ingress Saisonplaner',
        pageSubtitle: 'Wird geladen...',
        inputTotal: 'Aktuelle In-Game Punktzahl eingeben',
        loading: 'Wird geladen...',
    }
};

function detectLanguage() {
    const saved = localStorage.getItem('agentskit_lang');
    if (saved) return saved;

    const browserLangs = navigator.languages || [navigator.language];
    for (const lang of browserLangs) {
        const short = lang.split('-')[0].toLowerCase();
        if (CRITICAL_I18N[short]) return short;
    }
    return 'en';
}

let currentLang = detectLanguage();

function t(key) {
    // If the full I18N is defined by app.js, use it
    if (typeof I18N !== 'undefined' && I18N[currentLang]) {
        let val = I18N[currentLang][key];
        if (val) return val;
        
        // Fallback for custom DB-specific i18n
        if (typeof SEASON_DB !== 'undefined' && typeof activeSeasonId !== 'undefined') {
            let seasonI18n = SEASON_DB[activeSeasonId]?.i18n;
            if (seasonI18n && seasonI18n[currentLang] && seasonI18n[currentLang][key]) {
                return seasonI18n[currentLang][key];
            }
        }
        
        // Fallback to English in I18N
        if (I18N['en'] && I18N['en'][key]) return I18N['en'][key];
    }
    
    // Otherwise fallback to critical translations
    if (CRITICAL_I18N[currentLang] && CRITICAL_I18N[currentLang][key]) {
        return CRITICAL_I18N[currentLang][key];
    }
    if (CRITICAL_I18N['en'][key]) {
        return CRITICAL_I18N['en'][key];
    }
    return key;
}

// Initial Fast Title and Skeleton Render
document.addEventListener('DOMContentLoaded', () => {
    // Apply detected language class to buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            localStorage.setItem('agentskit_lang', currentLang);
            langButtons.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
            // Trigger language apply (will be handled by app.js if loaded)
            if (typeof applyLanguage === 'function') {
                applyLanguage();
            } else {
                document.documentElement.lang = currentLang;
            }
        });
    });

    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : currentLang;
    
    const phTitleEl = document.getElementById('ph-title');
    if (phTitleEl) phTitleEl.textContent = t('phTitle');
    
    const pageTitleEl = document.getElementById('page-title');
    if (pageTitleEl) pageTitleEl.textContent = t('pageTitle');
    
    const pageSubtitleEl = document.getElementById('page-subtitle');
    if (pageSubtitleEl) pageSubtitleEl.textContent = t('pageSubtitle');

    const totalLabelEl = document.getElementById('label-input-total');
    if (totalLabelEl) totalLabelEl.textContent = t('inputTotal');
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('SW registered:', reg);
        }).catch(err => {
            console.log('SW registration failed:', err);
        });

        // Automatically reload the page when a new service worker takes control
        let refreshing = false;
        const hasController = !!navigator.serviceWorker.controller;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            if (hasController) {
                window.location.reload();
            }
        });
    });
}

// Script Loader with fallback / cache-busting
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
