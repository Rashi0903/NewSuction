document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a9f5872c0f94f218588f552fbe21b47';  // Replace with your actual API key
    const newsList = document.getElementById('news-list');
    const pageSize = 10;  // Number of articles per page
    let currentPage = 1;

    function fetchNews() {
        fetch(`https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`)
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

                        // Use a fallback image if urlToImage is not available
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
                    
                    // Increment the page number for the next "Load More" request
                    currentPage++;
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
    fetchNews();

    // Load More button
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.classList.add('load-more');
    loadMoreButton.addEventListener('click', fetchNews);

    document.querySelector('#news').appendChild(loadMoreButton);
});
