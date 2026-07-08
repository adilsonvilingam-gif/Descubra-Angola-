// =============================================
// PASSEIOS.JS - Página de Passeios
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Passeios.js carregado!');

    // ==========================================
    // 1. FILTRO POR CATEGORIA
    // ==========================================
    const categoryButtons = document.querySelectorAll('.passeio-cat');
    const cards = document.querySelectorAll('.passeio-card');
    const loadMoreBtn = document.getElementById('loadMorePasseios');
    let visibleCards = 6;
    const cardsPerLoad = 3;

    function filterCards(category) {
        let visibleCount = 0;

        cards.forEach((card, index) => {
            const cardCat = card.dataset.cat;
            const isVisible = category === 'todos' || cardCat === category;

            if (isVisible) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }

            if (visibleCount > visibleCards) {
                card.classList.add('hidden');
            }
        });

        if (visibleCount <= visibleCards) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.cat;
            visibleCards = 6;
            filterCards(category);
        });
    });

    // ==========================================
    // 2. CARREGAR MAIS
    // ==========================================
    loadMoreBtn.addEventListener('click', function() {
        const activeCategory = document.querySelector('.passeio-cat.active');
        const category = activeCategory ? activeCategory.dataset.cat : 'todos';
        const visibleCount = document.querySelectorAll('.passeio-card:not(.hidden)').length;

        visibleCards += cardsPerLoad;
        filterCards(category);

        if (window.showPushNotification) {
            window.showPushNotification('📋 Mais passeios carregados!', '', 'success');
        }
    });

    // ==========================================
    // 3. NEWSLETTER
    // ==========================================
    const newsletterForm = document.querySelector('.passeios-newsletter-form');

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

    // ==========================================
    // 4. INICIALIZAR
    // ==========================================
    filterCards('todos');

    console.log('✅ Passeios.js - Filtros configurados!');
});