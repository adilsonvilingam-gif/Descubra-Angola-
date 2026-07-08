// =============================================
// CONTACTO.JS - Página de Contacto
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ Contacto.js carregado!');

    const form = document.getElementById('contactForm');
    const message = document.getElementById('contactMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('contactNome').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const telefone = document.getElementById('contactTelefone').value.trim();
            const assunto = document.getElementById('contactAssunto').value;
            const mensagem = document.getElementById('contactMensagem').value.trim();
            const submitBtn = this.querySelector('.btn-enviar');
            
            // Validação
            if (!nome || !email || !mensagem) {
                showMessage('❌ Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('❌ Por favor, insira um email válido.', 'error');
                return;
            }
            
            if (!assunto) {
                showMessage('❌ Por favor, selecione um assunto.', 'error');
                return;
            }
            
            // Desabilitar botão
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Simular envio
            setTimeout(function() {
                showMessage('✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensagem';
                
                // Notificação
                if (window.showPushNotification) {
                    window.showPushNotification('Mensagem enviada!', 'Entraremos em contacto em breve.', 'success');
                }
            }, 1500);
        });
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.className = 'form-message ' + type + ' show';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Limpar mensagem ao digitar
    document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(el => {
        el.addEventListener('input', function() {
            message.className = 'form-message';
        });
    });
});