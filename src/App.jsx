// Import necessary elements from react-router-dom for routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import components to be used in routes
import NavMenu from './NavMenu';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';
import './App.css'; // Importing base styles for the application

function App() {
  return (
    <Router>
      <NavMenu />  {/* Navigation menu consistently displayed across all routes */}
      <main>
        {/* Routes define different views based on the path */}
        <Routes>
          {/* Home Route: Default landing page */}
          <Route path="/" element={<h1 className="welcome-message">Welcome to Rejin Application</h1>} />

          {/* Item Detail Route: Shows details for a specific SCP item identified by :id */}
          <Route path="/item/:id" element={<ItemDetail />} />

          {/* Admin Panel Route: Interface for managing SCP items */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* Fallback Route: Displays when no other routes match */}
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App; // Exporting App component for use in index.js
