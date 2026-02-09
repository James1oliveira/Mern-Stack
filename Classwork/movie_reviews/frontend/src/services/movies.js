// Import axios for making HTTP requests to the backend API
import axios from "axios";

// Service class that handles all movie-related API calls
class MovieDataService {

  // Retrieve all movies (with optional pagination)
  getAll(page = 0) {
    return axios.get(
      `https://moviereviewsbackend-dj26.onrender.com/api/v1/movies?page=${page}`
    );
  }

  // Retrieve a single movie by its ID
  get(id) {
    return axios.get(
      `https://moviereviewsbackend-dj26.onrender.com/api/v1/movies/id/${id}`
    );
  }

  // Search for movies by a specific field (title or rating)
  // query = search value
  // by = field to search on (default: "title")
  // page = pagination index
  find(query, by = "title", page = 0) {
    return axios.get(
      `https://moviereviewsbackend-dj26.onrender.com/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  // Create a new review for a movie
  // data contains: review text, user info, and movie ID
  createReview(data) {
    return axios.post(
      "https://moviereviewsbackend-dj26.onrender.com/api/v1/movies/review",
      data
    );
  }

  // Update an existing movie review
  // data must include review_id along with updated review info
  updateReview(data) {
    return axios.put(
      "https://moviereviewsbackend-dj26.onrender.com/api/v1/movies/review",
      data
    );
  }

  // Delete a review
  // Requires both the review ID and the user ID for authorization
  deleteReview(id, userId) {
    return axios.delete(
      "https://moviereviewsbackend-dj26.onrender.com/api/v1/movies/review",
      {
        data: {
          review_id: id,
          user_id: userId
        }
      }
    );
  }

  // Retrieve all available movie ratings (used for filtering)
  getRatings() {
    return axios.get(
      "https://moviereviewsbackend-dj26.onrender.com/api/v1/movies/ratings"
    );
  }
}

// Export a single instance of the service (singleton pattern)
export default new MovieDataService();
