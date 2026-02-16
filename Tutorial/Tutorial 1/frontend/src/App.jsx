// Import React
import React from 'react';

// Import routing components from react-router-dom
import { Routes, Route } from 'react-router-dom';

// Import page components
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

// Main App component
const App = () => {
  return (
    // Routes wrapper that contains all route definitions
    <Routes>
      {/* Home page route */}
      <Route path='/' element={<Home />} />

      {/* Create new book page */}
      <Route path='/books/create' element={<CreateBook />} />

      {/* Show book details page (dynamic id) */}
      <Route path='/books/details/:id' element={<ShowBook />} />

      {/* Edit book page (dynamic id) */}
      <Route path='/books/edit/:id' element={<EditBook />} />

      {/* Delete book confirmation page (dynamic id) */}
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

// Export App component
export default App;
