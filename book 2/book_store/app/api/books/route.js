// Import NextResponse to send HTTP responses in Next.js API routes
import { NextResponse } from "next/server";

// Import database connection function
import connectDB from "../../lib/mongodb";

// Import Book model (MongoDB schema)
import Book from "../../models/Book";

// GET request handler - used to fetch all books
export async function GET(req) {
  // Connect to the MongoDB database
  await connectDB();

  // Find all book documents in the database
  const books = await Book.find({});

  // Return the books as a JSON response
  return NextResponse.json(books);
}

// POST request handler - used to add a new book
export async function POST(req) {
  // Connect to the MongoDB database
  await connectDB();

  // Parse the incoming request body (JSON)
  const { title, link, img } = await req.json();

  // Create a new book document in the database
  const newBook = await Book.create({
    title,
    link,
    img,
  });

  // Return a success message as a JSON response
  return NextResponse.json("Book added successfully");
}