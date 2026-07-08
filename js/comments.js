// =============================================
// COMMENTS.JS - Sistema de Comentários
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Comments.js carregado!');

    // ===== ESCAPAR HTML =====
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ===== CARREGAR COMENTÁRIOS =====
    function loadComments(section) {
        const destino = section.dataset.destino;
        const list = section.querySelector('.comments-list');
        const comments = JSON.parse(localStorage.getItem(`comments-${destino}`) || '[]');
        
        if (list) {
            list.innerHTML = '';
            comments.forEach(comment => {
                const div = document.createElement('div');
                div.className = 'comment-item';
                div.innerHTML = `
                    <span class="comment-author">${escapeHtml(comment.name)}</span>
                    <span class="comment-date">${comment.date}</span>
                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                `;
                list.appendChild(div);
            });
        }
    }

    // ===== ADICIONAR COMENTÁRIO =====
    function addComment(section) {
        const destino = section.dataset.destino;
        const nameInput = section.querySelector('.comment-name');
        const textInput = section.querySelector('.comment-text');
        const name = nameInput?.value.trim() || '';
        const text = textInput?.value.trim() || '';
        
        if (!name) {
            if (window.showPushNotification) {
                window.showPushNotification('Por favor, insira seu nome.', '⚠️', 'warning');
            }
            nameInput?.focus();
            return;
        }
        
        if (!text) {
            if (window.showPushNotification) {
                window.showPushNotification('Por favor, escreva um comentário.', '⚠️', 'warning');
            }
            textInput?.focus();
            return;
        }
        
        const comments = JSON.parse(localStorage.getItem(`comments-${destino}`) || '[]');
        comments.push({
            name: name,
            text: text,
            date: new Date().toLocaleDateString('pt-PT')
        });
        localStorage.setItem(`comments-${destino}`, JSON.stringify(comments));
        
        if (nameInput) nameInput.value = '';
        if (textInput) textInput.value = '';
        loadComments(section);
        
        if (window.showPushNotification) {
            window.showPushNotification('💬 Comentário adicionado!', '', 'success');
        }
    }

    // ===== INICIALIZAR SEÇÕES DE COMENTÁRIOS =====
    document.querySelectorAll('.comments-section').forEach(section => {
        const submitBtn = section.querySelector('.comment-submit');
        const textInput = section.querySelector('.comment-text');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                addComment(section);
            });
        }
        
        if (textInput) {
            textInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addComment(section);
                }
            });
        }
        
        loadComments(section);
    });

    console.log('✅ Comments.js - Sistema de comentários carregado!');
});