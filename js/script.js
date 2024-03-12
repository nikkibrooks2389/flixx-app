const global = {
    currentPage: window.location.pathname,
};

const displayPopularMovies = async () => {
    const { results } = await fetchData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `  
    <a href="movie-details.html?id=${movie.id}">
      ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">` : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Movie Title"
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
            console.log('Shows');
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