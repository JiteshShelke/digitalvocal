// Complete Cookie Manager - Save this as cookie-manager.js
const CookieManager = {
    // Set a cookie with security attributes
    setCookie: function(name, value, days = 30, path = '/') {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        const sameSite = '; SameSite=Lax';
        
        document.cookie = `${name}=${value}${expires}; path=${path}${secure}${sameSite}`;
    },

    // Get a cookie value
    getCookie: function(name) {
        const nameEsplit(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    },

    // Delete a cookie
    deleteCookie: function(name, path = '/') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
    },

    // Check if cookies are enabled
    cookiesEnabled: function() {
        this.setCookie('test_cookie', 'test', 1);
        const enabled = this.getCookie('test_cookie') === 'test';
        this.deleteCookie('test_cookie');
        return enabled;
    }
};

// Cookie Consent Management
function showCookieConsent() {
    if (!CookieManager.getCookie('cookie_consent')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

function acceptCookies() {
    CookieManager.setCookie('cookie_consent', 'accepted', 365);
    document.getElementById('cookie-banner').style.display = 'none';
    enableCookieFeatures();
}

function declineCookies() {
    CookieManager.setCookie('cookie_consent', 'declined', 365);
    document.getElementById('cookie-banner').style.display = 'none';
}

function enableCookieFeatures() {
    trackUserVisit();
    loadTheme();
}

// User Visit Tracking
function trackUserVisit() {
    let visitCount = parseInt(CookieManager.getCookie('visit_count') || '0');
    visitCount++;
    CookieManager.setCookie('visit_count', visitCount.toString(), 30);
    
    if (visitCount === 1) {
        CookieManager.setCookie('first_visit', new Date().toISOString(), 365);
        console.log('Welcome! This is your first visit.');
    }
    
    const lastVisit = CookieManager.getCookie('last_visit');
    CookieManager.setCookie('last_visit', new Date().toISOString(), 30);
    
    console.log(`Visit #${visitCount}, Last visit: ${lastVisit || 'First time'}`);
}

// Theme Management
function setTheme(theme) {
    CookieManager.setCookie('user_theme', theme, 365);
    applyTheme(theme);
}

function loadTheme() {
    const savedTheme = CookieManager.getCookie('user_theme') || 'light';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    document.body.className = theme + '-theme';
}
