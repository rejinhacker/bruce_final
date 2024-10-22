// Importing necessary hooks and router link component
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase'; // Importing the supabase client for database interaction
import './NavMenu.css'; // Importing the CSS for styling the navigation menu

function NavMenu() {
  // State for storing menu items, loading status, and potential errors
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to toggle the menu's visibility on small screens
  const toggleMenu = () => {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('active');
  };

  // useEffect hook to fetch items from the database when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      // Querying the 'scp' table in Supabase to fetch 'id' and 'item' fields
      const { data, error } = await supabase.from('scp').select('id, item');

      // Handling errors if the fetch fails
      if (error) {
        setError('Error fetching items');
        console.error('Error fetching items:', error);
      } else {
        // Setting the fetched items to state
        setItems(data || []);
      }
      // Setting loading to false after fetching is complete
      setLoading(false);
    };
    fetchItems();
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  return (
    <nav className="nav-menu">
      {/* Button to toggle the navigation menu visibility */}
      <button className="menu-toggle" aria-label="Toggle Menu" onClick={toggleMenu}>
        ☰
      </button>
      {/* List of navigation links */}
      <ul className="menu-list">
        {loading && <li>Loading...</li>} 
        {error && <li>{error}</li>}
        {!loading && !error && (
          items.map((item) => (
            <li key={item.id}>
              {/* Link to individual item details */}
              <Link to={`/item/${item.id}`}>{item.item}</Link>
            </li>
          ))
        )}
        {/* Permanent link to the Admin Panel */}
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu; // Exporting the NavMenu component for use in other parts of the application
