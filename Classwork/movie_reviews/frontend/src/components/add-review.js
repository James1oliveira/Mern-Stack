// Import React and the useState hook for managing component state
import React, { useState } from 'react'

// Service used to communicate with the backend API for movies/reviews
import MovieDataService from "../services/movies"

// Link is used for client-side navigation with React Router
import { Link } from "react-router-dom"

// React Bootstrap components for UI styling
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

// Functional component for adding or editing a review
const AddReview = props => {

  // Debugging logs to inspect props and routing info
  console.log("=== ADD REVIEW COMPONENT ===")
  console.log("Props:", props)
  console.log("User:", props.user)
  console.log("Movie ID:", props.match.params.id)

  // Flag to determine whether we are editing an existing review
  let editing = false

  // Initial value for the review text
  let initialReviewState = ""

  // If navigation state contains a current review, we are editing
  if (props.location.state && props.location.state.currentReview) {
    editing = true
    initialReviewState = props.location.state.currentReview.review
  }

  // State to store the review text
  const [review, setReview] = useState(initialReviewState)

  // State to track whether the review has been submitted
  const [submitted, setSubmitted] = useState(false)

  // Handler for textarea changes
  const onChangeReview = e => {
    const review = e.target.value
    setReview(review)
  }

  // Function to save or update a review
  const saveReview = () => {
    console.log("=== SAVING REVIEW ===")

    // Data object sent to the backend
    let data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: props.match.params.id
    }

    console.log("Review data:", data)

    // If editing, update an existing review
    if (editing) {
      data.review_id = props.location.state.currentReview._id
      console.log("Updating review...")

      MovieDataService.updateReview(data)
        .then(response => {
          console.log("Update response:", response.data)
          setSubmitted(true)
        })
        .catch(e => {
          console.error("Update error:", e)
        })
    }
    // Otherwise, create a brand new review
    else {
      console.log("Creating new review...")

      MovieDataService.createReview(data)
        .then(response => {
          console.log("Create response:", response.data)
          setSubmitted(true)
        })
        .catch(e => {
          console.error("Create error:", e)
        })
    }
  }

  return (
    // Container adds Bootstrap spacing and layout
    <Container className="mt-4">

      {/* If the review was submitted, show confirmation */}
      {submitted ? (
        <div>
          <h4>Review submitted successfully!</h4>
          <Link to={"/movies/" + props.match.params.id}>
            Back to Movie
          </Link>
        </div>
      ) : (
        <div>

          {/* If user is not logged in, prompt them to login */}
          {!props.user ? (
            <div>
              <h4>Please login to add a review</h4>
              <Link to="/login">Go to Login</Link>
            </div>
          ) : (
            // Review form for logged-in users
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  {editing ? "Edit" : "Create"} Review
                </Form.Label>

                {/* Textarea bound to review state */}
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  value={review}
                  onChange={onChangeReview}
                  placeholder="Write your review here..."
                />
              </Form.Group>

              {/* Submit button triggers saveReview */}
              <Button variant="primary" onClick={saveReview}>
                Submit
              </Button>
            </Form>
          )}
        </div>
      )}
    </Container>
  )
}

// Export component so it can be used elsewhere
export default AddReview
