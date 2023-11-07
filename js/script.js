const globalObj = {
    currentPage: window.location.pathname,
};

//highlight active link
const hlActiveLink = () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === globalObj.currentPage) {
            link.classList.add('active');
        }
    });
};

const init = () => {
    switch (globalObj.currentPage) {
        case '/':
        case '/index.html':
            console.log('FlixHive Home');
            break;
        case '/shows.html':
            console.log('TV Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV details');
            break;
        case '/search.html':
            console.log('search');
            break;
    }

    hlActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
