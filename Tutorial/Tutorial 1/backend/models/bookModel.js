// Import mongoose to work with MongoDB
import mongoose from 'mongoose';

// Create a schema that defines the structure of a Book document
const bookSchema = mongoose.Schema(
  {
    // Book title (must be provided)
    title: {
      type: String,
      required: true,
    },

    // Book author name (must be provided)
    author: {
      type: String,
      required: true,
    },

    // Year the book was published (must be provided)
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create a Book model using the schema
// This model is used to interact with the "books" collection in MongoDB
export const Book = mongoose.model('Book', bookSchema);
