import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

// Create a root for React 18 using the DOM element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render the React application
// BrowserRouter enables client-side routing throughout the app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
