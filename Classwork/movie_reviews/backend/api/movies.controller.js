import MoviesDAO from '../dao/moviesDAO.js'

// Controller class for handling movie-related API requests
export default class MoviesController {

  // GET /api/movies
  // Retrieves a paginated list of movies with optional filters
  static async apiGetMovies(req, res, next) {

    // Number of movies per page (default: 20)
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20

    // Page number (default: 0)
    const page = req.query.page ? parseInt(req.query.page) : 0

    // Object to store optional query filters
    let filters = {}

    // Filter movies by rating if provided
    if (req.query.rated) {
      filters.rated = req.query.rated
    }
    // Otherwise, filter movies by title if provided
    else if (req.query.title) {
      filters.title = req.query.title
    }

    // Fetch movies and total count from the DAO
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage
    })

    // Structure the API response
    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies
    }

    // Send response as JSON
    res.json(response)
  }

  // GET /api/movies/:id
  // Retrieves a single movie by its ID
  static async apiGetMovieById(req, res, next) {
    try {
      // Extract movie ID from request parameters
      let id = req.params.id || {}

      // Fetch movie details from the DAO
      let movie = await MoviesDAO.getMovieById(id)

      // If no movie is found, return 404
      if (!movie) {
        res.status(404).json({ error: "not found" })
        return
      }

      // Return the movie data
      res.json(movie)
    } catch (e) {
      // Log error and return server error response
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  // GET /api/movies/ratings
  // Retrieves a list of all available movie ratings
  static async apiGetRatings(req, res, next) {
    try {
      // Fetch ratings from the DAO
      let propertyTypes = await MoviesDAO.getRatings()

      // Return ratings as JSON
      res.json(propertyTypes)
    } catch (e) {
      // Log error and return server error response
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}
