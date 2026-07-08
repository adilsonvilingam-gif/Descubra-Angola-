// =============================================
// MAPA.JS - Mapa Interativo com Google Maps
// =============================================

// Coordenadas dos destinos
const coordenadasDestinos = {
    'floresta-maiombe': { lat: -5.55, lng: 12.2, nome: 'Floresta do Maiombe', local: 'Cabinda, Angola', descricao: 'Uma das maiores florestas tropicais de África' },
    'serra-leba': { lat: -15.0, lng: 13.3, nome: 'Serra da Leba', local: 'Huíla, Angola', descricao: 'Vista espetacular a 1.800m de altitude' },
    'miradouro-lua': { lat: -8.9, lng: 13.2, nome: 'Miradouro da Lua', local: 'Luanda, Angola', descricao: 'Pôr do sol inesquecível' },
    'kalandula': { lat: -9.0, lng: 15.8, nome: 'Quedas do Kalandula', local: 'Malanje, Angola', descricao: 'Uma das maiores quedas de África' },
    'mussulo': { lat: -8.9, lng: 13.1, nome: 'Ilha do Mussulo', local: 'Luanda, Angola', descricao: 'Praias paradisíacas perto de Luanda' },
    'tundavala': { lat: -14.8, lng: 13.5, nome: 'Fenda da Tundavala', local: 'Huíla, Angola', descricao: 'Uma das maiores falésias de África' },
    'kissama': { lat: -9.1, lng: 13.5, nome: 'Parque da Kissama', local: 'Bengo, Angola', descricao: 'Vida selvagem no coração de Angola' },
    'palanca-negra': { lat: -9.2, lng: 16.0, nome: 'Palanca Negra', local: 'Malanje, Angola', descricao: 'O símbolo nacional de Angola' }
};

// Função principal para inicializar o mapa
function initMap() {
    // Detetar qual página estamos
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    // Determinar as coordenadas com base na página
    let coords = coordenadasDestinos['floresta-maiombe']; // padrão
    let destinoId = 'floresta-maiombe';

    if (page === 'serra-leba') destinoId = 'serra-leba';
    else if (page === 'miradouro-da-lua') destinoId = 'miradouro-lua';
    else if (page === 'quedas-do-kalandula') destinoId = 'kalandula';
    else if (page === 'ilha-do-mussulo') destinoId = 'mussulo';
    else if (page === 'fenda-da-tundavala') destinoId = 'tundavala';
    else if (page === 'parque-da-kissama') destinoId = 'kissama';
    else if (page === 'palanca-negra') destinoId = 'palanca-negra';
    else if (page === 'floresta-do-maiombe') destinoId = 'floresta-maiombe';

    coords = coordenadasDestinos[destinoId] || coordenadasDestinos['floresta-maiombe'];

    // Criar o mapa
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: coords.lat, lng: coords.lng },
        zoom: 10,
        mapTypeId: "roadmap",
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });

    // Adicionar marcador
    const marker = new google.maps.Marker({
        position: { lat: coords.lat, lng: coords.lng },
        map: map,
        title: coords.nome,
        animation: google.maps.Animation.DROP,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    // Janela de informação
    const infowindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 8px; font-family: Inter, sans-serif; max-width: 220px;">
                <h3 style="margin: 0 0 4px; font-size: 16px; color: #0F172A;">${coords.nome}</h3>
                <p style="margin: 0; font-size: 13px; color: #666;">${coords.local}</p>
                <p style="margin: 6px 0 0; font-size: 12px; color: #999;">${coords.descricao}</p>
            </div>
        `
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    // Abrir automaticamente a janela ao carregar
    setTimeout(() => {
        infowindow.open(map, marker);
    }, 800);

    console.log(`✅ Mapa de ${coords.nome} carregado!`);
}

// Fallback caso a API não carregue
window.mapaFallback = function() {
    const mapElement = document.getElementById("map");
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;border-radius:12px;color:#666;flex-direction:column;gap:10px;">
                <i class="fas fa-map-marked-alt" style="font-size:2rem;color:#FFB703;"></i>
                <p style="margin:0;">Mapa indisponível no momento</p>
                <p style="margin:0;font-size:0.85rem;color:#999;">Tente novamente mais tarde</p>
            </div>
        `;
    }
};

// Capturar erro de carregamento da API
window.onerror = function() {
    window.mapaFallback();
};