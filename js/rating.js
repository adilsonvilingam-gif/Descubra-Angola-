// =============================================
// RATING.JS - Sistema de Avaliação (Estrelas)
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Rating.js carregado!');

    // ===== FUNÇÃO DE NOTIFICAÇÃO LOCAL =====
    function showRatingNotification(message) {
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

    // ===== INICIALIZAR AVALIAÇÕES =====
    document.querySelectorAll('.rating').forEach(function(rating) {
        const stars = rating.querySelectorAll('.star');
        const result = rating.querySelector('.rating-result');
        const count = rating.querySelector('.rating-count');
        const destinoId = rating.dataset.destino;
        
        // Carregar dados salvos
        const savedRating = localStorage.getItem(`rating-${destinoId}`);
        const savedCount = localStorage.getItem(`rating-count-${destinoId}`) || 0;
        const savedTotal = localStorage.getItem(`rating-total-${destinoId}`) || 0;
        
        let currentRating = parseInt(savedRating) || 0;
        let totalRatings = parseInt(savedCount);
        let totalStars = parseInt(savedTotal);
        
        // ===== ATUALIZAR DISPLAY =====
        function updateDisplay() {
            const avg = totalRatings > 0 ? (totalStars / totalRatings) : 0;
            if (result) result.textContent = `⭐ ${avg.toFixed(1)}/5`;
            if (count) count.textContent = `(${totalRatings} avaliações)`;
            
            stars.forEach(function(s) {
                const value = parseInt(s.dataset.value);
                s.classList.toggle('rated', value <= Math.round(avg));
                s.classList.toggle('active', value <= currentRating);
            });
        }
        
        // ===== EVENTOS DAS ESTRELAS =====
        stars.forEach(function(star) {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                currentRating = value;
                
                localStorage.setItem(`rating-${destinoId}`, value);
                
                totalRatings++;
                totalStars += value;
                localStorage.setItem(`rating-count-${destinoId}`, totalRatings);
                localStorage.setItem(`rating-total-${destinoId}`, totalStars);
                
                updateDisplay();
                showRatingNotification('⭐ Avaliação registada!');
            });
            
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                stars.forEach(function(s) {
                    s.classList.toggle('active', parseInt(s.dataset.value) <= value);
                });
            });
            
            star.addEventListener('mouseleave', function() {
                updateDisplay();
            });
        });
        
        updateDisplay();
    });

    console.log('✅ Rating.js - Sistema de avaliação carregado!');
});