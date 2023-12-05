const globalObj = {
    currentPage: window.location.pathname,
    search: {
        type: '',
        term: '',
        page: 1,
        totalPage: 1,
    },
};

const getPopularMovies = async () => {
    const { results } = await fetchApiData('movie/popular');
    console.log(results);

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                ${
                    movie.poster_path
                        ? `<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.title}"
                    />`
                        : `<img
                        src="images/no-image.jpg"
                        class="card-img-top"
                        alt="${movie.title}"
                    />`
                }     
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>
        `;

        document.querySelector('#popular-movies').appendChild(div);
    });
};

const getPopularTvShows = async () => {
    const { results } = await fetchApiData('tv/popular');
    console.log(results);

    results.forEach((tv) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?id=${tv.id}">
                ${
                    tv.poster_path
                        ? `<img
                        src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
                        class="card-img-top"
                        alt="${tv.name}"
                    />`
                        : `<img
                        src="images/no-image.jpg"
                        class="card-img-top"
                        alt="${tv.name}"
                    />`
                }     
            </a>
            <div class="card-body">
                <h5 class="card-title">${tv.name}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${tv.first_air_date}</small>
                </p>
            </div>
        `;

        document.querySelector('#popular-shows').appendChild(div);
    });
};

const getMovieDetails = async () => {
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchApiData(`movie/${movieId}`);

    console.log(movie);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
        <div>
        ${
            movie.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
            />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
            />`
        }     
        </div>
        <div>
            <h2>${movie.title}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p> ${movie.overview} </p>
            <h5>Genres</h5>
            <ul class="list-group">
               ${movie.genres
                   .map((genre) => {
                       return `<li>${genre.name}</li>`;
                   })
                   .join('')}
            </ul>
            <a href="${
                movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
            <li><span class="text-secondary">Budget:</span> $${
                movie.budget
            }</li>
            <li><span class="text-secondary">Revenue:</span> $${
                movie.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
                movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${movie.production_companies
                .map((pc) => {
                    return `<li>${pc.name}</li>`;
                })
                .join('')}
        </div>
    </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
};

const getShowDetails = async () => {
    const showId = window.location.search.split('=')[1];

    const show = await fetchApiData(`tv/${showId}`);

    console.log(show);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
        <div>
        ${
            show.poster_path
                ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
            />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
            />`
        }     
        </div>
        <div>
            <h2>${show.name}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p> ${show.overview} </p>
            <h5>Genres</h5>
            <ul class="list-group">
               ${show.genres
                   .map((genre) => {
                       return `<li>${genre.name}</li>`;
                   })
                   .join('')}
            </ul>
            <a href="${
                show.homepage
            }" target="_blank" class="btn">Visit show Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>show Info</h2>
        <ul>
            <li><span class="text-secondary">First Air Date:</span> ${
                show.first_air_date
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${show.production_companies
                .map((pc) => {
                    return `<li>${pc.name}</li>`;
                })
                .join('')}
        </div>
    </div>
    `;

    document.querySelector('#show-details').appendChild(div);
};

const search = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    globalObj.search.term = urlParams.get('search-term');
    globalObj.search.type = urlParams.get('type');

    if (globalObj.search.term !== '' && globalObj.search.term !== null) {
        const { results, page, total_pages } = await searchApiData();

        if (results.length === 0) {
            showAlert('No results found');
        }

        displaySearchResults(results);
    } else {
        showAlert('Please enter search term');
    }
};

const displaySearchResults = (results) => {
    results.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="${globalObj.search.type}-details.html?id=${result.id}">
                ${
                    result.poster_path
                        ? `<img
                        src="https://image.tmdb.org/t/p/w500${
                            result.poster_path
                        }"
                        class="card-img-top"
                        alt="${
                            globalObj.search.type === 'movie'
                                ? result.title
                                : result.name
                        }"
                    />`
                        : `<img
                        src="images/no-image.jpg"
                        class="card-img-top"
                        alt="${
                            globalObj.search.type === 'movie'
                                ? result.title
                                : result.name
                        }"
                    />`
                }     
            </a>
            <div class="card-body">
                <h5 class="card-title">${
                    globalObj.search.type === 'movie'
                        ? result.title
                        : result.name
                }</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${
                    globalObj.search.type === 'movie'
                        ? result.release_date
                        : result.first_air_date
                }</small>
                </p>
            </div>
        `;

        document.querySelector('#search-results').appendChild(div);
    });
};

const showSlider = async () => {
    const { results } = await fetchApiData('movie/now_playing');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');

        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
            }" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                1
            )} / 10
            </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);

        initSwiper();
    });
};

const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
};

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show');
};

const fetchApiData = async (endpoint) => {
    const ApiKey = 'f9722bd6bf6f645f6ce0506a98ce6067';
    const ApiUrl = 'https://api.themoviedb.org/3';

    showSpinner();

    const res = await fetch(
        `${ApiUrl}/${endpoint}?api_key=${ApiKey}&language=en-Us`
    );

    const data = await res.json();

    hideSpinner();

    return data;
};

const searchApiData = async () => {
    const ApiKey = 'f9722bd6bf6f645f6ce0506a98ce6067';
    const ApiUrl = 'https://api.themoviedb.org/3';

    showSpinner();

    const res = await fetch(
        `${ApiUrl}/search/${globalObj.search.type}?api_key=${ApiKey}&query=${globalObj.search.term}`
    );

    const data = await res.json();

    hideSpinner();

    return data;
};

const hlActiveLink = () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === globalObj.currentPage) {
            link.classList.add('active');
        }
    });
};

const showAlert = (msg, className = 'error') => {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(msg));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => alertEl.remove(), 3000);
};

const init = () => {
    switch (globalObj.currentPage) {
        case '/':
        case '/index.html':
            showSlider();
            getPopularMovies();
            break;
        case '/shows.html':
            getPopularTvShows();
            break;
        case '/movie-details.html':
            getMovieDetails();
            break;
        case '/tv-details.html':
            getShowDetails();
            break;
        case '/search.html':
            search();
            break;
    }

    hlActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
