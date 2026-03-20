"use client"; // Marks this as a client component (required for hooks like useState)

import { useState } from "react";

// Component that allows adding a new book
const AddBook = ({ refreshBooks }) => {
  // State to control whether the modal is open or closed
  const [modalOpen, setModalOpen] = useState(false);

  // State to store the new book title entered by the user
  const [newBookTitle, setNewBookTitle] = useState("");

  // Function that runs when the form is submitted
  const handleSubmitNewBook = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Send POST request to API to create a new book
    const res = await fetch(`/api/books/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // Send book data as JSON
      body: JSON.stringify({
        title: newBookTitle,
        link: "https://www.amazon.com/dp/B0979MGJ5J", // Hardcoded link
        img: "https://via.placeholder.com/600/92c952", // Placeholder image
      }),
    });

    // If request was successful
    if (res.ok) {
      setNewBookTitle(""); // Clear input field
      setModalOpen(false); // Close modal
      refreshBooks(); // Refresh book list in parent component
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add Book
      </button>

      {/* Modal dialog (opens when modalOpen is true) */}
      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        {/* Form inside modal */}
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmitNewBook}
        >
          {/* Close button (top-right corner) */}
          <button
            onClick={() => setModalOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          {/* Modal title */}
          <h3 className="font-bold text-lg">Add New Book</h3>

          {/* Input field for book title */}
          <input
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)} // Update state on typing
            placeholder="Enter New Book Title"
            className="input input-bordered w-full max-w-xs"
          />

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default AddBook;