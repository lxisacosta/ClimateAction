document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'pub_497834b37b9d796c006dcffc0b06c406f13d5';
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=meio%20ambiente&language=pt`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            if (data.results && Array.isArray(data.results)) {
                data.results.forEach(article => {
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
                newsContainer.innerHTML = '<p>Não há notícias disponíveis.</p>';
            }
        })
        .catch(error => console.error('Error fetching news:', error));
});
