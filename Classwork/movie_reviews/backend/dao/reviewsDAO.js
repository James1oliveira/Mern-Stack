import mongodb from "mongodb"

// Extract ObjectId helper from MongoDB package
const ObjectId = mongodb.ObjectId

// Will hold the MongoDB reviews collection once connected
let reviews

// Data Access Object (DAO) for the reviews collection
export default class ReviewsDAO {

  // Injects the database connection into this DAO
  // Called once when the server starts
  static async injectDB(conn) {
    // If the collection is already initialized, do nothing
    if (reviews) {
      return
    }
    try {
      // Connect to the reviews collection in the specified namespace
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection('reviews')
    } catch (e) {
      // Log connection errors
      console.error(
        `unable to establish connection handle in reviewDAO: ${e}`
      )
    }
  }

  // Inserts a new review document into the database
  static async addReview(movieId, user, review, date) {
    try {
      // Construct the review document
      const reviewDoc = {
        name: user.name,           // Reviewer's name
        user_id: user._id,         // Reviewer's user ID
        date: date,                // Date the review was posted
        review: review,            // Review text
        movie_id: ObjectId(movieId) // Associated movie ID
      }

      // Insert the review into the collection
      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      // Handle insert errors
      console.error(`unable to post review: ${e}`)
      return { error: e }
    }
  }

  // Updates an existing review
  // Only allows updates by the original author
  static async updateReview(reviewId, userId, review, date) {
    try {
      // Update review text and date if user ID and review ID match
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) },
        { $set: { review: review, date: date } }
      )

      return updateResponse
    } catch (e) {
      // Handle update errors
      console.error(`unable to update review: ${e}`)
      return { error: e }
    }
  }

  // Deletes a review
  // Only allows deletion by the original author
  static async deleteReview(reviewId, userId) {
    try {
      // Delete the review if user ID and review ID match
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: userId
      })

      return deleteResponse
    } catch (e) {
      // Handle delete errors
      console.error(`unable to delete review: ${e}`)
      return { error: e }
    }
  }
}
