// =============================================
// CHAT.JS - Chatbot Interativo (Widget)
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Chat.js carregado!');

    // ===== ELEMENTOS =====
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    // ===== RESPOSTAS =====
    const respostas = {
        'destinos': '🌍 Temos destinos incríveis como a Serra da Leba, Miradouro da Lua, Quedas do Kalandula, Ilha do Mussulo, Tundavala e Parque da Kissama. Qual gostaria de conhecer?',
        'safaris': '🦒 Temos safaris no Parque da Kissama e na Reserva do Mucusso. Você pode ver elefantes, girafas, palancas negras e muito mais!',
        'precos': '💰 Os preços variam conforme o destino. Temos opções gratuitas (Serra da Leba, Miradouro da Lua) e opções pagas (Kalandula: 2.000 Kz, Kissama: 15.000 Kz).',
        'contato': '📞 Pode nos contactar pelo email info@descubraangola.com ou pelo telefone +244 923 456 789. Estamos aqui para ajudar!',
        'default': 'Desculpe, não entendi sua pergunta. Pode perguntar sobre Destinos, Safaris, Preços ou Contacto.'
    };

    // ===== FUNÇÕES =====
    function addMessage(text, sender) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.innerHTML = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(question) {
        const lower = question.toLowerCase();
        if (lower.includes('destino') || lower.includes('lugar')) return respostas.destinos;
        if (lower.includes('safari') || lower.includes('animal')) return respostas.safaris;
        if (lower.includes('preço') || lower.includes('custo') || lower.includes('quanto')) return respostas.precos;
        if (lower.includes('contact') || lower.includes('email') || lower.includes('telefone')) return respostas.contato;
        return respostas.default;
    }

    function sendMessage() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 500);
    }

    // ===== EVENTOS =====
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            chatWidget.classList.toggle('open');
            if (chatWidget.classList.contains('open')) {
                chatInput?.focus();
            }
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWidget.classList.remove('open');
        });
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // ===== BOTÕES RÁPIDOS =====
    document.getElementById('chatOptions')?.addEventListener('click', function(e) {
        const btn = e.target.closest('.chat-option');
        if (!btn) return;
        const question = btn.dataset.question;
        const texts = {
            'destinos': 'Quais são os melhores destinos?',
            'safaris': 'Quais safaris vocês oferecem?',
            'precos': 'Quanto custa?',
            'contato': 'Como entro em contacto?'
        };
        if (chatInput) {
            chatInput.value = texts[question] || question;
            sendMessage();
        }
    });

    console.log('✅ Chat.js - Chatbot carregado!');
});