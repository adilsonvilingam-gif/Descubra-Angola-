// =============================================
// RECOMENDAMOS.JS - Página de Recomendações
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Recomendamos.js carregado!');

    // ==========================================
    // 1. FILTRO POR CATEGORIA
    // ==========================================
    const categoryButtons = document.querySelectorAll('.recomendamos-cat');
    const cards = document.querySelectorAll('.recomendacao-card');
    const loadMoreBtn = document.getElementById('loadMoreRecomendamos');
    let visibleCards = 8;
    const cardsPerLoad = 4;

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
            visibleCards = 8;
            filterCards(category);
        });
    });

    // ==========================================
    // 2. CARREGAR MAIS
    // ==========================================
    loadMoreBtn.addEventListener('click', function() {
        const activeCategory = document.querySelector('.recomendamos-cat.active');
        const category = activeCategory ? activeCategory.dataset.cat : 'todos';
        const visibleCount = document.querySelectorAll('.recomendacao-card:not(.hidden)').length;

        visibleCards += cardsPerLoad;
        filterCards(category);

        if (window.showPushNotification) {
            window.showPushNotification('⭐ Mais recomendações carregadas!', '', 'success');
        }
    });

    // ==========================================
    // 3. NEWSLETTER
    // ==========================================
    const newsletterForm = document.querySelector('.recomendamos-newsletter-form');

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

    console.log('✅ Recomendamos.js - Filtros configurados!');
});