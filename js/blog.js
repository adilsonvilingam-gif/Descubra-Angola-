// =============================================
// BLOG.JS - Página do Blog
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Blog.js carregado!');

    // ==========================================
    // 1. FILTRO POR CATEGORIA
    // ==========================================
    const categoryButtons = document.querySelectorAll('.blog-cat');
    const posts = document.querySelectorAll('.blog-post');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let visiblePosts = 6;
    const postsPerLoad = 3;

    // Função para filtrar posts
    function filterPosts(category) {
        let visibleCount = 0;

        posts.forEach((post, index) => {
            const postCat = post.dataset.cat;
            const isVisible = category === 'todos' || postCat === category;

            // Aplicar filtro
            if (isVisible) {
                post.classList.remove('hidden');
                visibleCount++;
            } else {
                post.classList.add('hidden');
            }

            // Mostrar/Esconder com base no número de posts visíveis
            if (visibleCount > visiblePosts) {
                post.classList.add('hidden');
            }
        });

        // Atualizar botão
        if (visibleCount <= visiblePosts) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    // Evento dos botões de categoria
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.cat;
            visiblePosts = 6;
            filterPosts(category);
        });
    });

    // ==========================================
    // 2. CARREGAR MAIS POSTS
    // ==========================================
    loadMoreBtn.addEventListener('click', function() {
        const activeCategory = document.querySelector('.blog-cat.active');
        const category = activeCategory ? activeCategory.dataset.cat : 'todos';
        const visibleCount = document.querySelectorAll('.blog-post:not(.hidden)').length;

        visiblePosts += postsPerLoad;
        filterPosts(category);

        // Mostrar notificação
        if (window.showPushNotification) {
            window.showPushNotification('📰 Mais artigos carregados!', '', 'success');
        }
    });

    // ==========================================
    // 3. INICIALIZAR
    // ==========================================
    filterPosts('todos');

    // ==========================================
    // 4. NEWSLETTER
    // ==========================================
    const newsletterForm = document.querySelector('.blog-newsletter-form');

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

    console.log('✅ Blog.js - Filtros e carregamento configurados!');
});