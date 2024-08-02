document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'pub_497834b37b9d796c006dcffc0b06c406f13d5';
    const baseUrl = 'https://newsdata.io/api/1/news?apikey=' + apiKey + '&q=meio%20ambiente&language=pt';

    const relevantKeywords = ['mudança climática', 'sustentabilidade', 'meio ambiente', 'aquecimento global', 'energia renovável', 'poluição', 'biodiversidade'];
    const newsContainer = document.getElementById('news-container');

    async function fetchNews(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    function filterArticles(articles) {
        return articles.filter(article => 
            relevantKeywords.some(keyword => 
                article.title.toLowerCase().includes(keyword) || 
                (article.description && article.description.toLowerCase().includes(keyword))
            )
        );
    }

    function displayArticles(articles) {
        articles.forEach(article => {
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
    }

    let articles = [];
    let page = 1;
    const pageSize = 10;
    const maxAttempts = 5;  

    try {
        while (articles.length < 10 && page <= maxAttempts) {
            const apiUrl = `${baseUrl}&page=${page}`;
            const data = await fetchNews(apiUrl);

            if (data.results && Array.isArray(data.results)) {
                const filteredArticles = filterArticles(data.results);
                articles = articles.concat(filteredArticles);
            }

            if (data.results.length < pageSize) {
                break;
            }

            page++;
        }

        if (articles.length > 0) {
            displayArticles(articles.slice(0, 10));
        } else {
            newsContainer.innerHTML = '<p>Não há notícias relevantes disponíveis.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Erro ao buscar notícias.</p>';
    }
});


