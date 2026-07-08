// =============================================
// GALERIA.JS - Página de Galeria
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Galeria.js carregado!');

    // ==========================================
    // 1. FILTRO POR CATEGORIA
    // ==========================================
    const categoryButtons = document.querySelectorAll('.galeria-cat');
    const items = document.querySelectorAll('.galeria-item');
    const loadMoreBtn = document.getElementById('loadMoreGaleria');
    let visibleItems = 12;
    const itemsPerLoad = 6;

    function filterItems(category) {
        let visibleCount = 0;

        items.forEach((item, index) => {
            const itemCat = item.dataset.cat;
            const isVisible = category === 'todos' || itemCat === category;

            if (isVisible) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }

            if (visibleCount > visibleItems) {
                item.classList.add('hidden');
            }
        });

        if (visibleCount <= visibleItems) {
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
            visibleItems = 12;
            filterItems(category);
        });
    });

    // ==========================================
    // 2. CARREGAR MAIS
    // ==========================================
    loadMoreBtn.addEventListener('click', function() {
        const activeCategory = document.querySelector('.galeria-cat.active');
        const category = activeCategory ? activeCategory.dataset.cat : 'todos';
        const visibleCount = document.querySelectorAll('.galeria-item:not(.hidden)').length;

        visibleItems += itemsPerLoad;
        filterItems(category);

        if (window.showPushNotification) {
            window.showPushNotification('📸 Mais fotos carregadas!', '', 'success');
        }
    });

    // ==========================================
    // 3. NEWSLETTER
    // ==========================================
    const newsletterForm = document.querySelector('.galeria-newsletter-form');

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
    filterItems('todos');

    console.log('✅ Galeria.js - Filtros configurados!');
});