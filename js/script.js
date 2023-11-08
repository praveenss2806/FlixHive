const globalObj = {
    currentPage: window.location.pathname,
};

const getPopularMovies = async () => {
    const { results } = await fetchAPIdata('movie/popular');
    console.log(results);
};

//fetch the data from TMDB api
const fetchAPIdata = async (endpoint) => {
    apiUrl = 'https://api.themoviedb.org/3';
    apiKey = 'f9722bd6bf6f645f6ce0506a98ce6067';

    const response = await fetch(
        `${apiUrl}/${endpoint}?api_key=${apiKey}&language=en-US`
    );

    const data = await response.json();

    return data;
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
            getPopularMovies();
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
