import { getWatchlist } from "../../services/tmdbApi";

export default async function watchlistPage() {
  const container = document.createElement("div");
  container.classList.add("watchlist");

  const title = document.createElement("h2");
  title.textContent = "My Watchlist";
  container.appendChild(title);

  const data = await getWatchlist();

  // if wishlist is emmpty
  if (!data || !Array.isArray(data.results) || data.results.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Your watchlist is empty.";
    container.appendChild(empty);
    return container;
  }

  // number videos
  const count = document.createElement("p");
  count.textContent = `Total movies: ${data.results.length}`;
  container.appendChild(count);

  // list video
  const list = document.createElement("div");
  list.classList.add("movie-list");

  data.results.forEach((movie: any) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // poster
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    poster.alt = movie.title;
    card.appendChild(poster);

    // title and year
    const info = document.createElement("div");
    info.classList.add("movie-info");
    info.innerHTML = `<h3>${movie.title} (${movie.release_date?.slice(0, 4)})</h3>
                          <p>Rating: ${movie.vote_average}</p>`;
    card.appendChild(info);

    // button "Mark as watched"
    const watchedBtn = document.createElement("button");
    watchedBtn.textContent = "Mark as watched";
    watchedBtn.addEventListener("click", () => {
      localStorage.setItem(movie.id.toString(), JSON.stringify(true));
      watchedBtn.disabled = true;
      watchedBtn.textContent = "Watched";
    });
    card.appendChild(watchedBtn);

    list.appendChild(card);
  });

  container.appendChild(list);
  return container;
}
