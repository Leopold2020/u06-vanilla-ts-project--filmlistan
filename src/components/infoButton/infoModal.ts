import type { TMDBMovie } from "../../types/movie";

export function showInfoModal(movie: TMDBMovie, card: HTMLElement) {
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

    const infoBtn = document.createElement("button");
    infoBtn.classList.add("info-button");
    
    infoBtn.innerHTML = `More info`;

    infoBtn.addEventListener("click", () => {
       modalContent.innerHTML = `
       <div class="modal-inner">
         <div class="modal-poster">
           <img src="https://image.tmdb.org/t/p/w300${movie.posterPath}" alt="${movie.title} Poster">
         </div>
         <div class="modal-text">
           <h2>${movie.title}</h2>
           <p><strong>Release:</strong> ${movie.releaseDate}</p>
           <p><strong>✭ </strong> ${movie.voteAverage}</p>
           <p>${movie.overview}</p>
         </div>
       </div>
  `;

   modalOverlay.classList.remove("hidden");
    });
    
    card.appendChild(infoBtn);
    return infoBtn;
}
