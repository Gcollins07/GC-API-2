// `http://www.omdbapi.com/?apikey=[d0e2373f]&`
// `http://img.omdbapi.com/?apikey=[d0e2373f]&`


const moviesImg = fetch(`http://img.omdbapi.com/?apikey=d0e2373f&`)
const searchBtn = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search-bar');
const resultsContainer = document.querySelector('.results__container');

const apiKey = 'd0e2373f';

searchBtn.addEventListener('click', async (event) => {
  event.preventDefault(); // stop the <a> from navigating

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    resultsContainer.innerHTML += '<p>Please enter a search term.</p>';
    return;
  }

  resultsContainer.innerHTML += '<p>Loading...</p>';

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      resultsContainer.innerHTML = '';

      data.Search.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        `;

        resultsContainer.appendChild(movieCard);
      });
    } else {
      resultsContainer.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = `<p>An error occurred while fetching data. Please try again later.</p>`;
  }
});