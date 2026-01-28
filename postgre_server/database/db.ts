import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new Pool({
  user: "movie_watch",
  password: process.env.USER_PASSWORD,
  host: "localhost",
  port: "5432",
  database: "u06",
});

export default db;