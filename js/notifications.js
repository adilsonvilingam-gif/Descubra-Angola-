// =============================================
// NOTIFICATIONS.JS - Sistema de Notificações
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Notifications.js carregado!');

    // ===== FUNÇÃO PRINCIPAL =====
    function showPushNotification(title, text, type = 'default') {
        const container = document.getElementById('notificationContainer');
        if (!container) {
            console.warn('Container de notificações não encontrado');
            return;
        }
        
        const icons = {
            default: '📢',
            success: '✅',
            error: '❌',
            warning: '⚠️'
        };
        
        const notification = document.createElement('div');
        notification.className = `notification-push ${type}`;
        notification.innerHTML = `
            <span class="notif-icon">${icons[type] || icons.default}</span>
            <div class="notif-content">
                <div class="notif-title">${title}</div>
                <div class="notif-text">${text}</div>
            </div>
            <button class="notif-close">✕</button>
        `;
        
        container.appendChild(notification);
        
        // Fechar manualmente
        notification.querySelector('.notif-close').addEventListener('click', function() {
            removeNotification(notification);
        });
        
        // Auto-fechar
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Limitar número de notificações
        while (container.children.length > 5) {
            container.removeChild(container.firstChild);
        }
    }

    function removeNotification(notification) {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    // ===== NOTIFICAÇÃO DE BOAS-VINDAS =====
    setTimeout(() => {
        if (!localStorage.getItem('visited')) {
            showPushNotification('Bem-vindo!', 'Descubra Angola, o ritmo da vida! 🌍');
            localStorage.setItem('visited', 'true');
        }
    }, 2000);

    // ===== EXPORTAR PARA OUTROS MÓDULOS =====
    window.showPushNotification = showPushNotification;

    console.log('✅ Notifications.js - Sistema de notificações carregado!');
});