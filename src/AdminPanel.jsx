import { useState, useEffect } from 'react';
import { supabase } from './supabase'; // Importing the Supabase client for interacting with the database
import './AdminPanel.css'; // Importing CSS for styling the Admin Panel

function AdminPanel() {
  const [items, setItems] = useState([]); // State for storing the list of items
  const [newRecord, setNewRecord] = useState({ // State for handling new item input
    item: '',
    class: '',
    description: '',
    containment: '',
    image: ''
  });
  const [editRecord, setEditRecord] = useState(null); // State for managing the item currently being edited
  const [loading, setLoading] = useState(false); // State to indicate loading processes
  const [message, setMessage] = useState(''); // State to store and display messages to the user

  // Fetch items from the database when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from('scp').select('*');
      if (error) {
        console.error(error);
      } else {
        setItems(data);
      }
    };
    fetchItems();
  }, []);

  // Function to add a new record to the database
  const addItem = async () => {
    setLoading(true);
    await supabase.from('scp').insert([newRecord]);
    setItems([...items, newRecord]); // Add the new record to the local state to avoid reloading
    setNewRecord({ item: '', class: '', description: '', containment: '', image: '' }); // Reset the form
    setLoading(false);
    setMessage('New item added successfully!');
  };

  // Function to delete an item from the database
  const deleteItem = async (id) => {
    setLoading(true);
    await supabase.from('scp').delete().eq('id', id);
    setItems(items.filter(item => item.id !== id)); // Update the local state to reflect the deletion
    setLoading(false);
    setMessage('Item deleted successfully!');
  };

  // Function to initiate editing of an existing record
  const startEditing = (item) => {
    setEditRecord(item); // Set the item to be edited
  };

  // Function to save an updated record to the database
  const saveEdit = async () => {
    setLoading(true);
    await supabase.from('scp').update(editRecord).eq('id', editRecord.id);
    setItems(items.map(item => (item.id === editRecord.id ? editRecord : item))); // Update the item in the local state
    setEditRecord(null); // Clear the edit state
    setLoading(false);
    setMessage('Item updated successfully!');
  };


  //This is what user sees
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {loading && <p>Loading...</p>}
      {message && <p className="message">{message}</p>}
      
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            {editRecord && editRecord.id === item.id ? (
              <>
                <input value={editRecord.item} onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })} />
                <input value={editRecord.class} onChange={(e) => setEditRecord({ ...editRecord, class: e.target.value })} />
                <input value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })} />
                <input value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditRecord(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{item.item}</p>
                <button onClick={() => startEditing(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Add New Record</h3>
      <div className="add-form">
        <input value={newRecord.item} onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })} placeholder="Item" />
        <input value={newRecord.class} onChange={(e) => setNewRecord({ ...newRecord, class: e.target.value })} placeholder="Class" />
        <input value={newRecord.description} onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })} placeholder="Description" />
        <input value={newRecord.containment} onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })} placeholder="Containment" />
        <input value={newRecord.image} onChange={(e) => setNewRecord({ ...newRecord, image: e.target.value })} placeholder="Image" />
        <button onClick={addItem}>Add New Item</button>
      </div>
    </div>
  );
}

export default AdminPanel; // Export the component for use in other parts of the application
