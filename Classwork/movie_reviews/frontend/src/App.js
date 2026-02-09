// Import React
import React from 'react'

// React Router components for navigation and routing
import { Switch, Route, Link } from "react-router-dom"

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"

// Import application components
import AddReview from "./components/add-review"
import MoviesList from "./components/movies-list"
import Movie from "./components/movie"
import Login from "./components/login"

// React Bootstrap components for navigation UI
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Root application component
function App() {

  // Initialize user state from localStorage (persists login on refresh)
  const [user, setUser] = React.useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Login function: saves user to state and localStorage
  async function login(user = null) {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  // Logout function: clears user from state and localStorage
  async function logout() {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="App">

      {/* Navigation bar */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            {/* Movies link */}
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>

            {/* Login / Logout link */}
            <Nav.Link>
              {user ? (
                // Show logout if user is logged in
                <a onClick={logout} style={{ cursor: 'pointer' }}>
                  Logout {user.name}
                </a>
              ) : (
                // Show login if user is not logged in
                <Link to={"/login"}>Login</Link>
              )}
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Application routes */}
      <Switch>

        {/* Home and movies list */}
        <Route
          exact
          path={["/", "/movies"]}
          component={MoviesList}
        />

        {/* Add or edit a review */}
        <Route
          path="/movies/:id/review"
          render={(props) => (
            <AddReview {...props} user={user} />
          )}
        />

        {/* Movie detail page */}
        <Route
          path="/movies/:id/"
          render={(props) => (
            <Movie {...props} user={user} />
          )}
        />

        {/* Login page */}
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} login={login} />
          )}
        />

      </Switch>
    </div>
  );
}

// Export App component as the root of the application
export default App;
