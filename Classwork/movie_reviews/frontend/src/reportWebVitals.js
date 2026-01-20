// Function for measuring and reporting web performance metrics
const reportWebVitals = onPerfEntry => {

  // Ensure a valid callback function is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {

    // Dynamically import the web-vitals library
    // This reduces bundle size by loading it only when needed
    import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {

        // Collect Core Web Vitals and pass results to the callback
        getCLS(onPerfEntry);   // Cumulative Layout Shift
        getFID(onPerfEntry);   // First Input Delay
        getFCP(onPerfEntry);   // First Contentful Paint
        getLCP(onPerfEntry);   // Largest Contentful Paint
        getTTFB(onPerfEntry);  // Time to First Byte
      }
    );
  }
};

// Export the function so it can be used elsewhere in the app
export default reportWebVitals;
