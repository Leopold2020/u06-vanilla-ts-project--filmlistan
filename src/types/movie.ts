export interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    posterPath: string | null;
    releaseDate: string;
    voteAverage: number;
  }

export interface MovieListResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface RawTMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  [key: string]: unknown;
}