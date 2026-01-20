// Import the React library
// This is necessary to use JSX syntax and React features in this component
import React from 'react';

// Define a functional component named Movie
// Functional components are a simple way to create React components
function Movie() {
  // The component returns JSX, which tells React what to render on the UI
  return (
    // A div with a className "App" is rendered
    // 'className' is used instead of 'class' in JSX to avoid conflicts with JavaScript keywords
    <div className="App"> 
      {/* This is the content inside the div. 
          It will display the text "Movie" on the page */}
      Movie
    </div>
  );
}

// Export the Movie component so it can be imported and used in other parts of the application
export default Movie;
