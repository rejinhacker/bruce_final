import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import './Navmenu.css'; // Import the CSS for styling

function NavMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to toggle the menu's visibility on small screens
  const toggleMenu = () => {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('active');
  };

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('scp').select('id, item');

      if (error) {
        setError('Error fetching items');
        console.error('Error fetching items:', error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    };
    fetchItems();
  }, []);

  return (
    <nav className="nav-menu">
      <button className="menu-toggle" aria-label="Toggle Menu" onClick={toggleMenu}>
        ☰
      </button>
      <ul className="menu-list">
        {loading && <li>Loading...</li>}
        {error && <li>{error}</li>}
        {!loading && !error && (
          items.map((item) => (
            <li key={item.id}>
              <Link to={`/item/${item.id}`}>{item.item}</Link>
            </li>
          ))
        )}
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;
