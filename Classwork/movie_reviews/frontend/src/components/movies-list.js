// Import the React library
// This is required to use JSX syntax and React features in this component
import React from 'react';

// Define a functional component named MoviesList
// Functional components are a simple and common way to create React components
function MoviesList() {
  // The component returns JSX, which tells React what to render on the UI
  return (
    // A div with a className "App" is rendered
    // 'className' is used instead of 'class' in JSX to avoid conflicts with JavaScript keywords
    <div className="App"> 
      {/* This is the content inside the div. 
          It will display the text "Movies List" on the page */}
      Movies List
    </div>
  );
}

// Export the MoviesList component so it can be imported and used in other parts of the application
export default MoviesList;
