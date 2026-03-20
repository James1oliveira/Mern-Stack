"use client"; // Enables use of React hooks (useState, useEffect) in this component

import { useState, useEffect } from "react";
import Link from "next/link"; // Used for navigation (external/internal links)
import LoadingPage from "../loading"; // Loading component shown while fetching data
import AddBook from "./AddBook"; // Component to add a new book

const Books = () => {
  // State to store list of books
  const [books, setBooks] = useState([]);

  // State to control loading spinner/page
  const [loading, setLoading] = useState(true);

  // State to store search query input
  const [query, setQuery] = useState("");

  // Function to fetch all books from API
  const fetchBooks = async () => {
    const res = await fetch("/api/books"); // GET request
    const books = await res.json(); // Convert response to JSON
    setBooks(books); // Update books state
    setLoading(false); // Stop loading
  };

  // Runs once when component mounts (like componentDidMount)
  useEffect(() => {
    fetchBooks();
  }, []);

  // If still loading, show loading component
  if (loading) {
    return <LoadingPage />;
  }

  // Handle search form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    setLoading(true); // Show loading while searching

    // Call search API with query parameter
    const res = await fetch(`/api/books/search?query=${query}`);
    const books = await res.json();

    setBooks(books); // Update results
    setLoading(false); // Stop loading
  };

  // Function to delete a book by ID
  const deleteBook = async (id) => {
    // Send DELETE request to API
    const res = await fetch(`api/books/${id}`, {
      method: "DELETE",
    });

    // Refresh book list after deletion
    fetchBooks();
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state as user types
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Add book component (passes fetchBooks to refresh list after adding) */}
      <AddBook refreshBooks={fetchBooks} />

      {/* Loop through books and display each one */}
      {books.map((book) => (
        <div key={book._id}>
          <div className="card w-96 bg-base-100 shadow-xl">
            
            {/* Book image */}
            <figure>
              <img src={book.img} width="200" height="150" />
            </figure>

            <div className="card-body">
              {/* Display book ID (could also use title instead) */}
              <h2 className="card-title">{book._id}</h2>

              {/* Book title */}
              <p>{book.title}</p>

              <div className="card-actions justify-end">
                {/* Link to Amazon (or external book link) */}
                <Link href={book.link} className="btn btn-primary">
                  See in Amazon
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => deleteBook(book._id)} // Calls delete function
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <br />
        </div>
      ))}
    </div>
  );
};

export default Books;