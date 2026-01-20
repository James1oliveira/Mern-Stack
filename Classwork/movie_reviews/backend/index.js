import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

// Main application startup function
async function main() {

  // Load environment variables from .env file
  dotenv.config()

  // Create a new MongoDB client using the connection URI
  const client = new mongodb.MongoClient(
    process.env.MOVIEREVIEWS_DB_URI
  )

  // Define the server port (default: 8000)
  const port = process.env.PORT || 8000

  try {
    // Connect to the MongoDB cluster
    await client.connect()

    // Inject the database connection into DAOs
    // This allows DAOs to access the database collections
    await MoviesDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)

    // Start the Express server
    app.listen(port, () => {
      console.log('server is running on port: ' + port)
    })
  } catch (e) {
    // Log startup errors and exit the process
    console.error(e)
    process.exit(1)
  }
}

// Execute the main function and catch any unhandled errors
main().catch(console.error)
