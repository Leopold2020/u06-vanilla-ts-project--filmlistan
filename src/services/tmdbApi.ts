// API-anrop till TMDB API
import config from "../config";

export async function getPopularMoviesTMDB() {
  try {
    return new Promise<void>(async (resolve) => {
      await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMovies(search: string, currentPage: any) {
  try {
    const settings = new URLSearchParams({
      query: search,
      language: "en-US",
      page: currentPage ?? "1",
    });

    return new Promise<void>(async (resolve) => {
      await fetch("https://api.themoviedb.org/3/search/movie?" + settings.toString(), {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addToWatchlist(movie_id: number, watched: boolean) {
  try {
    const settings = {
      media_type: "movie",
      media_id: movie_id.toString(),
      watchlist: watched.toString(),
    };
    return new Promise<void>(async (resolve) => {
      await fetch(`https://api.themoviedb.org/3/account/${config.ACCOUNT_ID}/watchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
        body: JSON.stringify(settings),
      })
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem(movie_id.toString(), JSON.stringify(watched));
          resolve(json.success);
        });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getWatchlist() {
  try {
    const response = await fetch(`${config.BASE_URL}/account/${config.ACCOUNT_ID}/watchlist/movies?language=en-US&page=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    });

    const json = await response.json();

    if (json && Array.isArray(json.results)) {
      json.results.forEach((movie: any) => {
        localStorage.setItem(movie.id.toString(), JSON.stringify(true));
      });
    } else {
      json.results = [];
    }

    return json;
  } catch (error) {
    console.log(error);
  }
}

const exampleMovie = {
  adult: false,
  backdrop_path: "/4qCqAdHcNKeAHcK8tJ8wNJZa9cx.jpg",
  genre_ids: [12, 28, 878],
  id: 11,
  original_language: "en",
  original_title: "Star Wars",
  overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
  popularity: 21.5056,
  poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  release_date: "1977-05-25",
  title: "Star Wars",
  video: false,
  vote_average: 8.202,
  vote_count: 21805,
};

const exampleWatchlistEntry = {
  media_type: "movie",
  media_id: 11,
  watchlist: true,
};
