// Import React hooks for state and lifecycle behavior
import React, { useState, useEffect } from 'react';

// Service for communicating with the movie API
import MovieDataService from "../services/movies";

// Link enables client-side navigation
import { Link } from "react-router-dom";

// React Bootstrap components for UI and layout
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

// Component that displays the list of movies and search filters
const MoviesList = props => {

  // State to store all movies returned from the API
  const [movies, setMovies] = useState([]);

  // State for search input (title)
  const [searchTitle, setSearchTitle] = useState("");

  // State for selected rating filter
  const [searchRating, setSearchRating] = useState("");

  // State to store available ratings for the dropdown
  const [ratings, setRatings] = useState(["All Ratings"]);

  // Fetch movies and ratings once when component mounts
  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  // Retrieve all movies from the backend
  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Retrieve all available movie ratings for dropdown
  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        console.log(response.data);
        // Add "All Ratings" option at the top
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Handle changes to title search input
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }

  // Handle changes to rating dropdown
  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  }

  // Generic find function used for both title and rating searches
  const find = (query, by) => {
    MovieDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Search movies by title
  const findByTitle = () => {
    find(searchTitle, "title");
  }

  // Search movies by rating
  const findByRating = () => {
    if (searchRating === "All Ratings") {
      // If "All Ratings" selected, reload all movies
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  }

  return (
    <div className="App">
      <Container>

        {/* Search form */}
        <Form>
          <Row>

            {/* Search by title */}
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>

            {/* Search by rating */}
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={onChangeSearchRating}
                >
                  {ratings.map(rating => {
                    return (
                      <option value={rating} key={rating}>
                        {rating}
                      </option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByRating}
              >
                Search
              </Button>
            </Col>

          </Row>
        </Form>

        {/* Display movie cards */}
        <Row>
          {movies.map((movie) => {
            return (
              <Col key={movie._id}>
                <Card style={{ width: '18rem' }}>

                  {/* Movie poster */}
                  <Card.Img src={movie.poster + "/100px180"} />

                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>

                    {/* Movie rating */}
                    <Card.Text>
                      Rating: {movie.rated}
                    </Card.Text>

                    {/* Short plot description */}
                    <Card.Text>{movie.plot}</Card.Text>

                    {/* Link to movie detail page */}
                    <Link to={"/movies/" + movie._id}>
                      View Reviews
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>

      </Container>
    </div>
  );
}

// Export component so it can be used in routing
export default MoviesList;
