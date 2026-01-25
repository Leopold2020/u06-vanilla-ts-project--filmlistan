export function watchedButton(movie: { id: number }, card: HTMLElement, seen: Boolean) {
    const watchedBtn = document.createElement("button");
    watchedBtn.classList.add("watched-button");
    watchedBtn.innerHTML = `
        <svg id='Check All' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' opacity='0'/>
            <g transform="matrix(0.43 0 0 0.43 12 12)" >
                <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: white; fill-rule: nonzero; opacity: 1;" transform=" translate(-25, -25)" d="M 7 2 C 4.199219 2 2 4.199219 2 7 L 2 34 C 2 36.800781 4.199219 39 7 39 L 34 39 C 36.800781 39 39 36.800781 39 34 L 39 7 C 39 6.5 38.914063 6 38.8125 5.5 L 19.09375 27.40625 L 9.40625 18.6875 L 10.6875 17.1875 L 19 24.5 L 37.6875 3.6875 C 36.789063 2.6875 35.5 2 34 2 Z M 41 11 L 41 35 C 41 38.300781 38.300781 41 35 41 L 11 41 L 11 43 C 11 45.800781 13.199219 48 16 48 L 43 48 C 45.800781 48 48 45.800781 48 43 L 48 16 C 48 13.199219 45.800781 11 43 11 Z" stroke-linecap="round" />
            </g>
        </svg>`;
    if (seen) {
        watchedBtn.classList.add("seen")
    } else {
        watchedBtn.addEventListener("click", () => {
            const personalRating = prompt("Enter your personal rating for this movie (1-10):");
            if (!Number.isNaN(personalRating) && personalRating !== null && Number(personalRating) >= 1 && Number(personalRating) <= 10) {
                localStorage.setItem(`rating_${movie.id}`, personalRating);
                localStorage.setItem(`watched_${movie.id}`, "true");
            } else {
                alert("Please enter a valid rating between 1 and 10.");
            }
            watchedBtn.disabled = true;
            watchedBtn.innerHTML = `
                <svg id='Check All' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' opacity='0'/>
                    <g transform="matrix(0.43 0 0 0.43 12 12)" >
                        <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" transform=" translate(-25, -25)" d="M 7 2 C 4.199219 2 2 4.199219 2 7 L 2 34 C 2 36.800781 4.199219 39 7 39 L 34 39 C 36.800781 39 39 36.800781 39 34 L 39 7 C 39 6.5 38.914063 6 38.8125 5.5 L 19.09375 27.40625 L 9.40625 18.6875 L 10.6875 17.1875 L 19 24.5 L 37.6875 3.6875 C 36.789063 2.6875 35.5 2 34 2 Z M 41 11 L 41 35 C 41 38.300781 38.300781 41 35 41 L 11 41 L 11 43 C 11 45.800781 13.199219 48 16 48 L 43 48 C 45.800781 48 48 45.800781 48 43 L 48 16 C 48 13.199219 45.800781 11 43 11 Z" stroke-linecap="round" />
                    </g>    
                </svg>`;
        });
    }   
    card.appendChild(watchedBtn);
}