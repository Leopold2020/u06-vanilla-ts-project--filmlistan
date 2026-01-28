import { getMovieById } from "../../services/tmdbApi";
import { showInfoModal } from "../../components/infoButton/infoModal";
import "../../components/infoButton/infoModal.css";
import { getMoviesList, updateMovie } from "../../services/movieApi";
import type { TMDBMovie } from "../../types/movie";

export async function watchedPage(): Promise<HTMLElement> {
  const container = document.createElement("div");
  container.classList.add("watched-page");

  const title = document.createElement("h2");
  title.textContent = "Watched Movies";
  container.appendChild(title);

  const watchedList = document.createElement("div");
  watchedList.classList.add("movie-list");

  let hasWatched = false;

  const movies = await getMoviesList("watched")

  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  //   if (key?.startsWith("watched_") && localStorage.getItem(key) === "true") {
  //     const movieId = Number(key.split("_")[1]);

  //     const movie = await getMovieById(movieId);
  //     if (!movie) continue;

  //     watchedList.appendChild(createWatchedCard(movie));
  //     hasWatched = true;
  //   }
  // }

  movies.results.forEach((movie:TMDBMovie) => {

      // const movie = await getMovieById(movieId);
      // if (!movie) continue;

      watchedList.appendChild(createWatchedCard(movie));
      hasWatched = true;
  });

  if (!hasWatched) {
    const empty = document.createElement("p");
    empty.textContent = "No movies marked as watched.";
    container.appendChild(empty);
  } else {
    container.appendChild(watchedList);
  }

  return container;
  
}

function createWatchedCard(movie: TMDBMovie): HTMLElement {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  const poster = document.createElement("img");
  poster.src = `https://image.tmdb.org/t/p/w200${movie.posterPath}`;
  poster.alt = movie.title;
  card.appendChild(poster);

  const info = document.createElement("div");
  info.classList.add("movie-info");
  info.innerHTML = `
    <h3>${movie.title} (${movie.releaseDate?.slice(0, 4)})</h3>
    <p>★ ${movie.voteAverage.toFixed(1)}</p>
    `;
  card.appendChild(info);

  const editSpan = document.createElement("span");
  const editBtn = document.createElement("button");
  const editP = document.createElement("p");
  editSpan.classList.add("edit-rating");
  editBtn.textContent = "Edit";
  editP.textContent = `Your Rating: ${localStorage.getItem(`rating_${movie.id}`) || "N/A"}/5`;
  editSpan.appendChild(editP);
  editSpan.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    const newRating = prompt("Enter your new personal rating for this movie (1-5):");
    if (!Number.isNaN(newRating) &&newRating !== null && Number(newRating) >= 1 && Number(newRating) <= 5) {
        updateMovie(movie.id, "watched", parseFloat(newRating), null, 0, null)
        localStorage.setItem(`rating_${movie.id}`, newRating);
        editP.textContent = `Your Rating: ${newRating}/5`;
      } else {
        alert("Please enter a valid rating between 1 and 5.");
        location.reload();
      }
    });
  card.appendChild(editSpan);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-button");
  removeBtn.addEventListener("click", () => {
    localStorage.removeItem(`watched_${movie.id}`);
    card.remove();
  });
  card.appendChild(removeBtn);
  showInfoModal(movie, card);

  return card;
}
