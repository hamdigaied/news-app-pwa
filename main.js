document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-container');

    fetch('articles.json')
        .then(response => response.json())
        .then(articles => {
            // Display each news article in the container
            articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                newsItem.innerHTML = `
                        <h2>${article.title}</h2>
                        <img src="${article.urlToImage}" alt="Article Image">
                        <p>${article.description}</p>
                        <div class="news-details">
                            <span>Published at: ${new Date(article.publishedAt).toLocaleString()}</span>
                            <span>Author: ${article.author || 'Unknown'}</span>
                            <a href="${article.url}" target="_blank">Read more</a>
                        </div>
                    `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => newsContainer.innerHTML = '<h3>No articles</h3>');
});