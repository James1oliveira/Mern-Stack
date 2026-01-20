// Import the React library. 
// This is necessary to use JSX syntax and React features.
import React from 'react';

// Define a functional component called AddReview
// Functional components are one of the ways to define components in React
function AddReview() {
  // The component returns JSX, which describes what should be rendered on the UI
  return (
    // A div with a className "App" is returned
    // className is used instead of "class" in JSX to avoid conflicts with JavaScript keywords
    <div className="App"> 
      {/* This is the content inside the div. 
          It will render the text "Add Review" on the page */}
      Add Review
    </div>
  );
}

// Export the component so it can be imported and used in other parts of the application
export default AddReview;
