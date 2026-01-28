// API-anrop till TMDB API
import config from "../config";
import type { MovieListResponse, TMDBMovie } from "../types/movie";

// Helper function to convert raw TMDB movie to our TMDBMovie type
export function convertMovie(raw: any): TMDBMovie {
  return {
    id: raw.id,
    title: raw.title,
    overview: raw.overview,
    posterPath: raw.poster_path,
    releaseDate: raw.release_date,
    voteAverage: raw.vote_average,
  };
}

export async function getPopularMoviesTMDB(): Promise<MovieListResponse> {
  try {
    return new Promise<MovieListResponse>((resolve) => {
      fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const converted: MovieListResponse = {
            ...json,
            results: (json.results || []).map(convertMovie),
          };
          resolve(converted);
        });
    });
  } catch (error) {
    console.log(error);
    return { results: [], page: 0, total_pages: 0, total_results: 0 };
  }
}

export async function getMovies(search: string, currentPage: number = 1): Promise<MovieListResponse> {
  try {
    const settings = new URLSearchParams({
      query: search,
      language: "en-US",
      page: String(currentPage),
    });

    return new Promise<MovieListResponse>((resolve) => {
      fetch("https://api.themoviedb.org/3/search/movie?" + settings.toString(), {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          const converted: MovieListResponse = {
            ...json,
            results: (json.results || []).map(convertMovie),
          };
          resolve(converted);
        });
    });
  } catch (error) {
    console.log(error);
    return { results: [], page: 0, total_pages: 0, total_results: 0 };
  }
}

// export async function addToWatchlist(movie_id: number, watched: boolean) {
//   try {
//     const settings = {
//       media_type: "movie",
//       media_id: movie_id.toString(),
//       watchlist: watched.toString(),
//     };
//     return new Promise<void>(async (resolve) => {
//       await fetch(`https://api.themoviedb.org/3/account/${config.ACCOUNT_ID}/watchlist`, {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "content-type": "application/json",
//           Authorization: `Bearer ${config.API_KEY}`,
//         },
//         body: JSON.stringify(settings),
//       })
//         .then((response) => response.json())
//         .then((json) => {
//           localStorage.setItem(movie_id.toString(), JSON.stringify(watched));
//           resolve(json.success);
//         });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getWatchlist(): Promise<MovieListResponse> {
//   try {
//     const response = await fetch(`${config.BASE_URL}/account/${config.ACCOUNT_ID}/watchlist/movies?language=en-US&page=1`, {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${config.API_KEY}`,
//       },
//     });

//     const json = await response.json();

//     if (json && Array.isArray(json.results)) {
//       json.results.forEach((movie: any) => {
//         localStorage.setItem(movie.id.toString(), JSON.stringify(true));
//       });
//     } else {
//       json.results = [];
//     }

//     const converted: MovieListResponse = {
//       ...json,
//       results: (json.results || []).map(convertMovie),
//     };

//     return converted;
//   } catch (error) {
//     console.log(error);
//     return { results: [], page: 0, total_pages: 0, total_results: 0 };
//   }
// }

// export async function removeFromWatchlist(movie_id: number) {
//   const res = await fetch(`https://api.themoviedb.org/3/account/${config.ACCOUNT_ID}/watchlist`, {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//       Authorization: `Bearer ${config.API_KEY}`,
//     },
//     body: JSON.stringify({
//       media_type: "movie",
//       media_id: movie_id,
//       watchlist: false,
//     }),
//   });
//   return res.json();
// }

export async function getMovieById(movieId: number): Promise<TMDBMovie | null> {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    });
    const data = await response.json();
    
    return convertMovie(data);
  } catch (error) {
    console.log(error);
    return null;
  }
}
