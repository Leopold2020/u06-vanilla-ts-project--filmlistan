import { getWatchlist } from "../../services/tmdbApi";

export async function watchedPage(): Promise<HTMLElement> {
  const container = document.createElement("div");
  container.classList.add("watched-page");

  const title = document.createElement("h2");
  title.textContent = "Watched Movies";
  container.appendChild(title);

  const data = await getWatchlist();

  const watchedList = document.createElement("div");
  watchedList.classList.add("movie-list");

  let hasWatched = false;

  data.results.forEach((movie: any) => {
    if (localStorage.getItem(`watched_${movie.id}`) === "true") {
      hasWatched = true;
      watchedList.appendChild(createWatchedCard(movie));
    }
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

  return card;
}
