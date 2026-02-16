// Import React hooks
import React, { useEffect, useState } from 'react';

// Import axios for making HTTP requests
import axios from 'axios';

// Import loading spinner component
import Spinner from '../components/Spinner';

// Import Link for navigation without page reload
import { Link } from 'react-router-dom';

// Import icons
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

// Import components for displaying books
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

// Home page component
const Home = () => {
  // State to store books data
  const [books, setBooks] = useState([]);

  // State to control loading spinner
  const [loading, setLoading] = useState(false);

  // State to switch between table view and card view
  const [showType, setShowType] = useState('table');

  // useEffect runs once when the component mounts
  useEffect(() => {
    setLoading(true); // Show loading spinner

    // Fetch books from backend API
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        // Save books data to state
        setBooks(response.data.data);
        setLoading(false); // Hide loading spinner
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Hide loading spinner even if error occurs
      });
  }, []);

  return (
    <div className='p-4'>
      {/* Buttons to switch between Table and Card view */}
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      {/* Page heading and add-book button */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>

        {/* Link to create new book page */}
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {/* Show spinner while loading, otherwise show books */}
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        // Show books in table format
        <BooksTable books={books} />
      ) : (
        // Show books in card format
        <BooksCard books={books} />
      )}
    </div>
  );
};

// Export Home component
export default Home;
