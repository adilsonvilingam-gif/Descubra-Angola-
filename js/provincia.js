// =============================================
// PROVINCIA.JS - Página da Província
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ Provincia.js carregado!');

    // ==========================================
    // 1. IMAGENS DAS PROVÍNCIAS (CENTRALIZADO)
    // ==========================================
    // 🔥 ALTERE AQUI AS IMAGENS DE CADA PROVÍNCIA
    // Basta mudar o caminho da imagem para a que deseja
    const imagensProvincias = {
        'Cabinda': '../media/Floresta-do-Maiombe.png',
        'Zaire': '../media/mbanza-kongo.jpg',
        'Uíge': '../media/quedas-lucala.jpg',
        'Bengo': '../media/kissama.jpg',
        'Luanda': '../media/MiradouroDaLua.jpg',
        'Malanje': '../media/kalandula.jpg',
        'Kwanza Norte': '../media/ndalatando.jpg',
        'Kwanza Sul': '../media/sumbe.jpg',
        'Benguela': '../media/benguela.jpg',
        'Huambo': '../media/huambo.jpg',
        'Bié': '../media/cachoeira-kuito.jpg',
        'Huíla': '../media/serra-leba.webp',
        'Namibe': '../media/deserto-namibe.jpg',
        'Cunene': '../media/iona.jpg',
        'Moxico': '../media/lago-cameia.jpg',
        'Cuando Cubango': '../media/mavinga.jpg',
        'Lunda Sul': '../media/saurimo.jpg',
        'Lunda Norte': '../media/dundo.jpg'
    };

    // ==========================================
    // 2. OBTER NOME DA PROVÍNCIA DA URL
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const provinciaNome = urlParams.get('nome');

    if (!provinciaNome) {
        window.location.href = '../destinos.html';
        return;
    }

    console.log(`📍 Carregando província: ${provinciaNome}`);

    // ==========================================
    // 3. DADOS DOS DESTINOS
    // ==========================================
    const destinos = [
        // ===== NORTE =====
        { id: 1, nome: 'Floresta do Maiombe', regiao: 'norte', provincia: 'Cabinda', imagem: '../media/Floresta-do-Maiombe.png', descricao: 'Uma das maiores florestas tropicais de África com uma biodiversidade incrível.', rating: 4.5, reviews: 65, destaque: false, tag: '🌳 Floresta' },
        { id: 2, nome: 'Foz do Rio Zaire', regiao: 'norte', provincia: 'Zaire', imagem: '../media/foz-rio-zaire.jpg', descricao: 'Onde o poderoso Rio Zaire encontra o Oceano Atlântico, um espetáculo da natureza.', rating: 4.4, reviews: 42, destaque: false, tag: '🌊 Rio' },
        { id: 3, nome: 'Mbanza Kongo', regiao: 'norte', provincia: 'Zaire', imagem: '../media/mbanza-kongo.jpg', descricao: 'Antiga capital do Reino do Kongo, Património Mundial da UNESCO.', rating: 4.6, reviews: 58, destaque: true, tag: '🏛️ Património' },
        { id: 4, nome: 'Quedas do Lucala', regiao: 'norte', provincia: 'Uíge', imagem: '../media/quedas-lucala.jpg', descricao: 'Cascata impressionante no coração da província do Uíge, rodeada por natureza exuberante.', rating: 4.3, reviews: 35, destaque: false, tag: '💧 Cascata' },
        { id: 5, nome: 'Parque da Kissama', regiao: 'norte', provincia: 'Bengo', imagem: '../media/kissama.jpg', descricao: 'Vida selvagem no coração de Angola com elefantes, palancas e diversas espécies.', rating: 4.7, reviews: 78, destaque: true, tag: '🦁 Safari' },

        // ===== CENTRO =====
        { id: 6, nome: 'Miradouro da Lua', regiao: 'centro', provincia: 'Luanda', imagem: '../media/MiradouroDaLua.jpg', descricao: 'Formações rochosas impressionantes com um pôr do sol inesquecível.', rating: 4.7, reviews: 98, destaque: true, tag: '🌅 Pôr do Sol' },
        { id: 7, nome: 'Ilha do Mussulo', regiao: 'centro', provincia: 'Luanda', imagem: '../media/IlhaDoMussulo.jpg', descricao: 'Praias paradisíacas a poucos minutos de Luanda com areia branca e águas cristalinas.', rating: 4.6, reviews: 89, destaque: false, tag: '🏖️ Praia' },
        { id: 8, nome: 'Lagoa do Mussulo', regiao: 'centro', provincia: 'Luanda', imagem: '../media/lagoa-mussulo.jpg', descricao: 'Lagoa tranquila com águas calmas perfeita para passeios de barco e relaxamento.', rating: 4.3, reviews: 47, destaque: false, tag: '🌊 Lagoa' },
        { id: 9, nome: 'Museu Nacional de Antropologia', regiao: 'centro', provincia: 'Luanda', imagem: '../media/museu-antropologia.jpg', descricao: 'Museu que preserva a história e cultura dos povos de Angola.', rating: 4.2, reviews: 38, destaque: false, tag: '🏛️ Museu' },
        { id: 10, nome: 'Quedas do Kalandula', regiao: 'centro', provincia: 'Malanje', imagem: '../media/kalandula.jpg', descricao: 'Uma das maiores quedas de água de África com mais de 100 metros de altura.', rating: 4.9, reviews: 156, destaque: true, tag: '💧 Cascata' },
        { id: 11, nome: 'Palanca Negra', regiao: 'centro', provincia: 'Malanje', imagem: '../media/palanca-negra.png', descricao: 'O símbolo nacional de Angola, uma espécie rara e única que habita a região de Malanje.', rating: 4.9, reviews: 203, destaque: true, tag: '🦒 Fauna' },
        { id: 12, nome: 'Ndalatando', regiao: 'centro', provincia: 'Kwanza Norte', imagem: '../media/ndalatando.jpg', descricao: 'Cidade histórica com arquitetura colonial e belas paisagens.', rating: 4.0, reviews: 29, destaque: false, tag: '🏛️ Histórico' },
        { id: 13, nome: 'Sumbe', regiao: 'centro', provincia: 'Kwanza Sul', imagem: '../media/sumbe.jpg', descricao: 'Cidade costeira com belas praias e uma cultura vibrante.', rating: 4.2, reviews: 33, destaque: false, tag: '🏖️ Praia' },
        { id: 14, nome: 'Benguela', regiao: 'centro', provincia: 'Benguela', imagem: '../media/benguela.jpg', descricao: 'Cidade histórica com belas praias e uma arquitetura colonial encantadora.', rating: 4.4, reviews: 47, destaque: false, tag: '🏖️ Praia' },
        { id: 15, nome: 'Baía Farta', regiao: 'centro', provincia: 'Benguela', imagem: '../media/bahia-farta.jpg', descricao: 'Praia paradisíaca com areia branca e águas cristalinas.', rating: 4.5, reviews: 52, destaque: false, tag: '🏖️ Praia' },
        { id: 16, nome: 'Lobito', regiao: 'centro', provincia: 'Benguela', imagem: '../media/lobito.jpg', descricao: 'Cidade portuária com uma das baías mais bonitas de Angola e uma arquitetura única.', rating: 4.3, reviews: 39, destaque: false, tag: '🏙️ Cidade' },
        { id: 17, nome: 'Huambo', regiao: 'centro', provincia: 'Huambo', imagem: '../media/huambo.jpg', descricao: 'A cidade do Huambo, conhecida como a "Capital do Planalto Central".', rating: 4.3, reviews: 41, destaque: false, tag: '🏙️ Cidade' },
        { id: 18, nome: 'Cachoeira do Kuito', regiao: 'centro', provincia: 'Bié', imagem: '../media/cachoeira-kuito.jpg', descricao: 'Cascata escondida no coração do Bié, um segredo bem guardado de Angola.', rating: 4.1, reviews: 30, destaque: false, tag: '💧 Cascata' },

        // ===== SUL =====
        { id: 19, nome: 'Serra da Leba', regiao: 'sul', provincia: 'Huíla', imagem: '../media/serra-leba.webp', descricao: 'Vista espetacular a 1.800m de altitude com uma das estradas mais famosas de África.', rating: 4.8, reviews: 124, destaque: true, tag: '🌄 Montanha' },
        { id: 20, nome: 'Fenda da Tundavala', regiao: 'sul', provincia: 'Huíla', imagem: '../media/Tundavala.jpg', descricao: 'Uma das maiores falésias de África com uma vista panorâmica de tirar o fôlego.', rating: 4.8, reviews: 112, destaque: true, tag: '🏔️ Falésia' },
        { id: 21, nome: 'Serra da Chela', regiao: 'sul', provincia: 'Huíla', imagem: '../media/serra-chela.jpg', descricao: 'Montanhas imponentes com paisagens de tirar o fôlego e trilhas incríveis.', rating: 4.4, reviews: 56, destaque: false, tag: '⛰️ Montanha' },
        { id: 22, nome: 'Deserto do Namibe', regiao: 'sul', provincia: 'Namibe', imagem: '../media/deserto-namibe.jpg', descricao: 'O deserto mais antigo do mundo, com paisagens surreais e dunas impressionantes.', rating: 4.8, reviews: 92, destaque: true, tag: '🏜️ Deserto' },
        { id: 23, nome: 'Arco do Namibe', regiao: 'sul', provincia: 'Namibe', imagem: '../media/arco-namibe.jpg', descricao: 'Formação rochosa única no deserto, um dos cartões-postais de Angola.', rating: 4.5, reviews: 48, destaque: false, tag: '🪨 Formação' },
        { id: 24, nome: 'Parque Nacional do Iona', regiao: 'sul', provincia: 'Cunene', imagem: '../media/iona.jpg', descricao: 'O maior parque nacional de Angola, com uma fauna e flora deslumbrantes.', rating: 4.6, reviews: 55, destaque: true, tag: '🦁 Parque Nacional' },
        { id: 25, nome: 'Ruínas do Forte de Cuamato', regiao: 'sul', provincia: 'Cunene', imagem: '../media/forte-cuamato.jpg', descricao: 'Forte histórico no coração do Cunene, testemunho da presença portuguesa.', rating: 4.0, reviews: 28, destaque: false, tag: '🏛️ História' },

        // ===== LESTE =====
        { id: 26, nome: 'Lago Cameia', regiao: 'leste', provincia: 'Moxico', imagem: '../media/lago-cameia.jpg', descricao: 'Um dos maiores lagos de Angola, rodeado por uma natureza intocada.', rating: 4.2, reviews: 32, destaque: false, tag: '🌊 Lago' },
        { id: 27, nome: 'Parque Nacional da Cameia', regiao: 'leste', provincia: 'Moxico', imagem: '../media/parque-cameia.jpg', descricao: 'Paraíso para observação de aves e vida selvagem no leste de Angola.', rating: 4.4, reviews: 40, destaque: false, tag: '🦁 Parque Nacional' },
        { id: 28, nome: 'Mavinga', regiao: 'leste', provincia: 'Cuando Cubango', imagem: '../media/mavinga.jpg', descricao: 'Região de savanas e rios, perfeita para safaris e aventura.', rating: 4.3, reviews: 36, destaque: false, tag: '🌿 Savana' },
        { id: 29, nome: 'Saurimo', regiao: 'leste', provincia: 'Lunda Sul', imagem: '../media/saurimo.jpg', descricao: 'Capital da Lunda Sul, com paisagens e cultura únicas.', rating: 3.9, reviews: 25, destaque: false, tag: '🏙️ Cidade' },
        { id: 30, nome: 'Dundo', regiao: 'leste', provincia: 'Lunda Norte', imagem: '../media/dundo.jpg', descricao: 'Terra dos diamantes, com uma história fascinante e paisagens exuberantes.', rating: 4.0, reviews: 27, destaque: false, tag: '💎 Histórico' }
    ];

    // ==========================================
    // 4. FILTRAR DESTINOS DA PROVÍNCIA
    // ==========================================
    const destinosProvincia = destinos.filter(d => d.provincia === provinciaNome);

    // ==========================================
    // 5. ELEMENTOS
    // ==========================================
    const heroBg = document.getElementById('provinciaBg');
    const heroBadge = document.getElementById('provinciaBadge');
    const heroNome = document.getElementById('provinciaNome');
    const heroDescricao = document.getElementById('provinciaDescricao');
    const statDestinos = document.getElementById('statDestinos');
    const statRegiao = document.getElementById('statRegiao');
    const tituloDestinos = document.getElementById('provinciaTituloDestinos');
    const grid = document.getElementById('destinosGrid');
    const loading = document.getElementById('destinosLoading');
    const noResults = document.getElementById('destinosNoResults');
    const pageTitle = document.getElementById('pageTitle');

    // ==========================================
    // 6. FUNÇÃO PARA OBTER IMAGEM DA PROVÍNCIA
    // ==========================================
    function getImagemProvincia(provincia) {
        if (imagensProvincias[provincia]) {
            return imagensProvincias[provincia];
        }
        return '../media/placeholder.jpg';
    }

    // ==========================================
    // 7. RENDERIZAR PÁGINA
    // ==========================================
    function renderProvincia() {
        pageTitle.textContent = `${provinciaNome} | Descubra Angola`;
        
        heroBg.style.backgroundImage = `url('${getImagemProvincia(provinciaNome)}')`;
        heroBadge.textContent = 'Província';
        heroNome.textContent = provinciaNome;
        
        statDestinos.textContent = destinosProvincia.length;
        
        const regiaoMap = {
            'Cabinda': 'Norte', 'Zaire': 'Norte', 'Uíge': 'Norte', 'Bengo': 'Norte',
            'Luanda': 'Centro', 'Malanje': 'Centro', 'Kwanza Norte': 'Centro',
            'Kwanza Sul': 'Centro', 'Benguela': 'Centro', 'Huambo': 'Centro',
            'Bié': 'Centro',
            'Huíla': 'Sul', 'Namibe': 'Sul', 'Cunene': 'Sul',
            'Moxico': 'Leste', 'Cuando Cubango': 'Leste', 'Lunda Sul': 'Leste',
            'Lunda Norte': 'Leste'
        };
        const regiao = regiaoMap[provinciaNome] || '-';
        statRegiao.textContent = regiao;
        
        const descricoes = {
            'Luanda': 'A capital de Angola, uma cidade vibrante à beira-mar com uma rica história e cultura.',
            'Huíla': 'Terra de montanhas imponentes, paisagens de tirar o fôlego e a famosa Serra da Leba.',
            'Malanje': 'Berço da cultura angolana, com as majestosas Quedas do Kalandula e a Palanca Negra.',
            'Benguela': 'Cidade histórica com belas praias e uma arquitetura colonial encantadora.',
            'Bengo': 'Casa do Parque Nacional da Kissama, onde a vida selvagem reina no coração de Angola.',
            'Cabinda': 'Enclave angolano com uma das maiores florestas tropicais de África.',
            'Zaire': 'Terra do antigo Reino do Kongo, com o poderoso Rio Zaire e a histórica Mbanza Kongo.',
            'Uíge': 'Província verdejante com quedas de água impressionantes e natureza exuberante.',
            'Namibe': 'O deserto mais antigo do mundo, com paisagens surreais e dunas impressionantes.',
            'Cunene': 'O maior parque nacional de Angola, com uma fauna e flora deslumbrantes.',
            'Moxico': 'Terra de lagos e parques nacionais, um paraíso para os amantes da natureza.',
            'Cuando Cubango': 'Savanas e rios, perfeita para safaris e aventura no leste de Angola.',
            'Lunda Sul': 'Capital da Lunda Sul, com paisagens e cultura únicas.',
            'Lunda Norte': 'Terra dos diamantes, com uma história fascinante e paisagens exuberantes.',
            'Bié': 'Cascatas escondidas e uma rica história no coração do Planalto Central.',
            'Huambo': 'A "Capital do Planalto Central", com uma arquitetura única e cultura vibrante.',
            'Kwanza Norte': 'Cidade histórica com arquitetura colonial e belas paisagens.',
            'Kwanza Sul': 'Cidade costeira com belas praias e uma cultura vibrante.'
        };
        heroDescricao.textContent = descricoes[provinciaNome] || `Descubra os melhores destinos da província de ${provinciaNome}.`;
        
        tituloDestinos.textContent = provinciaNome;
    }

    // ==========================================
    // 8. RENDERIZAR DESTINOS
    // ==========================================
    function renderDestinos() {
        loading.style.display = 'none';
        
        if (destinosProvincia.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        grid.innerHTML = destinosProvincia.map(d => `
            <div class="provincia-destino-card">
                <div class="destino-image">
                    <img src="${d.imagem}" alt="${d.nome}" onerror="this.src='../media/placeholder.jpg'">
                    <span class="destino-tag">${d.tag}</span>
                </div>
                <div class="destino-content">
                    <h3>${d.nome}</h3>
                    <div class="destino-local">
                        <i class="fas fa-map-marker-alt"></i>
                        ${d.provincia}
                    </div>
                    <p>${d.descricao}</p>
                    <div class="destino-meta">
                        <div class="destino-rating">
                            <i class="fas fa-star"></i>
                            ${d.rating}
                            <span>(${d.reviews} avaliações)</span>
                        </div>
                        <a href="../destino-detalhe.html?id=${d.id}" class="destino-btn">
                            Ver mais <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ==========================================
    // 9. INICIALIZAR
    // ==========================================
    renderProvincia();
    renderDestinos();

    console.log(`✅ Página da província ${provinciaNome} carregada com ${destinosProvincia.length} destinos!`);
});