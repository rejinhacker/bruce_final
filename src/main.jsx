// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.jsx'; // Import the main App component

// Create a root container where the React app will attach
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application in the root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
