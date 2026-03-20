// Import Next.js response helper for sending JSON responses
import { NextResponse } from "next/server";

// Import function to connect to MongoDB
import connectDB from "../../../lib/mongodb";

// Import the Book model (MongoDB collection schema)
import Book from "../../../models/Book";

// Handle GET requests to this API route
export async function GET(req) {
  // Connect to the database before making any queries
  await connectDB();

  // Extract search parameters from the request URL
  const { searchParams } = new URL(req.url);

  // Get the value of "query" from the URL (e.g. ?query=harry)
  const query = searchParams.get("query");

  // Search the database for books where the title matches the query
  // $regex allows partial matching
  // $options: "i" makes it case-insensitive
  const filteredBooks = await Book.find({
    title: { $regex: query, $options: "i" },
  });

  // Return the filtered books as a JSON response
  return NextResponse.json(filteredBooks);
}