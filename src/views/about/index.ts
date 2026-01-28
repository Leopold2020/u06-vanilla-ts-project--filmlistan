// En enkel vy som visar en hårdkodad film med information om filmen.
// Använder typescript för att definiera filmens egenskaper.
// Använd Store klassen för att hantera state.

// const demoMovie: TMDBMovie = {
//   id: 566555,
//   title: "Cats",
//   overview:
//     "En grupp katter samlas för den årliga Jellicle-balen där en av dem ska väljas för ett nytt liv.",
//   posterPath: "/u5QrKhSCGoFsB8aAvZZJ1bBioYy.jpg",
//   releaseDate: "2019-12-19",
//   voteAverage: 4.4,
// };

export default function about() {
  const about = document.createElement("div");
  about.classList.add("about");

  about.innerHTML = `
   <h1>Projekt Filmlistan</h1>
   <h2>Skapare</h2>
   <ul>
     <li>Jesper Reijs</li>
     <li>Johan Norberg</li>
     <li>Oskar Svedlund</li>
     <li>Adrian Wawrzynowicz</li>
     <li>Begimai Satarova</li>
    </ul>
  `;


  return about;
}