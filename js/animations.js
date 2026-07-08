// =============================================
// ANIMATIONS.JS - Animações de Entrada
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Animations.js carregado!');

    // ===== ANIMAÇÃO DE ENTRADA DOS CARDS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // ===== SELECIONAR ELEMENTOS =====
    const elementos = document.querySelectorAll(
        '.card, .recomendacao-item, .destino-card, ' +
        '.experiencia-item, .depoimento-card, ' +
        '.sobre-content, .sobre-image'
    );

    elementos.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== CONTADORES ANIMADOS =====
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach(function(num) {
        const target = parseInt(num.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = function() {
            if (current < target) {
                current += increment;
                num.textContent = Math.round(current) + (target > 50 ? '+' : '');
                setTimeout(updateNumber, 30);
            } else {
                num.textContent = target + (target > 50 ? '+' : '');
            }
        };
        
        const observerNum = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                updateNumber();
                observerNum.disconnect();
            }
        });
        observerNum.observe(num);
    });

    console.log('✅ Animations.js - Animações carregadas!');
});