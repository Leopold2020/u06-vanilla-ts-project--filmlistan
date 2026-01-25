export function showInfoModal(movie: any, card: HTMLElement) {
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
    <h2>${movie.title}</h2>
    <p><strong>Release:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average}</p>
    <p>${movie.overview}</p>
  `;

   modalOverlay.classList.remove("hidden");
    });
    
    card.appendChild(infoBtn);
    return infoBtn;
}
