import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import './AdminPanel.css';

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [newRecord, setNewRecord] = useState({
    item: '',
    class: '',
    description: '',
    containment: '',
    image: ''
  });
  const [editRecord, setEditRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // Function to add a new record
  const addItem = async () => {
    setLoading(true);
    await supabase.from('scp').insert([newRecord]);
    setItems([...items, newRecord]);
    setNewRecord({ item: '', class: '', description: '', containment: '', image: '' });
    setLoading(false);
    setMessage('New item added successfully!');
  };

  // Function to delete an item
  const deleteItem = async (id) => {
    setLoading(true);
    await supabase.from('scp').delete().eq('id', id);
    setItems(items.filter(item => item.id !== id)); // Update state without reload
    setLoading(false);
    setMessage('Item deleted successfully!');
  };

  // Function to start editing a record
  const startEditing = (item) => {
    setEditRecord(item);
  };

  // Function to save the updated record
  const saveEdit = async () => {
    setLoading(true);
    await supabase.from('scp').update(editRecord).eq('id', editRecord.id);
    setItems(items.map(item => (item.id === editRecord.id ? editRecord : item)));
    setEditRecord(null);
    setLoading(false);
    setMessage('Item updated successfully!');
  };

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

export default AdminPanel;
