// =============================================
// SAFARIS.JS - Página de Safaris
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Safaris.js carregado!');

    // ==========================================
    // 1. CARREGAR MAIS SAFARIS
    // ==========================================
    const loadMoreBtn = document.getElementById('loadMoreSafaris');
    const cards = document.querySelectorAll('.safari-card');
    let visibleCards = 6;
    const cardsPerLoad = 3;

    loadMoreBtn.addEventListener('click', function() {
        const hiddenCards = document.querySelectorAll('.safari-card.hidden');
        let count = 0;

        hiddenCards.forEach((card, index) => {
            if (index < cardsPerLoad) {
                card.classList.remove('hidden');
                count++;
            }
        });

        visibleCards += count;

        // Verificar se ainda há cards escondidos
        const remainingHidden = document.querySelectorAll('.safari-card.hidden');
        if (remainingHidden.length === 0) {
            loadMoreBtn.style.display = 'none';
        }

        if (window.showPushNotification) {
            window.showPushNotification('🦁 Mais safaris carregados!', '', 'success');
        }
    });

    // ==========================================
    // 2. INICIALIZAR - Mostrar apenas os primeiros 6
    // ==========================================
    cards.forEach((card, index) => {
        if (index >= 6) {
            card.classList.add('hidden');
        }
    });

    // Se houver menos de 6 cards, esconder o botão
    if (cards.length <= 6) {
        loadMoreBtn.style.display = 'none';
    }

    // ==========================================
    // 3. NEWSLETTER
    // ==========================================
    const newsletterForm = document.querySelector('.safaris-newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const email = input.value.trim();

            if (email) {
                if (window.showPushNotification) {
                    window.showPushNotification('✅ Inscrição realizada!', 'Obrigado por se inscrever.', 'success');
                }
                input.value = '';
            }
        });
    }

    console.log('✅ Safaris.js - Carregamento configurado!');
});