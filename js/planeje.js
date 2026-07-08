// =============================================
// PLANEJE.JS - Página Planeje sua Viagem
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ planeje.js carregado!');

    const form = document.getElementById('planejeForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar datas
            const dataInicio = document.getElementById('data_inicio').value;
            const dataFim = document.getElementById('data_fim').value;

            if (dataInicio && dataFim && dataFim < dataInicio) {
                alert('A data de fim não pode ser anterior à data de início.');
                return;
            }

            // Coletar dados
            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                destino: document.getElementById('destino').value,
                data_inicio: dataInicio,
                data_fim: dataFim,
                pessoas: document.getElementById('pessoas').value,
                orçamento: document.getElementById('orçamento').value,
                interesses: [],
                mensagem: document.getElementById('mensagem').value
            };

            // Coletar interesses
            document.querySelectorAll('input[name="interesses"]:checked').forEach(function(checkbox) {
                formData.interesses.push(checkbox.value);
            });

            console.log('📝 Dados do formulário:', formData);

            // Notificação de sucesso
            if (window.showPushNotification) {
                window.showPushNotification(
                    '✅ Pedido enviado!',
                    'Obrigado! Entraremos em contacto em breve.',
                    'success'
                );
            } else {
                alert('✅ Pedido enviado com sucesso! Entraremos em contacto em breve.');
            }

            // Reset do formulário
            form.reset();
        });
    }

});