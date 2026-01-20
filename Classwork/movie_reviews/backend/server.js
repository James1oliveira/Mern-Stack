import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

// Create an Express application instance
const app = express()

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Parse incoming JSON request bodies
app.use(express.json())

// Register movie-related API routes
// All routes in movies.route.js will be prefixed with /api/v1/movies
app.use("/api/v1/movies", movies)

// Catch-all 404 handler for undefined routes
// This middleware must be registered last
app.use((req, res) => {
  res.status(404).json({ error: "not found" })
})

// Export the app for use in other files (e.g., index.js)
export default app
