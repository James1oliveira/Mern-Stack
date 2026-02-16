// Import React hooks and libraries
import { useEffect, useState } from "react"; // useState for state, useEffect for side effects
import { useNavigate } from "react-router-dom"; // useNavigate to programmatically navigate
import { useCookies } from "react-cookie"; // useCookies to access and remove cookies
import axios from "axios"; // Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify"; // For popup notifications

const Home = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [cookies, removeCookie] = useCookies([]); // Get cookies and function to remove them
  const [username, setUsername] = useState(""); // State to store logged-in username

  // useEffect runs after component mounts
  useEffect(() => {
    const verifyCookie = async () => {
      // If no token cookie, redirect to login page
      if (!cookies.token) {
        navigate("/login");
        return; // Stop further execution
      }

      try {
        // Verify token with backend
        const { data } = await axios.post(
          "http://localhost:4000", // Backend endpoint
          {},                      // No body needed
          { withCredentials: true } // Include cookies in request
        );

        console.log("Response from server:", data); // Debug: log response

        const { status, user } = data; // Destructure response

        if (status) {
          setUsername(user); // Set username if verified
          toast(`Hello ${user}`, { // Show a welcome toast
            position: "top-right",
          });
        } else {
          removeCookie("token"); // Remove invalid token
          navigate("/login");    // Redirect to login page
        }
      } catch (error) {
        console.error("Error verifying cookie:", error); // Log any errors
        removeCookie("token"); // Remove token on error
        navigate("/login");    // Redirect to login page
      }
    };

    verifyCookie(); // Call the async function
  }, [cookies, navigate, removeCookie]); // Dependencies: re-run if these change

  // Logout function: remove token and redirect to signup page
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username || "Loading..."}</span> {/* Show username or Loading */}
        </h4>
        <button onClick={Logout}>LOGOUT</button> {/* Logout button */}
      </div>
      <ToastContainer /> {/* Container for toast notifications */}
    </>
  );
};

export default Home; // Export component to use in other parts of the app
