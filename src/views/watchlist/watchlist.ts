// import { getWatchlist, removeFromWatchlist } from "../../services/tmdbApi";
import { getMovies, deleteMovie } from "../../services/movieApi"

import { showInfoModal } from "../../components/infoButton/infoModal";
import "../../components/infoButton/infoModal.css";
import { watchedButton } from "../../components/watchedButton/watchedBtn";
import "../../components/watchedButton/watchedBtn.css";

export default async function watchlistPage() {
  const container = document.createElement("div");
  container.classList.add("watchlist");
  
  const title = document.createElement("h2");
  title.textContent = "My Watchlist";
  container.appendChild(title);
  
  // const data = await getWatchlist();
  const data = await getMovies("watchlist")

  // if watchlist is empty
  if (!data || !Array.isArray(data) || data.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Your watchlist is empty.";
    container.appendChild(empty);
    return container;
  };

  // number videos
  const count = document.createElement("p");
  count.textContent = `Total movies: ${data.length}`;
  container.appendChild(count);

  // list video
  const list = document.createElement("div");
  list.classList.add("movie-list");
  
  // get localstorage
  const items = ({...localStorage });

  data.forEach((movie: any) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // if movie is watched - change "watched color"
    let color = false;
    if (`watched_${movie.id}` in items) {
      color = true;
    }
  
    // poster
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    poster.alt = movie.title;
    card.appendChild(poster);

    // title, year and rating
    const info = document.createElement("div");
    info.classList.add("movie-info");
    info.innerHTML = `
      <h3>${movie.title} (${movie.release_date?.slice(0, 4)})</h3>
      <p>Rating: ${movie.vote_average?.toFixed(1)}</p>
      `;
    card.appendChild(info);

    // // button "Mark as watched"
    // const watchedBtn = document.createElement("button");
    // watchedBtn.textContent = "Mark as watched";
    // watchedBtn.addEventListener("click", () => {
    //   localStorage.setItem(`watched_${movie.id}`, "true");
    //   watchedBtn.disabled = true;
    //   watchedBtn.textContent = "Watched";
    // });
    // card.appendChild(watchedBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-button");
    removeBtn.addEventListener("click", async () => {
      deleteMovie(movie.id)
      // await removeFromWatchlist(movie.id);
      localStorage.removeItem(`${movie.id}`);
      localStorage.removeItem(`watchlist_date_${movie.id}`);
      card.remove();
    });
    card.appendChild(removeBtn);

    list.appendChild(card);
    showInfoModal(movie, card);
    watchedButton(movie, card, color);

    const storageKey = `watchlist_date_${movie.id}`;

    let addedAt = localStorage.getItem(storageKey);

    if (!addedAt) {
      addedAt = new Date().toISOString();
      localStorage.setItem(storageKey, addedAt);
    }
    
    const addedDate = document.createElement("p");
    addedDate.textContent = `Added on: ${new Date(addedAt).toLocaleDateString()}`;
    info.appendChild(addedDate);
  });

  container.appendChild(list);
  return container;
}
