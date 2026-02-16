// Import express framework to create the server
import express from 'express';

// Import environment variables (port and MongoDB URL)
import { PORT, mongoDBURL } from './config.js';

// Import mongoose to connect to MongoDB
import mongoose from 'mongoose';

// Import book routes
import booksRoute from './routes/booksRoute.js';

// Import CORS middleware to handle cross-origin requests
import cors from 'cors';

// Create an Express application
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow requests from all origins
app.use(cors());

// Option 2: Allow requests from specific origins only
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// Test route to check if the server is running
app.get('/', (request, response) => {
  console.log(request); // Log the incoming request
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

// Use book routes for all "/books" endpoints
app.use('/books', booksRoute);

// Connect to MongoDB using mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');

    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    // Log any database connection errors
    console.log(error);
  });
