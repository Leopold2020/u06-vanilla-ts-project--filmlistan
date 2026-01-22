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
    
    infoBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     width="16"
     height="16"
     aria-hidden="true">
  <path fill="white" d="M12 0C5.371 0 0 5.371 0 12c0 6.629 5.371 12 12 12
    6.629 0 12-5.371 12-12C24 5.371 18.629 0 12 0zm0 2
    c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12
    6.477 2 12 2zm0 3.813c-.184 0-.336.004-.5.031
    -.164.035-.316.125-.438.219-.121.094-.211.223-.281.375
    -.07.152-.094.332-.094.563 0 .227.023.406.094.563
    .07.156.16.281.281.375.121.094.273.148.438.188
    .164.039.316.062.5.062.18 0 .371-.023.531-.062
    .16-.04.285-.094.406-.188.121-.094.211-.219.281-.375
    .07-.152.125-.336.125-.563 0-.23-.055-.41-.125-.563
    -.07-.152-.16-.281-.281-.375-.121-.094-.246-.184-.406-.219
    -.16-.027-.352-.031-.531-.031zm-1.219 3.344v8.969h2.438V9.156z"/>
</svg>
`;

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
