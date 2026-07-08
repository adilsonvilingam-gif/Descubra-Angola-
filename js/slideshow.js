// =============================================
// SLIDESHOW.JS - Slideshow/Carrossel
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Slideshow.js carregado!');

    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) {
        console.warn('⚠️ Nenhum slide encontrado!');
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval = null;
    const AUTOPLAY_DELAY = 5000; // 5 segundos

    console.log(`📊 Total de slides: ${totalSlides}`);

    // ===== FUNÇÕES =====
    function goToSlide(index) {
        // Remove active de todos os slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Remove active de todos os dots
        document.querySelectorAll('.slide-dot').forEach(dot => dot.classList.remove('active'));
        
        // Corrige o índice (loop infinito)
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Adiciona active ao slide atual
        slides[index].classList.add('active');
        
        // Adiciona active ao dot correspondente
        const dots = document.querySelectorAll('.slide-dot');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
        console.log(`🔄 Slide atual: ${index + 1}/${totalSlides}`);
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // ===== INICIAR / PARAR AUTOPLAY =====
    function startAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
        slideInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        console.log('▶️ Autoplay iniciado');
    }

    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
            console.log('⏹️ Autoplay parado');
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // ===== CRIAR DOTS DINAMICAMENTE =====
    const dotsContainer = document.querySelector('.slide-dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = ''; // Limpa dots existentes
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slide-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            dot.dataset.index = index;
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.dataset.index));
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        });
        console.log(`✅ ${totalSlides} dots criados`);
    } else {
        console.warn('⚠️ Container de dots não encontrado!');
    }

    // ===== EVENTOS DOS BOTÕES =====
    const nextBtn = document.querySelector('.slide-btn.next');
    const prevBtn = document.querySelector('.slide-btn.prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoplay();
        });
        console.log('✅ Botão "Próximo" configurado');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoplay();
        });
        console.log('✅ Botão "Anterior" configurado');
    }

    // ===== PAUSAR AO PASSAR MOUSE =====
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
            console.log('🐭 Mouse entrou - pausando autoplay');
            stopAutoplay();
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            console.log('🐭 Mouse saiu - retomando autoplay');
            startAutoplay();
        });
        
        // Para dispositivos touch (mobile)
        slideshowContainer.addEventListener('touchstart', function() {
            stopAutoplay();
        });
        
        slideshowContainer.addEventListener('touchend', function() {
            // Retoma após 3 segundos sem toque
            setTimeout(startAutoplay, 3000);
        });
        
        console.log('✅ Eventos de hover configurados');
    }

    // ===== TECLAS DO TECLADO =====
    document.addEventListener('keydown', function(e) {
        // Só funciona se o slideshow estiver visível na tela
        const rect = slideshowContainer?.getBoundingClientRect();
        const isVisible = rect && rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            resetAutoplay();
        }
    });
    console.log('✅ Teclas de navegação configuradas');

    // ===== INICIALIZAÇÃO =====
    // Garantir que o primeiro slide está ativo
    goToSlide(0);
    startAutoplay();

    console.log(`✅ Slideshow inicializado com ${totalSlides} slides!`);
    console.log('🔄 Autoplay a cada ' + AUTOPLAY_DELAY / 1000 + ' segundos');

});