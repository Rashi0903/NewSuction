document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a9f5872c0f94f218588f552fbe21b47';  // Replace with your actual API key
    const newsList = document.getElementById('news-list');
    const loadMoreButton = document.getElementById('load-more');
    
    let currentPage = 1;
    const pageSize = 10;  // Number of articles to fetch per page
    const totalArticles = 100;  // Total number of articles to fetch
    let isLoading = false;

    function fetchNews(page) {
        if (isLoading) return;  // Prevent multiple fetches
        isLoading = true;

        fetch(`https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
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

                        newsItem.innerHTML = `
                            <img src="${article.urlToImage || 'fallback.png'}" alt="News Headline Image">
                            <div class="news-content">
                                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                                <p>${article.description || ''}</p>
                            </div>
                        `;

                        newsList.appendChild(newsItem);
                    });

                    // Check if more pages are available
                    if (page * pageSize >= totalArticles) {
                        loadMoreButton.style.display = 'none';  // Hide the button if no more articles
                    } else {
                        loadMoreButton.style.display = 'block';  // Show the button if more articles are available
                    }
                } else {
                    newsList.innerHTML = '<p>No news available at the moment.</p>';
                }
                isLoading = false;
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsList.innerHTML = '<p>Failed to load news. Please try again later.</p>';
                isLoading = false;
            });
    }

    // Load initial news
    fetchNews(currentPage);

    // Load more news when button is clicked
    loadMoreButton.addEventListener('click', function() {
        currentPage++;
        fetchNews(currentPage);
    });
});
