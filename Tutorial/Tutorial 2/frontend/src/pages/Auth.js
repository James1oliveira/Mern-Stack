// Import React and Component class
import React, { Component } from 'react';

// Import CSS styling
import './Auth.css';

// Import authentication context
import AuthContext from '../context/auth-context';

class AuthPage extends Component {

  // Component state
  state = {
    isLogin: true // true = Login mode, false = Signup mode
  };

  // Allows us to use AuthContext inside this class
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    // Create references to access input values directly
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  // Switch between Login and Signup mode
  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  // Handle form submission
  submitHandler = event => {
    event.preventDefault(); // Prevent page reload

    // Get input values using refs
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    // Simple validation (prevent empty values)
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    // Default request body (Login query)
    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    // If in Signup mode, change request to CreateUser mutation
    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    }

    // FIX #1: Send request to backend running on port 8000
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody), // Convert body to JSON
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // Check if request was successful
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {

        // FIX #3: Only access login data if in login mode
        // On signup, resData.data.login does NOT exist
        if (this.state.isLogin && resData.data.login) {
          // Save token and userId in global AuthContext
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }

        // After successful signup, automatically switch to login mode
        if (!this.state.isLogin && resData.data.createUser) {
          this.setState({ isLogin: true });
        }
      })
      .catch(err => {
        // Handle errors
        console.log(err);
      });
  };

  render() {
    return (
      // Authentication form
      <form className="auth-form" onSubmit={this.submitHandler}>

        {/* Email input */}
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>

        {/* Password input */}
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>

        {/* Form buttons */}
        <div className="form-actions">
          <button type="submit">Submit</button>

          {/* Button to switch between Login and Signup */}
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>

      </form>
    );
  }
}

export default AuthPage;
