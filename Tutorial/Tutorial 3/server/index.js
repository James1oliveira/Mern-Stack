// Import required packages
const express = require("express");          // Web framework for Node.js
const mongoose = require("mongoose");        // MongoDB object modeling tool
const cors = require("cors");                // Enable Cross-Origin Resource Sharing
const cookieParser = require("cookie-parser"); // Parse cookies from requests
const authRoute = require("./Routes/AuthRoute"); // Authentication routes
require("dotenv").config();                  // Load environment variables from .env file

// Create an Express application
const app = express();

// Get environment variables
const { MONGO_URL, PORT } = process.env;

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URL)                         // Connect to MongoDB database
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));        // Log any connection errors

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Enable CORS so the frontend can communicate with the backend
app.use(
  cors({
    origin: ["http://localhost:3000"],        // Allow requests from React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],// Allowed HTTP methods
    credentials: true,                        // Allow cookies to be sent
  })
);

// Middleware
app.use(cookieParser());                      // Parse cookies from incoming requests
app.use(express.json());                     // Parse JSON request bodies

// Use authentication routes
app.use("/", authRoute);                     // Handle auth-related routes
