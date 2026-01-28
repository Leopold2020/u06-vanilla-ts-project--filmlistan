import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import db from "./database/db"
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.post("/test", async (request, response) => {
    try {
        const test = request.body
        console.log(test)
        response.json(test)
    } catch (error) {
        console.error(error)
    }    
});

app.post("/test/add", async (request, response) => {
    try {
        const test = request.body

        return await db.query(`INSERT INTO test(name) VALUES('${test.name}')`)
        .then(() => {
            response.sendStatus(200)
        })
    } catch (error) {
        response.sendStatus(400)
        console.error(error)
    }
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

import moviesRouter from "./components/movies.js";
import watchlistRouter from "./components/watchlist.js";

// Routes
app.use("/api/movies", moviesRouter);
app.use("/api", watchlistRouter);

// Health check-endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Movie API is running",
    timestamp: new Date().toISOString(),
  });
});

// Health check-endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Movie API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root-endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Movie Watchlist API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      movies: {
        getAll: "GET /api/movies",
        getFiltered: "GET /api/movies?status=watchlist|watched",
        getOne: "GET /api/movies/:id",
        create: "POST /api/movies",
        update: "PUT /api/movies/:id",
        delete: "DELETE /api/movies/:id",
        stats: "GET /api/movies/user/stats",
      },
    },
  });
});

// 404-hanterare (okänd route)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.path}`,
    hint: "Check the API documentation for available endpoints",
  });
});

// Felhanterare (serverfel)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Starta servern
app.listen(PORT, () => {
  console.log("");
  console.log("╔════════════════════════════════════════╗");
  console.log("║     🎬 Movie Watchlist API Server     ║");
  console.log("╚════════════════════════════════════════╝");
  console.log("");
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
  console.log(`✓ API docs: http://localhost:${PORT}/`);
  console.log("");
  console.log("Available endpoints:");
  console.log("  GET    /api/movies              - Get all movies");
  console.log("  GET    /api/movies/:id          - Get specific movie");
  console.log("  GET    /api/movies/user/stats   - Get user statistics");
  console.log("  POST   /api/movies              - Add new movie");
  console.log("  PUT    /api/movies/:id          - Update movie");
  console.log("  DELETE /api/movies/:id          - Delete movie");
  console.log("");
});