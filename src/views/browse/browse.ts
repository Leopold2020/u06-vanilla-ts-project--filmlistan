import { getMovies, getPopularMoviesTMDB, addToWatchlist } from "../../services/tmdbApi";
import { showInfoModal } from "../../components/infoButton/infoModal";
import "../../components/infoButton/infoModal.css";
import { watchedButton } from "../../components/watchedButton/watchedBtn";
import "../../components/watchedButton/watchedBtn.css";

export default async function browse() {
  const browse = document.createElement("div");
  browse.classList.add("browse");

  const container = document.createElement("div");
  container.classList.add("watchlist");

  const title = document.createElement("h2");
  title.textContent = "My Watchlist";
  container.appendChild(title);

  let movies: any[] = [];

  function renderMovies(moviesList: any[]) {
    try {
      list.innerText = "";
      moviesList.forEach((movie: any) => {
        console.log("test search", movie.title);
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const poster = document.createElement("img");
        poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        poster.alt = movie.title;
        card.appendChild(poster);

        const info = document.createElement("div");
        info.classList.add("movie-info");
        info.innerHTML = `<h3>${movie.title} (${movie.release_date?.slice(0, 4)})</h3>
                                    <p>Rating: ${movie.vote_average.toFixed(1)}</p>`;
        card.appendChild(info);
        showInfoModal(movie, card);
        watchedButton(movie, card);
        list.appendChild(card);
      });
    } catch (error) {
      console.log(error);
    }
  }

  await getPopularMoviesTMDB().then((response?) => {
    if (!response || !Array.isArray(movies) || movies.length === 0) {
      movies = response?.results;
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

  const list = document.createElement("div");
  list.classList.add("movie-list");
  
  // get localstorage
  const items = ({...localStorage });

  movies.forEach((movie: any) => {
    console.log("test", movie.title);
    const card = document.createElement("div");
    card.classList.add("movie-card");
    
    // if movie is watched - change "watched color"
    let color = false;
    if (`watched_${movie.id}` in items) {
      color = true;
    }

    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    poster.alt = movie.title;
    card.appendChild(poster);

    const info = document.createElement("div");
    info.classList.add("movie-info");
    info.innerHTML = `<h3>${movie.title} (${movie.release_date?.slice(0, 4)})</h3>
                            <p>Rating: ${movie.vote_average.toFixed(1)}</p>`;
    card.appendChild(info);

    // const watchedBtn = document.createElement("button");
    // watchedBtn.textContent = "Mark as watched";
    // watchedBtn.addEventListener("click", () => {
    //   localStorage.setItem(`watched_${movie.id}`, "true");
    //   watchedBtn.disabled = true;
    //   watchedBtn.textContent = "Watched";
    // });
    // card.appendChild(watchedBtn);

    const watchListBtn = document.createElement("button");
    watchListBtn.textContent = "Add to watchlist";
    watchListBtn.classList.add("watchlist-button");
    watchListBtn.addEventListener("click", () => {
      addToWatchlist(movie.id, true);
      watchListBtn.disabled = true;
      watchListBtn.textContent = "In Watchlist";
    });
    card.appendChild(watchListBtn);
    showInfoModal(movie, card);
    watchedButton(movie, card, color);

    list.appendChild(card);
  });

  browse.appendChild(list);
  return browse;
}
