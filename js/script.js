const global = {
    currentPage: window.location.pathname,
};

//Display Popular Movies
const displayPopularMovies = async () => {
    const { results } = await fetchData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `  
    <a href="movie-details.html?id=${movie.id}">
      ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.name}">` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Movie name"
    />`}
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
  `;
        document.querySelector('#popular-movies').
            appendChild(div);
    });

};

//Display Popular Shows
const displayPopularShows = async () => {
    const { results } = await fetchData('tv/popular');
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `  
    <a href="tv-details.html?id=${show.id}">
      ${show.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="show name"
    />`}
    </a>
    <div class="card-body">
      <h5 class="card-name">${show.name}</h5>
      <p class="card-text">
        <small class="text-muted">Air Date: ${show.first_air_date}</small>
      </p>
    </div>
  `;
        document.querySelector('#popular-shows').
            appendChild(div);
    });

};


//Fetch Data from TMDB API
const fetchData = async (endpoint) => {
    const API_KEY = 'd9fbd89a6404c8651bda8422b72df43b';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    hideSpinner();
    return data;
}

const showSpinner = () => {
    document.querySelector('.spinner').classList.add("show")
}

const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove("show")
}

//Highlight Active Link

const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

//Init App

const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows()
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
        default:
            console.log('Page Not Found');
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);