// Replace with your OMDb API key (you can get a free one from omdbapi.com)
const API_KEY = "3110cb07"; 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

// Function to fetch movies
async function fetchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Clear old results
    moviesContainer.innerHTML = "";

    if (data.Response === "True") {
      data.Search.forEach(movie => {
        // Create movie card
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // Movie Poster
        const poster = document.createElement("img");
     poster.src = movie.Poster !== "N/A" ? movie.Poster : "images/logo.png";

        // Movie Info
        const info = document.createElement("div");
        info.classList.add("movie-info");

        const title = document.createElement("h3");
        title.textContent = movie.Title;

        const year = document.createElement("p");
        year.textContent = `Year: ${movie.Year}`;

        // Append elements
        info.appendChild(title);
        info.appendChild(year);
        movieCard.appendChild(poster);
        movieCard.appendChild(info);

        moviesContainer.appendChild(movieCard);
      });
    } else {
      moviesContainer.innerHTML = `<p>No movies found. Try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    moviesContainer.innerHTML = `<p>Something went wrong. Please try later.</p>`;
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  }
});
