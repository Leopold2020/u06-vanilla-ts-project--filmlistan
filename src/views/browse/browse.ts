import { getMovies, getPopularMoviesTMDB, addToWatchlist } from "../../services/tmdbApi";
import { showInfoModal } from "../../components/infoButton/infoModal";
import "../../components/infoButton/infoModal.css";
import { watchedButton } from "../../components/watchedButton/watchedBtn";
import "../../components/watchedButton/watchedBtn.css";
import type { TMDBMovie } from "../../types/movie";

export default async function browse() {
  const browse = document.createElement("div");
  browse.classList.add("browse");

  const container = document.createElement("div");
  container.classList.add("watchlist");

  const title = document.createElement("h2");
  title.textContent = "My Watchlist";
  container.appendChild(title);

  let movies: TMDBMovie[] = [];

  // Create list and items early so they can be used in renderMovies
  const list = document.createElement("div");
  list.classList.add("movie-list");
  
  // get localstorage
  const items = ({...localStorage });

  function renderMovies(moviesList: TMDBMovie[]) {
    try {
      list.innerText = "";
      moviesList.forEach((movie: TMDBMovie) => {
        console.log("test search", movie.title);
        const card = document.createElement("div");
        card.classList.add("movie-card");    
        // if movie is watched - change "watched color"
        let color = false;
        if (`watched_${movie.id}` in items) {
          color = true;
        }
  

        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w200${movie.posterPath}`;
        poster.alt = movie.title;
        card.appendChild(poster);

        const info = document.createElement("div");
        info.classList.add("movie-info");
        info.innerHTML = `<h3>${movie.title} (${movie.releaseDate?.slice(0, 4)})</h3>
                                    <p>★ ${movie.voteAverage.toFixed(1)}</p>`;
                       
        const watchListBtn = document.createElement("button");
        watchListBtn.textContent = "Add to watchlist";
        watchListBtn.classList.add("watchlist-button");
        watchListBtn.addEventListener("click", () => {
        addToWatchlist(movie.id, true);
        watchListBtn.disabled = true;
        watchListBtn.textContent = "In Watchlist";
        });
        card.appendChild(info);
        
        card.appendChild(watchListBtn);
        showInfoModal(movie, card);
        watchedButton(movie, card, color);
        list.appendChild(card);
      });
    } catch (error) {
      console.log(error);
    }
  }

  await getPopularMoviesTMDB().then((response) => {
    if (response && Array.isArray(response.results) && response.results.length > 0) {
      movies = response.results;
      renderMovies(movies);
      console.log(response);
    }
  });


  const section = document.createElement("section");
  browse.appendChild(section);

  const input = document.createElement("input");
  input.type = "text";
  input.id = "Input";
  input.placeholder = "Search for names..";
  input.title = "Type in a name";
  section.appendChild(input);

  const button = document.createElement("button");
  button.id = "searchButton";
  button.textContent = "Search";
  section.appendChild(button);

  button.addEventListener("click", () => {
    const input = document.getElementById("Input") as HTMLInputElement;
    console.log("test");
    console.log(input.value);
    getMovies(input.value, 1).then((searchedMovies) => {
      console.log(searchedMovies);
      renderMovies(searchedMovies.results);
    });
  });
  
  browse.appendChild(list);
  return browse;
}
