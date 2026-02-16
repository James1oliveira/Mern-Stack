// Import components from react-router-dom to handle routing
import { Route, Routes } from "react-router-dom";

// Import the page components
import { Login, Signup } from "./pages"; // Login and Signup pages
import Home from "./pages/Home";         // Home page

// Main App component
function App() {
  return (
    <div className="App">
      {/* Define all routes for the application */}
      <Routes>
        {/* Route for home page */}
        <Route path="/" element={<Home />} />

        {/* Route for login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for signup page */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

// Export App component so it can be rendered in index.js
export default App;
