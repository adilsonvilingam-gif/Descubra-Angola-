// =============================================
// LOADING.JS - Loading Skeleton
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Loading.js carregado!');

    const skeleton = document.getElementById('loadingSkeleton');
    
    if (skeleton) {
        // Esconder skeleton após o carregamento
        setTimeout(function() {
            skeleton.classList.add('skeleton-hidden');
            // Mostrar conteúdo
            document.querySelector('.destinos .cards-grid')?.style.setProperty('display', 'grid');
        }, 1500);
    }

    console.log('✅ Loading.js - Skeleton carregado!');
});