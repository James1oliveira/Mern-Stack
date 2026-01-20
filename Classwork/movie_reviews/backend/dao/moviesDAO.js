import mongodb from "mongodb"

// Extract ObjectId helper from MongoDB package
const ObjectId = mongodb.ObjectId

// Will hold the MongoDB movies collection once connected
let movies

// Data Access Object (DAO) for the movies collection
export default class MoviesDAO {

  // Injects the database connection into this DAO
  // Called once when the server starts
  static async injectDB(conn) {
    // If the collection is already set, do nothing
    if (movies) {
      return
    }
    try {
      // Connect to the movies collection in the specified namespace
      movies = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection('movies')
    } catch (e) {
      // Log connection errors
      console.error(`unable to connect in MoviesDAO: ${e}`)
    }
  }

  // Retrieves a list of movies with optional filters and pagination
  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20
  } = {}) {

    // MongoDB query object
    let query

    // Apply filters if provided
    if (filters) {
      // Full-text search by title
      if ("title" in filters) {
        query = { $text: { $search: filters['title'] } }
      }
      // Filter by movie rating
      else if ("rated" in filters) {
        query = { "rated": { $eq: filters['rated'] } }
      }
    }

    let cursor
    try {
      // Find movies matching the query with pagination
      cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page)

      // Convert cursor results to an array
      const moviesList = await cursor.toArray()

      // Get total number of matching movies
      const totalNumMovies = await movies.countDocuments(query)

      // Return both the movie list and total count
      return { moviesList, totalNumMovies }
    } catch (e) {
      // Handle query errors
      console.error(`Unable to issue find command, ${e}`)
      return { moviesList: [], totalNumMovies: 0 }
    }
  }

  // Retrieves a single movie by its ID
  // Also joins related reviews using an aggregation pipeline
  static async getMovieById(id) {
    try {
      return await movies
        .aggregate([
          {
            // Match the movie by its ObjectId
            $match: {
              _id: new ObjectId(id)
            }
          },
          {
            // Join reviews collection to include reviews for the movie
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'movie_id',
              as: 'reviews'
            }
          }
        ])
        .next() // Return the first (and only) matching document
    } catch (e) {
      // Log and rethrow errors
      console.error(`something went wrong in getMovieById: ${e}`)
      throw e
    }
  }

  // Retrieves all distinct movie ratings (e.g., G, PG, PG-13)
  static async getRatings() {
    let ratings = []
    try {
      // Get unique values from the "rated" field
      ratings = await movies.distinct("rated")
      return ratings
    } catch (e) {
      // Handle errors and return empty list
      console.error(`unable to get ratings, ${e}`)
      return ratings
    }
  }
}
