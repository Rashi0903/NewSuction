document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a9f5872c0f94f218588f552fbe21b47';  // Replace with your actual API key
    const newsList = document.getElementById('news-list');
    const loadMoreButton = document.getElementById('load-more');
    let currentPage = 1;
    const pageSize = 10; // Number of articles per page

    function fetchNews(page) {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    data.articles.forEach(article => {
                        const newsItem = document.createElement('div');
                        newsItem.classList.add('news-item');

                        // Use a default image if urlToImage is not available
                        const imageUrl = article.urlToImage ? article.urlToImage : 'fallback.png';
                        const description = article.description ? article.description : '';

                        newsItem.innerHTML = `
                            <img src="${imageUrl}" alt="News Headline Image">
                            <div class="news-content">
                                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                                <p>${description}</p>
                            </div>
                        `;

                        newsList.appendChild(newsItem);
                    });

                    // Check if there are more articles to load
                    if (data.articles.length < pageSize) {
                        loadMoreButton.style.display = 'none'; // Hide button if no more articles
                    }
                } else {
                    newsList.innerHTML = '<p>No news available at the moment.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsList.innerHTML = '<p>Failed to load news. Please try again later.</p>';
            });
    }

    // Initial fetch
    fetchNews(currentPage);

    // Load More button click handler
    loadMoreButton.addEventListener('click', function() {
        currentPage++;
        fetchNews(currentPage);
    });
});
