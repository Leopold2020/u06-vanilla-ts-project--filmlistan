# Guide: Bygg en Enkel Single Page Application (SPA) med TypeScript

Denna guide visar hur du bygger en enkel Single Page Application (SPA) från scratch med TypeScript, Vite och vanilla JavaScript. Du kommer att lära dig grunderna i routing, state management och dynamisk rendering.

## 📋 Innehållsförteckning

1. [Projekt Setup](#1-projekt-setup)
2. [Projektstruktur](#2-projektstruktur)
3. [Steg 1: Grundläggande HTML](#steg-1-grundläggande-html)
4. [Steg 2: TypeScript Konfiguration](#steg-2-typescript-konfiguration)
5. [Steg 3: Routing System](#steg-3-routing-system)
6. [Steg 4: Statiska Sidor](#steg-4-statiska-sidor)
7. [Steg 5: Dynamiska Sidor](#steg-5-dynamiska-sidor)
8. [Steg 6: State Management](#steg-6-state-management)
9. [Steg 7: Navigation](#steg-7-navigation)
10. [Steg 8: Styling](#steg-8-styling)

---

## 1. Projekt Setup

### Installera Node.js och npm

Se till att du har Node.js installerat (version 18 eller senare). Kontrollera med:

```bash
node --version
npm --version
```

### Skapa ett nytt projekt

```bash
mkdir simple-spa-ts
cd simple-spa-ts
npm init -y
```

### Installera dependencies

```bash
npm install -D vite typescript
```

---

## 2. Projektstruktur

Skapa följande mappstruktur:

```
simple-spa-ts/
├── index.html
├── package.json
├── tsconfig.json
└── src/
    ├── main.ts
    ├── style.css
    ├── global.css
    ├── lib/
    │   └── store.ts
    └── views/
        ├── about/
        │   ├── index.ts
        │   └── style.css
        └── static/
            ├── header/
            │   ├── index.html
            │   └── style.css
            ├── footer/
            │   ├── index.html
            │   └── style.css
            └── home/
                ├── index.html
                └── style.css
```

---

## Steg 1: Grundläggande HTML

### `index.html`

Skapa huvudfilen som är ingångspunkten för din SPA:

```html
<!doctype html>
<html lang="sv">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple SPA</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**Förklaring:**
- `<div id="app">` är containern där allt innehåll renderas
- `<script type="module">` laddar TypeScript-filen som entry point

---

## Steg 2: TypeScript Konfiguration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### `package.json`

Lägg till scripts för att köra projektet:

```json
{
  "name": "simple-spa-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "~5.9.3",
    "vite": "^7.2.4"
  }
}
```

---

## Steg 3: Routing 

### `src/main.ts` - Huvudlogik

Detta är kärnan i din SPA. Här hanterar vi routing och rendering:

```typescript
import "./style.css";
import { setRenderCallback } from "./lib/store.ts";

// Statiska sidor
// måste refererera till den specifika .html filen med "?raw" för att kunna läsas in
import headerHTML from "./views/static/header/index.html?raw";
import homeHTML from "./views/static/home/index.html?raw";
import footerHTML from "./views/static/footer/index.html?raw";

// Dynamiska sidor
import about from "./views/about/index.ts";

// Funktion som bestämmer vilken sida som ska visas baserat på URL
const currentPage = (): string | HTMLElement => {
  const path = window.location.pathname;
  switch (path) {
    case "/":
      return homeHTML; // Returnera statisk HTML-sträng
    case "/about":
      return about(); // Returnera HTMLElement från funktion
    default:
      return "404";
  }
};

// Hämta app-containern
const app = document.querySelector("#app")!;

// Funktion som renderar hela sidan
const renderApp = () => {
  const page = currentPage();

  if (typeof page === "string") {
    // Om sidan är en sträng (statisk HTML)
    app.innerHTML = `
      ${headerHTML} 
      ${page} 
      ${footerHTML}`;
  } else {
    // Om sidan är ett HTMLElement (dynamisk)
    app.innerHTML = `${headerHTML} ${footerHTML}`;
    app.insertBefore(page, app.querySelector("footer")!);
  }
};

// Initialisera appen
renderApp();

// Rerender-logic 
// Om sidan ändras, rerenderas appen
window.addEventListener("popstate", () => {
  renderApp();
});

// Set render callback
setRenderCallback(renderApp);
```

**Viktiga koncept:**
- `window.location.pathname` - hämtar aktuell URL-sökväg
- `switch` - bestämmer vilken sida som ska visas
- `renderApp()` - funktion som uppdaterar DOM:en
- `popstate` - event som triggas vid browser navigation (tillbaka/framåt-knappar)
- `pushState()` - uppdaterar URL utan sidladdning
- `setRenderCallback()` - kopplar store till render-funktionen för automatisk re-rendering

---

## Steg 4: Statiska Sidor

Statiska sidor är enkla HTML-filer som importeras som strängar.

### `src/views/static/header/index.html`

```html
<header>
    <h1>Simple SPA</h1>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>
```

### `src/views/static/home/index.html`

```html
<main>
    <h2>Home</h2>
    <p>Välkommen till startsidan</p>
</main>
```

### `src/views/static/footer/index.html`

```html
<footer>
    <p>Copyright 2025</p>
</footer>
```

**Notera:** Använd `?raw` när du importerar HTML-filer så att de importeras som strängar istället för att behandlas som moduler.

---

## Steg 5: Dynamiska Sidor

Dynamiska sidor skapas med TypeScript-funktioner som returnerar HTMLElement. I detta exempel använder vi **lokal state** för enkelhetens skull. I Steg 6 visar vi hur du kan använda **global state** istället.

### `src/views/about/index.ts` (med lokal state)

```typescript
export default function about() {
  let count = 1; // Lokal state

  // Skapa huvudcontainern
  const about = document.createElement("div");
  about.classList.add("about");
  
  // Sätt HTML-innehåll
  about.innerHTML = `
    <h2>Hur många båtar?</h2>
    <h2 id="boatHeading">⛵️</h2>
    <div class="buttons">
      <button id="incrementButton">Lägg till båtar</button>
      <button id="decrementButton">Ta bort båtar</button>
    </div>
  `;

  // Hämta referenser till element
  const boatHeading = about.querySelector<HTMLHeadingElement>("#boatHeading")!;
  const incrementButton = about.querySelector<HTMLButtonElement>("#incrementButton")!;
  const decrementButton = about.querySelector<HTMLButtonElement>("#decrementButton")!;

  // Funktion som uppdaterar båtvisningen
  const updateBoats = () => {
    boatHeading.innerHTML = 
      Array.from({ length: count }, (_) => "⛵️").join("") || "inga båtar";
    
    // Uppdatera disabled-state
    decrementButton.disabled = count === 0;
  };

  // Event listeners
  incrementButton.addEventListener("click", () => {
    count++;
    updateBoats();
  });

  decrementButton.addEventListener("click", () => {
    if (count > 0) {
      count--;
      updateBoats();
    }
  });

  // Initial uppdatering
  updateBoats();

  return about;
}
```

**Viktiga koncept:**
- `document.createElement()` - skapar nya DOM-element
- `querySelector<T>()` - hittar element med TypeScript-typing
- `addEventListener()` - lägger till event handlers
- Funktionen returnerar ett `HTMLElement` som kan injiceras i DOM:en

**Notera:** Med lokal state försvinner state när du navigerar bort från sidan. För att bevara state vid navigation, använd global state (se Steg 6).

---

## Steg 6: State Management

För mer komplexa applikationer kan du använda en enkel state management-lösning.

### `src/lib/store.ts`

```typescript
class Store {
  private state: { count: number };
  private renderCallback: (() => void) | null;

  constructor() {
    this.state = {
      count: 1,
    };
    this.renderCallback = null;
  }

  getCount() {
    return this.state.count;
  }

  setCount(newCount: number) {
    this.state.count = newCount;
    this.triggerRender();
  }

  setRenderCallback(renderApp: () => void) {
    this.renderCallback = renderApp;
  }

  triggerRender() {
    if (this.renderCallback) {
      this.renderCallback();
    }
  }
}

const store = new Store();

// Exportera bound methods
export const getCount = store.getCount.bind(store);
export const setCount = store.setCount.bind(store);
export const setRenderCallback = store.setRenderCallback.bind(store);
```

**Användning i `main.ts`:**

```typescript
import { setRenderCallback } from "./lib/store.ts";

// I renderApp-funktionen:
setRenderCallback(renderApp);
```

**Användning i komponenter (t.ex. `about/index.ts`):**

```typescript
import { getCount, setCount } from "../../lib/store.ts";

export default function about() {
  const about = document.createElement("div");
  about.classList.add("about");
  
  about.innerHTML = `
    <h2>how many boats?</h2>
    <h2 id="boatHeading">⛵️</h2>
    <div class="buttons">
      <button id="incrementButton">Add boats</button>
      <button id="decrementButton">Remove boats</button>
    </div>
  `;

  const boatHeading = about.querySelector<HTMLHeadingElement>("#boatHeading")!;
  const incrementButton = about.querySelector<HTMLButtonElement>("#incrementButton")!;
  const decrementButton = about.querySelector<HTMLButtonElement>("#decrementButton")!;

  // Funktion som uppdaterar UI baserat på global state
  const updateBoats = () => {
    const currentCount = getCount(); // Hämta från global state
    boatHeading.innerHTML = 
      Array.from({ length: currentCount }, (_) => "⛵️").join("") || "no boats";
    decrementButton.disabled = currentCount === 0;
  };

  // Event listeners - använder global state
  incrementButton.addEventListener("click", () => {
    const currentCount = getCount();
    setCount(currentCount + 1); // Uppdatera global state
    // renderApp() triggas automatiskt av setCount()
  });

  decrementButton.addEventListener("click", () => {
    const currentCount = getCount();
    if (currentCount > 0) {
      setCount(currentCount - 1); // Uppdatera global state
    }
  });

  updateBoats(); // Initial uppdatering
  return about;
}
```

**Fördelar med global state:**
- ✅ State delas mellan komponenter
- ✅ Automatisk re-rendering när state ändras
- ✅ Centraliserad state-hantering


---

## Steg 7: Styling

### `src/global.css` - Design System

Skapa ett design system med CSS-variabler:

```css
:root {
  /* Colors */
  --color-primary: #333;
  --color-background: #f0f0f0;
  --color-surface: #fff;
  --color-text: #333;
  --color-text-inverse: #fff;

  /* Typography */
  --font-family-base: Arial, sans-serif;
  --font-size-base: 1rem;

  /* Spacing */
  --spacing-md: 1rem;
  --spacing-xl: 2rem;

  /* Border Radius */
  --radius-md: 6px;
  --radius-xl: 12px;

  /* Shadows */
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}

* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-base);
  margin: 0;
  padding: 0;
  background-color: var(--color-background);
  color: var(--color-text);
}
```

### `src/style.css` - Huvudstilfil

```css
@import "./global.css";
@import "./views/about/style.css";
@import "./views/static/header/style.css";
@import "./views/static/footer/style.css";
@import "./views/static/home/style.css";
```

### Exempel: `src/views/static/header/style.css`

```css
header {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-md);
}

nav ul {
  display: flex;
  list-style: none;
  gap: var(--spacing-md);
}

nav a {
  color: var(--color-text-inverse);
  text-decoration: none;
}

nav a:hover {
  color: #ccc;
}
```

---

## 🚀 Kör projektet

```bash
# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Förhandsgranska produktionsbygg
npm run preview
```

---

## 📚 Sammanfattning

Du har nu byggt en fungerande SPA med:

✅ **Routing** - Hanterar olika routes utan sidladdning  
✅ **Statiska sidor** - Enkla HTML-sidor  
✅ **Dynamiska sidor** - TypeScript-komponenter med interaktivitet  
✅ **State Management** - Centraliserad state-hantering  
✅ **Styling** - Design system med CSS-variabler  

## 🎯 Nästa steg

- Lägg till fler routes och sidor
- Skapa återanvändbara komponenter
- Implementera mer avancerad state management
- Lägg till formulär och validering
- Integrera med API:er

---

## 💡 Tips

1. **TypeScript-typing:** Använd generiska typer som `querySelector<HTMLButtonElement>()` för bättre type safety
2. **Event delegation:** Använd `closest()` för att hantera dynamiskt skapade element
3. **CSS-variabler:** Använd design tokens för konsistent styling
4. **Modularitet:** Separera statiska och dynamiska sidor för bättre organisation

Lycka till med ditt SPA-projekt! 🎉

# simple-spa-ts
