import React from 'react'
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Import application components
import AddReview from "./components/add-review"
import MoviesList from "./components/movies-list"
import Movie from "./components/movie"
import Login from "./components/login"

// Root component for the React application
function App() {

  // State to track the currently logged-in user
  const [user, setUser] = React.useState(null)

  // Sets the user state when logging in
  async function login(user = null) {
    setUser(user)
  }

  // Clears the user state when logging out
  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">

      {/* Navigation bar at the top of the app */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            {/* Link to movie list page */}
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>

            {/* Login / Logout link depending on user state */}
            <Nav.Link>
              {user ? (
                <a onClick={logout}>Logout User</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Application routes */}
      <Switch>

        {/* Home page and movies list */}
        <Route exact path={["/", "/movies"]} component={MoviesList}>
        </Route>

        {/* Add or edit a review for a specific movie */}
        <Route
          path="/movies/:id/review"
          render={(props) =>
            <AddReview {...props} user={user} />
          }
        >
        </Route>

        {/* Movie details page */}
        <Route
          path="/movies/:id/"
          render={(props) =>
            <Movie {...props} user={user} />
          }
        >
        </Route>

        {/* Login page */}
        <Route
          path="/login"
          render={(props) =>
            <Login {...props} login={login} />
          }
        >
        </Route>

      </Switch>
    </div>
  )
}

export default App
