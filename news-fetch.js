document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a9f5872c0f94f218588f552fbe21b47';  // Replace with your actual API key
    const newsList = document.getElementById('news-list');
    const pageSize = 10;  // Number of articles to fetch per request
    const defaultImage = 'https://via.placeholder.com/150'; // Fallback image URL

    let page = 1; // Track the current page

    function fetchNews() {
        fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    if (data.articles.length === 0) {
                        document.getElementById('load-more').style.display = 'none'; // Hide button if no more articles
                        return;
                    }

                    data.articles.forEach(article => {
                        const newsItem = document.createElement('div');
                        newsItem.classList.add('news-item');

                        // Use a default image if urlToImage is not available
                        const imageUrl = article.urlToImage ? article.urlToImage : 'fallback.png';
                        const description = article.description ? article.description : '';

                        newsItem.innerHTML = `
                            <img src="${imageUrl}" alt="News Headline Image" onerror="this.src='${defaultImage}'">
                            <div class="news-content">
                                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                                <p>${description}</p>
                            </div>
                        `;

                        newsList.appendChild(newsItem);
                    });

                    page++; // Increment page number for next request
                } else {
                    newsList.innerHTML = '<p>No news available at the moment.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsList.innerHTML = '<p>Failed to load news. Please try again later.</p>';
            });
    }

    fetchNews();  // Fetch the latest news on page load

    // Load more news on button click
    document.getElementById('load-more').addEventListener('click', function() {
        fetchNews();
    });
});
