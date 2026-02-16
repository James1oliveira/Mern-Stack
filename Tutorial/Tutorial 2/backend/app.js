// Import required packages
const express = require('express');            // Express framework for building the server
const bodyParser = require('body-parser');     // Middleware to parse incoming JSON requests
const graphqlHttp = require('express-graphql'); // Connects GraphQL with Express
const mongoose = require('mongoose');         // MongoDB object modeling tool
const cors = require('cors');                 // Allows cross-origin requests

// Import GraphQL schema and resolvers
const graphqlSchema = require('./graphql/schema/index.js');      // Defines GraphQL structure (types, queries, mutations)
const graphqlResolvers = require('./graphql/resolvers/index.js'); // Contains logic for handling GraphQL requests

// Import authentication middleware
const isAuth = require('./middleware/is-auth.js'); // Checks if user is authenticated

// Create Express app
const app = express();

// Parse incoming JSON request bodies
app.use(bodyParser.json());

// FIX #2: Enable CORS
// This allows your React frontend (running on port 3000) 
// to send requests to this backend server
app.use(cors());

// Run authentication middleware for every request
app.use(isAuth);

// Setup GraphQL endpoint
app.use(
  '/graphql', // All GraphQL requests go to this route
  graphqlHttp({
    schema: graphqlSchema,        // GraphQL schema definition
    rootValue: graphqlResolvers,  // Resolver functions
    graphiql: true                // Enables GraphiQL UI for testing in browser
  })
);

// Connect to MongoDB using environment variables
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@testcluster1.wxdgvkq.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`
  )
  .then(() => {
    // FIX #1: Run backend on port 8000
    // This matches the frontend fetch URLs
    console.log('Successfully connected to database and listening on port: 8000');
    
    // Start the server
    app.listen(8000);
  })
  .catch(err => {
    // If database connection fails, show error
    console.log('Error connecting to database: ' + err);
  });
