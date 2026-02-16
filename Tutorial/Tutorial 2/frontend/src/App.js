// Import React and Component class
import React, { Component } from 'react';

// Import routing tools from react-router-dom
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Import pages
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';

// Import navigation component
import MainNavigation from './components/Navigation/MainNavigation';

// Import authentication context
import AuthContext from './context/auth-context';

// Import CSS styling
import './App.css';

class App extends Component {

  // Application state (stores authentication info)
  state = {
    token: null,   // JWT token (null = not logged in)
    userId: null   // Logged-in user ID
  };

  // Function to log user in
  // Saves token and userId in state
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  // Function to log user out
  // Clears token and userId from state
  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      // Enables routing in the app
      <BrowserRouter>
        <React.Fragment>

          {/* Provide authentication data to entire app */}
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >

            {/* Top navigation bar */}
            <MainNavigation />

            <main className="main-content">
              {/* Switch ensures only one route renders at a time */}
              <Switch>

                {/* If logged in, redirect "/" to "/events" */}
                {this.state.token && 
                  <Redirect from="/" to="/events" exact />
                }

                {/* If logged in, prevent access to auth page */}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" exact />
                )}

                {/* If NOT logged in, allow access to auth page */}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}

                {/* Events page is accessible to everyone */}
                <Route path="/events" component={EventsPage} />

                {/* Bookings page only accessible if logged in */}
                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}

                {/* If not logged in and trying to access protected route, redirect to auth */}
                {!this.state.token && 
                  <Redirect to="/auth" exact />
                }

              </Switch>
            </main>

          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
