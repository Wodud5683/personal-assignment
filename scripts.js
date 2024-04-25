const apiKey = '868020abb854edc858d2a34989321bc4';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjgwMjBhYmI4NTRlZGM4NThkMmEzNDk4OTMyMWJjNCIsInN1YiI6IjY0YmYyMjZmYjMzMTZiMDBmZjYxZjhmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q5hgS1zyssAynsjt_7X3u4XIsR2UxwI5RhkC4gUrx2g'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

const fetchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

const displayMovies = (movies) => {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    const movieCards = movies.map(movie => {
        const card = document.createElement('div');
        card.className = 'mbcard';

        const voteAverage = movie.vote_average || '9'; // Handle missing vote_average

        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-Rating"><Rating>Rating:</Rating> ${voteAverage}</p>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            alert(`Movie ID: ${movie.id}`);
        });

        return card;
    });

    movieCards.forEach(card => {
        movieList.appendChild(card);
    });
};

const searchMovies = async () => {
    const searchInput = document.getElementById('searchBar');
    const query = searchInput.value.trim();

    if (query.length > 0) {
        const searchResults = await fetchMovies(query);
        const filteredResults = searchResults.filter(movie => movie.vote_average >= 7); 
        displayMovies(filteredResults);
    } else {
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = ''; 
    }
};

window.addEventListener('load', async () => {
    const popularMovies = await fetchMovies('popular');
    displayMovies(popularMovies);
});

document.getElementById('searchButton').addEventListener('click', async () => {
    await searchMovies();
});

document.getElementById('searchInput').addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        await searchMovies();
    }
});
