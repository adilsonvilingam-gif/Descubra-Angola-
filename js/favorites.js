// =============================================
// FAVORITES.JS - Sistema de Favoritos
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Favorites.js carregado!');

    // ===== NOTIFICAÇÃO LOCAL =====
    function showLocalNotification(message) {
        if (window.showPushNotification) {
            window.showPushNotification(message, '', 'default');
        } else {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }

    // ===== INICIALIZAR BOTÕES FAVORITOS =====
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const destino = btn.dataset.destino;
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favorites.includes(destino)) {
            btn.classList.add('active');
            btn.textContent = '♥';
        }
        
        btn.addEventListener('click', function() {
            const destinoId = this.dataset.destino;
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            if (favorites.includes(destinoId)) {
                favorites = favorites.filter(f => f !== destinoId);
                this.classList.remove('active');
                this.textContent = '♡';
                showLocalNotification('Removido dos favoritos 💔');
            } else {
                favorites.push(destinoId);
                this.classList.add('active');
                this.textContent = '♥';
                showLocalNotification('Adicionado aos favoritos ❤️');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    console.log('✅ Favorites.js - Sistema de favoritos carregado!');
});