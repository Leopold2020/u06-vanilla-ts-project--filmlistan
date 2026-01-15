import { getWatchlist } from "../../services/tmdbApi";
import "./watchlist.css";

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

  const modalOverlay = document.createElement("div");
modalOverlay.className = "modal-overlay hidden";

const modal = document.createElement("div");
modal.className = "modal";

const closeBtn = document.createElement("button");
closeBtn.className = "modal-close";
closeBtn.textContent = "×";

const modalContent = document.createElement("div");
modalContent.className = "modal-content";

closeBtn.addEventListener("click", () => {
  modalOverlay.classList.add("hidden");
});

modal.appendChild(closeBtn);
modal.appendChild(modalContent);
modalOverlay.appendChild(modal);
document.body.appendChild(modalOverlay);

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

    const infoBtn = document.createElement("button");
    infoBtn.classList.add("info-button");
    infoBtn.textContent = "More Info";
    infoBtn.addEventListener("click", () => {
       modalContent.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Release:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  `;

  modalOverlay.classList.remove("hidden");
      
    });
    card.appendChild(infoBtn);

    list.appendChild(card);
  });

  container.appendChild(list);
  return container;
}
