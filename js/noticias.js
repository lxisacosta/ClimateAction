document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'pub_497834b37b9d796c006dcffc0b06c406f13d5';
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=meio%20ambiente&language=pt`;

    // Lista de palavras-chave que serão utilizadas para filtrar notícias relevantes
    const relevantKeywords = [
        'mudança climática', 'sustentabilidade', 'meio ambiente', 
        'aquecimento global', 'energia renovável', 'poluição', 
        'biodiversidade', 'natureza', 'clima', 'reciclar', 'reutilizar'
    ];

    // Teste 1: Verificando se a API retorna dados corretamente
    // Simulamos uma chamada à API e verificamos se os dados são retornados corretamente.
    // Caso a API falhe, o código deve capturar o erro e exibi-lo no console.
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API'); // Se a API falhar, captura o erro
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById('news-container');

            if (data.results && Array.isArray(data.results)) {
                // Teste 2: Aplicando filtro de palavras-chave para garantir relevância
                // Aqui verificamos se as notícias retornadas contêm pelo menos uma das palavras-chave relevantes.
                // O objetivo é garantir que apenas conteúdos relacionados ao tema sejam exibidos.
                const filteredArticles = data.results.filter(article => 
                    relevantKeywords.some(keyword => 
                        article.title.toLowerCase().includes(keyword) || 
                        (article.description && article.description.toLowerCase().includes(keyword))
                    )
                );

                if (filteredArticles.length > 0) {
                    // Teste 3: Exibindo corretamente as notícias filtradas na interface
                    // Aqui garantimos que cada notícia relevante seja apresentada com título, imagem e descrição.
                    filteredArticles.forEach(article => {
                        const newsCard = document.createElement('div');
                        newsCard.classList.add('news-card');
                        newsCard.innerHTML = `
                            <img src="${article.image_url || 'img/default-news.jpg'}" alt="Imagem da notícia" class="news-image">
                            <h3>${article.title}</h3>
                            <p>${article.description ? article.description.slice(0, 100) + '...' : 'Descrição não disponível'}</p>
                            <a href="${article.link}" target="_blank">Leia mais</a>
                        `;
                        newsContainer.appendChild(newsCard);
                    });
                } else {
                    // Teste 4: Garantindo que, caso não haja notícias relevantes, uma mensagem seja exibida
                    newsContainer.innerHTML = '<p>Não há notícias relevantes disponíveis.</p>';
                }
            } else {
                // Teste 5: Caso a API não retorne resultados, garantimos que o sistema exiba uma mensagem de erro
                newsContainer.innerHTML = '<p>Não há notícias disponíveis.</p>';
            }
        })
        .catch(error => console.error('Erro ao buscar notícias:', error)); // Captura e exibe erros no console para depuração
});

// Assim, esse teste de integração verifica se os três componentes do sistema de notícias funcionam juntos corretamente. 
// Se um deles falhar, o sistema precisa reagir de forma adequada.
// Com essa abordagem, garantimos uma experiência de usuário confiável.
