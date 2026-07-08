// =============================================
// DESTINOS.JS - Página de Destinos (Províncias)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ Destinos.js carregado!');

    // ==========================================
    // 1. IMAGENS DAS PROVÍNCIAS
    // ==========================================
    const imagensProvincias = {
        'Cabinda': '../media/cabinda.jpg',
        'Zaire': '../media/zaire2.jpg',
        'Uíge': '../media/uige.jpg',
        'Bengo': '../media/bengo.jpg',
        'Luanda': '../media/luanda.jpg',
        'Malanje': '../media/kalandula.jpg',
        'Kwanza Norte': '../media/knorte.jpg',
        'Kwanza Sul': '../media/ksul.jpg',
        'Benguela': '../media/benguela.jpg',
        'Huambo': '../media/huambo.jpg',
        'Bié': '../media/bie.jpg',
        'Huíla': '../media/huila.jpg',
        'Namibe': '../media/namibe.jpg',
        'Cunene': '../media/cunene.jpg',
        'Moxico': '../media/moxico.jpg',
        'Cuando Cubango': '../media/cuandocubango.jpg',
        'Lunda Sul': '../media/lsul.jpg',
        'Lunda Norte': '../media/lnorte.jpg'
    };

    // ==========================================
    // 2. MAPEAMENTO DE SLUGS PERSONALIZADOS
    // ==========================================
    const slugsPersonalizados = {
        'Serra da Leba': 'serra-leba',
        'Museu Nacional de Antropologia': 'museu-nacional-de-antropologia',
        'Museu da Moeda': 'museu-da-moeda',
        'Museu das Forças Armadas': 'museu-das-forcas-armadas',
        'Parque da Kissama': 'parque-da-kissama',
        'Quedas do Kalandula': 'quedas-do-kalandula',
        'Fenda da Tundavala': 'fenda-da-tundavala',
        'Miradouro da Lua': 'miradouro-da-lua',
        'Ilha do Mussulo': 'ilha-do-mussulo',
        'Palanca Negra': 'palanca-negra',
        'Deserto do Namibe': 'deserto-do-namibe',
        'Arco do Namibe': 'arco-do-namibe',
        'Parque Nacional do Iona': 'parque-nacional-do-iona',
        'Parque Nacional da Cameia': 'parque-nacional-da-cameia',
        'Floresta do Maiombe': 'floresta-do-maiombe',
        'Mbanza Kongo': 'mbanza-kongo',
        'Foz do Rio Zaire': 'foz-do-rio-zaire',
        'Rio Lucala': 'rio-lucala',
        'Parque Nacional da Mavinga': 'parque-nacional-da-mavinga',
        'Quedas do Cuemba': 'quedas-do-cuemba',
        'Cascata do Kawambundo': 'cascata-do-kawambundo'
    };

    // ==========================================
    // 3. DADOS DOS DESTINOS (SEM EMOJIS)
    // ==========================================
    const destinos = [
        // ===== NORTE =====
        { id: 1, nome: 'Floresta do Maiombe', regiao: 'norte', provincia: 'Cabinda', imagem: '../media/Floresta-do-Maiombe.png', descricao: 'Uma das maiores florestas tropicais de África com uma biodiversidade incrível.', rating: 4.5, reviews: 65, destaque: false, tag: 'Floresta' },
        { id: 2, nome: 'Foz do Rio Zaire', regiao: 'norte', provincia: 'Zaire', imagem: '../media/fozrio.jpg', descricao: 'Onde o poderoso Rio Zaire encontra o Oceano Atlântico, um espetáculo da natureza.', rating: 4.4, reviews: 42, destaque: false, tag: 'Rio' },
        { id: 3, nome: 'Mbanza Kongo', regiao: 'norte', provincia: 'Zaire', imagem: '../media/mbanza-kongo.jpg', descricao: 'Antiga capital do Reino do Kongo, Património Mundial da UNESCO.', rating: 4.6, reviews: 58, destaque: true, tag: 'Património' },
        { id: 4, nome: 'Rio Lucala', regiao: 'norte', provincia: 'Uíge', imagem: '../media/rio-lucala.jpg', descricao: 'Rio de águas cristalinas que atravessa a província do Uíge, com belas paisagens e cachoeiras.', rating: 4.3, reviews: 35, destaque: false, tag: 'Rio' },
        { id: 5, nome: 'Parque da Kissama', regiao: 'norte', provincia: 'Bengo', imagem: '../media/kissama.png', descricao: 'Vida selvagem no coração de Angola com elefantes, palancas e diversas espécies.', rating: 4.7, reviews: 78, destaque: true, tag: 'Safari' },

        // ===== CENTRO =====
        { id: 6, nome: 'Miradouro da Lua', regiao: 'centro', provincia: 'Luanda', imagem: '../media/MiradouroDaLua.jpg', descricao: 'Formações rochosas impressionantes com um pôr do sol inesquecível.', rating: 4.7, reviews: 98, destaque: true, tag: 'Pôr do Sol' },
        { id: 7, nome: 'Ilha do Mussulo', regiao: 'centro', provincia: 'Luanda', imagem: '../media/IlhaDoMussulo.jpg', descricao: 'Praias paradisíacas a poucos minutos de Luanda com areia branca e águas cristalinas.', rating: 4.6, reviews: 89, destaque: false, tag: 'Praia' },
        { id: 8, nome: 'Museu Nacional de Antropologia', regiao: 'centro', provincia: 'Luanda', imagem: '../media/museuantropologia.jpg', descricao: 'Museu que preserva a história e cultura dos povos de Angola, com um acervo impressionante.', rating: 4.2, reviews: 38, destaque: false, tag: 'Museu' },
        { id: 9, nome: 'Museu da Moeda', regiao: 'centro', provincia: 'Luanda', imagem: '../media/museumoeda.jpg', descricao: 'Museu que conta a história da moeda em Angola, desde os tempos coloniais até aos dias de hoje.', rating: 4.0, reviews: 25, destaque: false, tag: 'Museu' },
        { id: 10, nome: 'Museu das Forças Armadas', regiao: 'centro', provincia: 'Luanda', imagem: '../media/museumilitar.jpg', descricao: 'Museu que preserva a história militar de Angola, com equipamentos, veículos e documentos históricos.', rating: 4.2, reviews: 32, destaque: false, tag: 'Museu Militar' },
        { id: 11, nome: 'Quedas do Kalandula', regiao: 'centro', provincia: 'Malanje', imagem: '../media/kalandula.jpg', descricao: 'Uma das maiores quedas de água de África com mais de 100 metros de altura.', rating: 4.9, reviews: 156, destaque: true, tag: 'Cascata' },
        { id: 12, nome: 'Palanca Negra', regiao: 'centro', provincia: 'Malanje', imagem: '../media/palanca-negra.png', descricao: 'O símbolo nacional de Angola, uma espécie rara e única que habita a região de Malanje.', rating: 4.9, reviews: 203, destaque: true, tag: 'Fauna' },
        { id: 13, nome: 'Ndalatando', regiao: 'centro', provincia: 'Kwanza Norte', imagem: '../media/ndalatando.jpg', descricao: 'Cidade histórica com arquitetura colonial e belas paisagens.', rating: 4.0, reviews: 29, destaque: false, tag: 'Histórico' },
        { id: 14, nome: 'Cascata do Kawambundo', regiao: 'centro', provincia: 'Kwanza Sul', imagem: '../media/cascata-kawambundo.jpg', descricao: 'Cascata impressionante no Kwanza Sul, rodeada por uma natureza exuberante e águas cristalinas.', rating: 4.3, reviews: 28, destaque: false, tag: 'Cascata' },
        { id: 15, nome: 'Benguela', regiao: 'centro', provincia: 'Benguela', imagem: '../media/benguela.jpg', descricao: 'Cidade histórica com belas praias e uma arquitetura colonial encantadora.', rating: 4.4, reviews: 47, destaque: false, tag: 'Praia' },
        { id: 16, nome: 'Baía Farta', regiao: 'centro', provincia: 'Benguela', imagem: '../media/bahia-farta.jpg', descricao: 'Praia paradisíaca com areia branca e águas cristalinas.', rating: 4.5, reviews: 52, destaque: false, tag: 'Praia' },
        { id: 17, nome: 'Lobito', regiao: 'centro', provincia: 'Benguela', imagem: '../media/lobito.jpg', descricao: 'Cidade portuária com uma das baías mais bonitas de Angola e uma arquitetura única.', rating: 4.3, reviews: 39, destaque: false, tag: 'Cidade' },
        { id: 18, nome: 'Huambo', regiao: 'centro', provincia: 'Huambo', imagem: '../media/huambo1.jpg', descricao: 'A cidade do Huambo, conhecida como a "Capital do Planalto Central".', rating: 4.3, reviews: 41, destaque: false, tag: 'Cidade' },
        { id: 19, nome: 'Quedas do Cuemba', regiao: 'centro', provincia: 'Bié', imagem: '../media/quedas-cuemba.jpg', descricao: 'Quedas de água impressionantes no coração do Bié, um dos segredos mais bem guardados de Angola.', rating: 4.2, reviews: 30, destaque: false, tag: 'Cascata' },

        // ===== SUL =====
        { id: 20, nome: 'Serra da Leba', regiao: 'sul', provincia: 'Huíla', imagem: '../media/serra-leba.webp', descricao: 'Vista espetacular a 1.800m de altitude com uma das estradas mais famosas de África.', rating: 4.8, reviews: 124, destaque: true, tag: 'Montanha' },
        { id: 21, nome: 'Fenda da Tundavala', regiao: 'sul', provincia: 'Huíla', imagem: '../media/Tundavala.jpg', descricao: 'Uma das maiores falésias de África com uma vista panorâmica de tirar o fôlego.', rating: 4.8, reviews: 112, destaque: true, tag: 'Falésia' },
        { id: 22, nome: 'Deserto do Namibe', regiao: 'sul', provincia: 'Namibe', imagem: '../media/deserto.jpg', descricao: 'O deserto mais antigo do mundo, com paisagens surreais e dunas impressionantes.', rating: 4.8, reviews: 92, destaque: true, tag: 'Deserto' },
        { id: 23, nome: 'Arco do Namibe', regiao: 'sul', provincia: 'Namibe', imagem: '../media/arcodesertojpg.jpg', descricao: 'Formação rochosa única no deserto, um dos cartões-postais de Angola.', rating: 4.5, reviews: 48, destaque: false, tag: 'Formação' },
        { id: 24, nome: 'Parque Nacional do Iona', regiao: 'sul', provincia: 'Cunene', imagem: '../media/iona.jpg', descricao: 'O maior parque nacional de Angola, com uma fauna e flora deslumbrantes.', rating: 4.6, reviews: 55, destaque: true, tag: 'Parque Nacional' },
        { id: 25, nome: 'Ruínas do Forte de Cuamato', regiao: 'sul', provincia: 'Cunene', imagem: '../media/forte-cuamato.jpg', descricao: 'Forte histórico no coração do Cunene, testemunho da presença portuguesa.', rating: 4.0, reviews: 28, destaque: false, tag: 'História' },

        // ===== LESTE =====
        { id: 26, nome: 'Parque Nacional da Cameia', regiao: 'leste', provincia: 'Moxico', imagem: '../media/cameia.jpg', descricao: 'Paraíso para observação de aves e vida selvagem no leste de Angola.', rating: 4.4, reviews: 40, destaque: false, tag: 'Parque Nacional' },
        { id: 27, nome: 'Parque Nacional da Mavinga', regiao: 'leste', provincia: 'Cuando Cubango', imagem: '../media/mavinga.jpg', descricao: 'Parque nacional com savanas e rios, perfeito para safaris e aventura.', rating: 4.3, reviews: 36, destaque: false, tag: 'Parque Nacional' },
        { id: 28, nome: 'Saurimo', regiao: 'leste', provincia: 'Lunda Sul', imagem: '../media/saurimo.jpg', descricao: 'Capital da Lunda Sul, com paisagens e cultura únicas.', rating: 3.9, reviews: 25, destaque: false, tag: 'Cidade' },
        { id: 29, nome: 'Dundo', regiao: 'leste', provincia: 'Lunda Norte', imagem: '../media/dundo.jpg', descricao: 'Terra dos diamantes, com uma história fascinante e paisagens exuberantes.', rating: 4.0, reviews: 27, destaque: false, tag: 'Histórico' }
    ];

    // ==========================================
    // 4. FUNÇÃO PARA GERAR SLUG
    // ==========================================
    function gerarSlug(nome) {
        if (slugsPersonalizados[nome]) {
            return slugsPersonalizados[nome];
        }
        return nome
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ /g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    // ==========================================
    // 5. AGRUPAR POR PROVÍNCIA
    // ==========================================
    function agruparPorProvincia(destinosList) {
        const provincias = {};
        destinosList.forEach(d => {
            if (!provincias[d.provincia]) {
                provincias[d.provincia] = {
                    nome: d.provincia,
                    regiao: d.regiao,
                    destinos: []
                };
            }
            provincias[d.provincia].destinos.push(d);
        });
        return Object.values(provincias);
    }

    // ==========================================
    // 6. ELEMENTOS
    // ==========================================
    const grid = document.getElementById('provinciasGrid');
    const loading = document.getElementById('destinosLoading');
    const noResults = document.getElementById('destinosNoResults');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const resultadosCount = document.getElementById('resultadosCount');

    let currentFilter = 'todos';
    let currentSearch = '';

    // ==========================================
    // 7. FUNÇÕES AUXILIARES
    // ==========================================
    function getImagemProvincia(provincia) {
        return imagensProvincias[provincia] || '../media/placeholder.jpg';
    }

    // ==========================================
    // 8. RENDERIZAR PROVÍNCIAS
    // ==========================================
    function renderProvincias(provinciasList) {
        loading.style.display = 'none';
        
        if (provinciasList.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            resultadosCount.innerHTML = '0 províncias encontradas';
            return;
        }
        
        noResults.style.display = 'none';
        resultadosCount.innerHTML = `<strong>${provinciasList.length}</strong> províncias`;
        
        grid.innerHTML = provinciasList.map(p => `
            <div class="provincia-card" data-provincia="${p.nome}" data-regiao="${p.regiao}">
                <div class="provincia-card-image">
                    <img src="${getImagemProvincia(p.nome)}" alt="${p.nome}" onerror="this.src='../media/placeholder.jpg'">
                    <span class="provincia-regiao-tag">${p.regiao.toUpperCase()}</span>
                    <div class="provincia-overlay">
                        <h3>${p.nome}</h3>
                        <span class="provincia-contagem">${p.destinos.length} destinos</span>
                    </div>
                </div>
                <div class="provincia-card-content">
                    <a href="#" class="provincia-link" data-provincia="${p.nome}">
                        Explorar mais <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.provincia-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const provinciaNome = this.dataset.provincia;
                const provinciaData = provinciasList.find(p => p.nome === provinciaNome);
                if (provinciaData) {
                    abrirModal(provinciaData);
                }
            });
        });

        document.querySelectorAll('.provincia-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.provincia-link')) return;
                const provinciaNome = this.dataset.provincia;
                const provinciaData = provinciasList.find(p => p.nome === provinciaNome);
                if (provinciaData) {
                    abrirModal(provinciaData);
                }
            });
        });
    }

    // ==========================================
    // 9. MODAL COM LINKS PARA PÁGINAS INDIVIDUAIS
    // ==========================================
    function abrirModal(provinciaData) {
        const modalHTML = `
            <div class="modal-overlay" id="modalProvincia">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2>${provinciaData.nome}</h2>
                        <button class="modal-close" id="modalClose">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-destinos-grid">
                            ${provinciaData.destinos.map(d => `
                                <div class="modal-destino-item">
                                    <img src="${d.imagem}" alt="${d.nome}" onerror="this.src='../media/placeholder.jpg'">
                                    <div class="modal-destino-info">
                                        <h4>${d.nome}</h4>
                                        <p>${d.descricao}</p>
                                        <a href="${gerarSlug(d.nome)}.html" class="modal-destino-link">
                                            <i class="fas fa-arrow-right"></i> Ver mais
                                        </a>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const existingModal = document.getElementById('modalProvincia');
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('modalProvincia');
        const closeBtn = document.getElementById('modalClose');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        closeBtn.addEventListener('click', fecharModal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) fecharModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') fecharModal();
        });

        function fecharModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // ==========================================
    // 10. FILTRAR
    // ==========================================
    function filterProvincias() {
        let allProvincias = agruparPorProvincia(destinos);
        
        if (currentFilter !== 'todos') {
            if (currentFilter === 'destaque') {
                allProvincias = allProvincias.map(p => ({
                    ...p,
                    destinos: p.destinos.filter(d => d.destaque === true)
                })).filter(p => p.destinos.length > 0);
            } else {
                allProvincias = allProvincias.filter(p => p.regiao === currentFilter);
            }
        }
        
        if (currentSearch.trim() !== '') {
            const search = currentSearch.toLowerCase().trim();
            allProvincias = allProvincias.map(p => ({
                ...p,
                destinos: p.destinos.filter(d => 
                    d.nome.toLowerCase().includes(search) ||
                    d.provincia.toLowerCase().includes(search) ||
                    d.descricao.toLowerCase().includes(search)
                )
            })).filter(p => p.destinos.length > 0);
        }
        
        renderProvincias(allProvincias);
    }

    // ==========================================
    // 11. EVENTOS
    // ==========================================
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterProvincias();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value;
            filterProvincias();
        });
    }

    // ==========================================
    // 12. INICIALIZAR
    // ==========================================
    filterProvincias();

    const urlParams = new URLSearchParams(window.location.search);
    const regiaoParam = urlParams.get('regiao');
    const destaqueParam = urlParams.get('destaque');
    
    if (regiaoParam) {
        const btn = document.querySelector(`.filtro-btn[data-filter="${regiaoParam}"]`);
        if (btn) btn.click();
    } else if (destaqueParam) {
        const btn = document.querySelector('.filtro-btn[data-filter="destaque"]');
        if (btn) btn.click();
    }

    console.log(`✅ Destinos.js - ${destinos.length} destinos em 18 províncias carregados!`);
});