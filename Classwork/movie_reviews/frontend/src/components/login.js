// Import the React library
// This is necessary to use JSX syntax and React features in this component
import React from 'react';

// Define a functional component named Login
// Functional components are one of the ways to create components in React
function Login() {
  // The component returns JSX, which tells React what to render on the UI
  return (
    // A div with a className "App" is rendered
    // In JSX, we use 'className' instead of 'class' to avoid conflicts with JavaScript keywords
    <div className="App"> 
      {/* This is the content inside the div. 
          It will render the text "Login" on the page */}
      Login
    </div>
  );
}

// Export the Login component so it can be imported and used in other parts of the application
export default Login;
