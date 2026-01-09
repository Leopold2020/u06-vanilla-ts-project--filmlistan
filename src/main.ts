import "./style.css";
import { setRenderCallback } from "./lib/store.ts";

// Statiska sidor
// måste refererera till den specifika .html filen med "?raw" för att kunna läsas in
import headerHTML from "./views/static/header/index.html?raw";
import homeHTML from "./views/static/home/index.html?raw";
import footerHTML from "./views/static/footer/index.html?raw";

// Dynamiska sidor
import about from "./views/about/index.ts";
import browse from "./views/browse/browse.ts";
import watchlistPage from "./views/watchlist/watchlist.ts";

const currentPage = (): string | HTMLElement => {
  const path = window.location.pathname;
  switch (path) {
    case "/":
      return homeHTML;
    case "/about":
      return about();
    case "/browse":
      return browse();
    case "/watchlist":
      return watchlistPage();
    default:
      return "404";
  }
};

const app = document.querySelector("#app")!;

// Funktionen som renderar sidan
const renderApp = async () => {
  const page = await currentPage();

  if (typeof page === "string") {
    app.innerHTML = `
          ${headerHTML} 
          ${page} 
          ${footerHTML}`;
  } else {
    app.innerHTML = `${headerHTML} 
     ${footerHTML}`;

    app.appendChild(page);
  }
};

// Initialisera appen
renderApp();

// Rerender-logic
// Om sidan ändras, rerenderas appen
window.addEventListener("popstate", () => {
  renderApp();
});

// Intercepta länkar och hantera navigation
// Detta förhindrar att sidan laddas om och bevarar state
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest("a");

  if (link && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    const path = new URL(link.href).pathname;
    window.history.pushState({}, "", path);
    renderApp();
  }
});

// Set render callback
setRenderCallback(renderApp);
