import { Router } from "express";
import config from "../../../src/config";

const router = Router();

// load watchlist from TMDB
router.get("/watchlist", async (req, res) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/account/${config.ACCOUNT_ID}/watchlist/movies?language=en-US&page=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    });

    const json = await response.json();

    if (!json || !Array.isArray(json.results)) {
      return res.json({ results: [] });
    }

    // resultat
    res.json({ results: json.results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cannot fetch watchlist from TMDB" });
  }
});

export default router;
