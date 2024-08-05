document.addEventListener("DOMContentLoaded", function() {
    fetch('/national-news')
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.querySelector('#national-news-container');
            data.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                newsItem.innerHTML = `<a href="${news.link}" target="_blank">${news.title}</a>`;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});
