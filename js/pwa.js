// =============================================
// PWA.JS - Progressive Web App
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ PWA.js carregado!');

    // ===== SERVICE WORKER =====
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('../sw.js')
                .then(function(registration) {
                    console.log('✅ ServiceWorker registrado com sucesso!');
                })
                .catch(function(err) {
                    console.log('❌ ServiceWorker falhou:', err);
                });
        });
    }

    // ===== INSTALAÇÃO =====
    let deferredPrompt;
    let installButton = null;

    window.addEventListener('beforeinstallprompt', function(e) {
        e.preventDefault();
        deferredPrompt = e;
        
        // Criar botão de instalação
        if (!installButton) {
            installButton = document.createElement('button');
            installButton.textContent = '📱 Instalar App';
            installButton.className = 'install-app-btn';
            installButton.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 100px;
                background: linear-gradient(135deg, #FFB703, #E85D04);
                color: #0F172A;
                padding: 12px 24px;
                border: none;
                border-radius: 30px;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(255,183,3,0.4);
                z-index: 997;
                transition: all 0.3s;
                display: none;
            `;
            
            installButton.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            installButton.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            installButton.addEventListener('click', function() {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(function(choiceResult) {
                        if (choiceResult.outcome === 'accepted') {
                            if (window.showPushNotification) {
                                window.showPushNotification('App instalado!', '✅', 'success');
                            }
                        }
                        deferredPrompt = null;
                        installButton.style.display = 'none';
                    });
                }
            });
            
            document.body.appendChild(installButton);
        }
        
        // Mostrar botão após 3 segundos
        setTimeout(() => {
            if (installButton) {
                installButton.style.display = 'block';
            }
        }, 3000);
    });

    // ===== APP INSTALADO =====
    window.addEventListener('appinstalled', function() {
        if (window.showPushNotification) {
            window.showPushNotification('App instalado com sucesso!', '🎉', 'success');
        }
        if (installButton) {
            installButton.style.display = 'none';
        }
    });

    console.log('✅ PWA.js - PWA carregado!');
});