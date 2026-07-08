// =============================================
// FAQ.JS - Página de Perguntas Frequentes
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ FAQ.js carregado!');

    // ===== ACORDEÃO =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Fechar todos os itens
            faqItems.forEach(i => i.classList.remove('active'));

            // Abrir o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== FILTRO POR CATEGORIA =====
    const categoryButtons = document.querySelectorAll('.faq-cat');

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.cat;

            // Filtrar itens
            faqItems.forEach(item => {
                const itemCat = item.dataset.cat;
                if (category === 'geral' || itemCat === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
                // Fechar itens ao filtrar
                item.classList.remove('active');
            });
        });
    });

    // ===== ABRIR PRIMEIRO ITEM POR PADRÃO =====
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

});