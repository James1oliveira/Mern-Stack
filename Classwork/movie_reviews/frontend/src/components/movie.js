// Import React hooks for state management and lifecycle behavior
import React, { useState, useEffect } from "react";

// Service used to fetch movies and manage reviews from the backend
import MovieDataService from "../services/movies";

// Used for navigation between routes
import { Link } from "react-router-dom";

// React Bootstrap components for layout and styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Library for formatting dates
import moment from "moment";

// Movie component displays movie details and reviews
const Movie = (props) => {

  // State to store movie data and its reviews
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  // Fetch a single movie by ID from the backend
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        // Update state with movie data
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Run when the component loads or when the movie ID changes
  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  // Delete a review and update state locally
  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        // Remove the deleted review from state without refetching
        setMovie((currState) => {
          currState.reviews.splice(index, 1);
          return {
            ...currState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container>

        {/* Layout row for poster and movie info */}
        <Row>

          {/* Movie poster column */}
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>

          {/* Movie details and reviews column */}
          <Col>

            {/* Movie info card */}
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>

                {/* Show Add Review link only if user is logged in */}
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>

            <br />
            <h2>Reviews</h2>
            <br />

            {/* Loop through and display each review */}
            {movie.reviews.map((review, index) => {
              return (
                <Card key={index}>
                  <Card.Body>

                    {/* Review author and formatted date */}
                    <h5>
                      {review.name + " reviewed on "}{" "}
                      {moment(review.date).format("Do MMMM YYYY")}
                    </h5>

                    {/* Review text */}
                    <p>{review.review}</p>

                    {/* Edit/Delete options only for the review owner */}
                    {props.user && props.user.id === review.user_id && (
                      <Row>

                        {/* Edit review link */}
                        <Col>
                          <Link
                            to={{
                              pathname:
                                "/movies/" + props.match.params.id + "/review",
                              state: { currentReview: review },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>

                        {/* Delete review button */}
                        <Col>
                          <Button
                            variant="link"
                            onClick={() =>
                              deleteReview(review._id, index)
                            }
                          >
                            Delete
                          </Button>
                        </Col>

                      </Row>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Export Movie component for use in routing
export default Movie;
