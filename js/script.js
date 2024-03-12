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


//Display Movie Details
const displayMovieDetails = async () => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    console.log("ID", movieId);
    const movie = await fetchData(`movie/${movieId}`);

    //Overylay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
    <div>
    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">` : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="Movie name"
  />`}
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
       ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map(genre => `<li class="list-group-item">${genre.name}</li>`).join('')}
      </ul >
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div >
  </div >
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${movie.production_companies.map((company) => `<span> ${company.name}</span>`).join("")}
        </div>
    </div>
`
    document.querySelector('#movie-details').appendChild(div);
}


//Display Movie Details
const displayShowDetails = async () => {
    const showId = new URLSearchParams(window.location.search).get('id');
    console.log("ID", showId);
    const show = await fetchData(`tv/${showId}`);

    //Overylay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
    <div>
    ${show.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}">` : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="show name"
  />`}
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)}/ 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
       ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${show.genres.map(genre => `<li class="list-group-item">${genre.name}</li>`).join('')}
      </ul >
    <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
    </div >
  </div >
    <div class="details-bottom">
        <h2>show Info</h2>
        <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
         
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${show.production_companies.map((company) => `<span> ${company.name}</span>`).join("")}
        </div>
    </div>
`
    document.querySelector('#show-details').appendChild(div);
}

//Display Background on Details Pages

const displayBackgroundImage = (type, path) => {

    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;

    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'none';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);

    } else {

        document.querySelector('#show-details').appendChild(overlayDiv);
    }

}

//Dispplay Slider 
const displaySlider = async () => {
    const { results } = await fetchData('movie/now_playing');
    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `  
    <img src="https://image.tmdb.org/t/p/original${result.backdrop_path}" class="d-block w-
    100" alt="${result.title}">
    <div class="carousel-caption d-none d-md-block">
        <h5>${result.title}</h5>
        <p>${result.overview}</p>
    </div>
    `;
        document.querySelector('.carousel-inner').
            appendChild(div);
    }
    );
    document.querySelector('.carousel-item').classList.add('active');
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

const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Init App

const init = () => {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows()
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
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