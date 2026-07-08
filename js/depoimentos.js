// =============================================
// DEPOIMENTOS.JS - Página de Depoimentos
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Depoimentos.js carregado!');

    // ==========================================
    // 1. CARREGAR MAIS DEPOIMENTOS
    // ==========================================
    const loadMoreBtn = document.getElementById('loadMoreDepoimentos');
    const cards = document.querySelectorAll('.depoimento-card');
    let visibleCards = 6;
    const cardsPerLoad = 3;

    // Inicializar - mostrar apenas os primeiros 6
    cards.forEach((card, index) => {
        if (index >= 6) {
            card.classList.add('hidden');
        }
    });

    if (cards.length <= 6) {
        loadMoreBtn.style.display = 'none';
    }

    loadMoreBtn.addEventListener('click', function() {
        const hiddenCards = document.querySelectorAll('.depoimento-card.hidden');
        let count = 0;

        hiddenCards.forEach((card, index) => {
            if (index < cardsPerLoad) {
                card.classList.remove('hidden');
                count++;
            }
        });

        visibleCards += count;

        const remainingHidden = document.querySelectorAll('.depoimento-card.hidden');
        if (remainingHidden.length === 0) {
            loadMoreBtn.style.display = 'none';
        }

        if (window.showPushNotification) {
            window.showPushNotification('💬 Mais depoimentos carregados!', '', 'success');
        }
    });

    // ==========================================
    // 2. ANIMAÇÃO DOS CARDS AO SCROLL
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    console.log('✅ Depoimentos.js - Carregamento configurado!');
});