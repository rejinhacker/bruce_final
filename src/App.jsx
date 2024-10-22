import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Component Imports
import NavMenu from './src/NavMenu.jsx';
import ItemDetail from './ItemDetail';
import AdminPanel from './AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <NavMenu />  {/* Navigation menu consistently displayed */}
      <main>
        <Routes>
          {/* Home Route: Default landing page */}
          <Route path="/" element={<h1 className="welcome-message">Welcome to SCP CRUD Application</h1>} />

          {/* Item Detail Route: Shows details for a specific SCP item */}
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

export default App;
