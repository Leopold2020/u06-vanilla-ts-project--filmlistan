CREATE DATABASE u06;

\c u06;

CREATE TABLE IF NOT EXISTS movies(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tmdb_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    poster_path TEXT,
    release_date TEXT,
    vote_average REAL,
    overview TEXT,
    status TEXT NOT NULL CHECK(status IN ('watchlist', 'watched')),
    personal_rating INTEGER CHECK(personal_rating BETWEEN 1 AND 5),
    review TEXT,
    is_favorite INTEGER DEFAULT 0,
    date_added TEXT DEFAULT CURRENT_DATE,
    date_watched TEXT,
    UNIQUE(tmdb_id)
);
