import { getMovieById } from "../../services/tmdbApi";
import { showInfoModal } from "../../components/infoModal";
import "../../components/infoModal.css";

export async function watchedPage(): Promise<HTMLElement> {
  const container = document.createElement("div");
  container.classList.add("watched-page");

  const title = document.createElement("h2");
  title.textContent = "Watched Movies";
  container.appendChild(title);

  const watchedList = document.createElement("div");
  watchedList.classList.add("movie-list");

  let hasWatched = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("watched_") && localStorage.getItem(key) === "true") {
      const movieId = Number(key.split("_")[1]);

      const movie = await getMovieById(movieId);
      if (!movie) continue;

      watchedList.appendChild(createWatchedCard(movie));
      hasWatched = true;
    }
  }

  if (!hasWatched) {
    const empty = document.createElement("p");
    empty.textContent = "No movies marked as watched.";
    container.appendChild(empty);
  } else {
    container.appendChild(watchedList);
  }

  return container;
}

function createWatchedCard(movie: any): HTMLElement {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  const poster = document.createElement("img");
  poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  poster.alt = movie.title;
  card.appendChild(poster);

  const info = document.createElement("div");
  info.classList.add("movie-info");
  info.innerHTML = `<h3>${movie.title} (${movie.release_date?.slice(0, 4)})</h3>
                    <p>Rating: ${movie.vote_average}</p>`;
  card.appendChild(info);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    localStorage.removeItem(`watched_${movie.id}`);
    card.remove();
  });
  card.appendChild(removeBtn);
  showInfoModal(movie, card);

  return card;
}
