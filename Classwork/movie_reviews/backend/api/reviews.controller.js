import ReviewsDAO from '../dao/reviewsDAO.js'

// Controller class for handling review-related API requests
export default class ReviewsController {

  // POST /api/reviews
  // Creates a new review for a movie
  static async apiPostReview(req, res, next) {
    try {
      // Extract movie ID and review text from the request body
      const movieId = req.body.movie_id
      const review = req.body.review

      // Build user information object
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }

      // Get the current date/time for the review
      const date = new Date()

      // Insert the review into the database via the DAO
      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        review,
        date
      )

      // Return success response
      res.json({ status: "success" })
    } catch (e) {
      // Handle server/database errors
      res.status(500).json({ error: e.message })
    }
  }

  // PUT /api/reviews
  // Updates an existing review
  static async apiUpdateReview(req, res, next) {
    try {
      // Extract review ID and updated review text
      const reviewId = req.body.review_id
      const review = req.body.review

      // Get the current date/time for the update
      const date = new Date()

      // Update the review via the DAO
      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id, // Used to verify review ownership
        review,
        date
      )

      // Check for errors returned from the DAO
      var { error } = ReviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      // If no document was modified, user may not be the original author
      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review. User may not be original poster"
        )
      }

      // Return success response
      res.json({ status: "success" })
    } catch (e) {
      // Handle server/database errors
      res.status(500).json({ error: e.message })
    }
  }

  // DELETE /api/reviews
  // Deletes an existing review
  static async apiDeleteReview(req, res, next) {
    try {
      // Extract review ID and user ID from the request body
      const reviewId = req.body.review_id
      const userId = req.body.user_id

      // Delete the review via the DAO (user ID verifies ownership)
      const ReviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        userId
      )

      // Return success response
      res.json({ status: "success" })
    } catch (e) {
      // Handle server/database errors
      res.status(500).json({ error: e.message })
    }
  }
}
