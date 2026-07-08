// =============================================
// ANALYTICS.JS - Analytics Personalizado
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Analytics.js carregado!');

    // ===== CLASSE ANALYTICS =====
    class Analytics {
        constructor() {
            this.sessionId = this.getSessionId();
            this.startTime = Date.now();
            this.pageViews = 0;
            this.trackPageView();
            this.trackEvents();
        }
        
        getSessionId() {
            let sessionId = localStorage.getItem('analytics_session');
            if (!sessionId) {
                sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
                localStorage.setItem('analytics_session', sessionId);
            }
            return sessionId;
        }
        
        trackPageView() {
            this.pageViews++;
            const data = {
                page: window.location.pathname,
                title: document.title,
                session: this.sessionId,
                viewNumber: this.pageViews,
                timestamp: new Date().toISOString(),
                referrer: document.referrer || 'direct',
                screenSize: `${window.innerWidth}x${window.innerHeight}`
            };
            this.saveData('pageview', data);
        }
        
        trackEvent(category, action, label = null, value = null) {
            const data = {
                category,
                action,
                label,
                value,
                session: this.sessionId,
                timestamp: new Date().toISOString()
            };
            this.saveData('event', data);
        }
        
        saveData(type, data) {
            const key = `analytics_${type}`;
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            existing.push(data);
            if (existing.length > 100) {
                existing.shift();
            }
            localStorage.setItem(key, JSON.stringify(existing));
        }
        
        getStats() {
            const pageViews = JSON.parse(localStorage.getItem('analytics_pageview') || '[]');
            const events = JSON.parse(localStorage.getItem('analytics_event') || '[]');
            return {
                totalPageViews: pageViews.length,
                totalEvents: events.length,
                uniqueSessions: new Set(pageViews.map(p => p.session)).size,
                eventsByCategory: this.groupBy(events, 'category'),
                topPages: this.groupBy(pageViews, 'page')
            };
        }
        
        groupBy(arr, key) {
            return arr.reduce((acc, item) => {
                const val = item[key] || 'unknown';
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});
        }
    }

    // ===== INICIALIZAR =====
    const analytics = new Analytics();

    // ===== RASTREAR CLICK =====
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (target) {
            const text = target.textContent?.trim() || 'click';
            const href = target.href || '';
            const id = target.id || '';
            analytics.trackEvent('click', text, href, id);
        }
    });

    // ===== RASTREAR SCROLL =====
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const depth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (depth % 25 === 0 && depth > scrollDepth) {
            scrollDepth = depth;
            analytics.trackEvent('scroll', `${depth}%`);
        }
    });

    // ===== RASTREAR TEMPO NA PÁGINA =====
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 30;
        if (timeOnPage % 60 === 0) {
            analytics.trackEvent('time', `${timeOnPage/60}min`);
        }
    }, 30000);

    // ===== MOSTRAR STATS NO CONSOLE =====
    console.log('📊 Analytics Stats:', analytics.getStats());

    // ===== EXPORTAR PARA OUTROS MÓDULOS =====
    window.analytics = analytics;

    console.log('✅ Analytics.js - Analytics carregado!');
});