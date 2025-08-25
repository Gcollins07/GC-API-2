// `http://www.omdbapi.com/?apikey=[d0e2373f]&`
// `http://img.omdbapi.com/?apikey=[d0e2373f]&`


// const moviesImg = fetch(`http://img.omdbapi.com/?apikey=d0e2373f&`)



const searchBtn = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search-bar');
const resultsContainer = document.querySelector('.results__container');
const form = document.querySelector('.search-bar__wrapper')
const apiKey = 'd0e2373f';
const filterEl = document.getElementById("filter")
let movies = []

function openMenu() {
  document.body.classList += " menu--open";
  console.log("hello")
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function renderMovies() {
  movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `;

        resultsContainer.appendChild(movieCard);
      });
}

function filterMovies(filter) {
  if (filter === "NEW_TO_OLD") {
    movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (filter === "OLD_TO_NEW") {
    movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  } else if (filter === "Z-A") {
    movies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (filter === "A-Z") {
    movies.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  resultsContainer.innerHTML = '';
  renderMovies();
}

filterEl.addEventListener("change", (e) => {
  filterMovies(e.target.value);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  resultsContainer.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      resultsContainer.innerHTML = '';
      movies = data.Search
      renderMovies()

    } else {
      resultsContainer.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = `<p>An error occurred while fetching data. Please try again later.</p>`;
  }
});
filterMovies()
