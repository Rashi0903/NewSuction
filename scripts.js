document.addEventListener('DOMContentLoaded', function() {
    const newspapers = [
        { name: 'The Hindu', url: 'https://www.thehindu.com/' },
        { name: 'The Times Of India', url: 'https://timesofindia.indiatimes.com/' },
        { name: 'Hindustan Times', url: 'https://www.hindustantimes.com/' },
        { name: 'AmarUjala', url: 'https://www.amarujala.com/' },
        { name: 'DainikJagran', url: 'https://www.jagran.com/' },
        { name: 'Mid-Day', url: 'https://www.mid-day.com/' }
    ];

    const newspapersList = document.getElementById('newspapers-list');

    newspapers.forEach(newspaper => {
        const serviceItem = document.createElement('div');
        serviceItem.classList.add('service');
        serviceItem.innerHTML = `
            <a href="${newspaper.url}" target="_blank">
                <i class="fas fa-newspaper"></i>
                <h3>${newspaper.name}</h3>
            </a>
        `;
        newspapersList.appendChild(serviceItem);
    });
});
