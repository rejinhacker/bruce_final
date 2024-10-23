// Importing necessary hooks and router link component
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook to access route parameters
import { supabase } from './supabase'; // Supabase client for API requests
import './ItemDetail.css'; // CSS for styling the component

function ItemDetail() {
  // Retrieve the 'id' from the URL parameters
  const { id } = useParams();
  // State for storing the item details
  const [itemData, setItemData] = useState(null);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to hold any errors
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch item details from the database
    const fetchItemDetails = async () => {
      // Query the 'scp' table in Supabase by 'id' and retrieve a single record
      const { data, error } = await supabase
        .from('scp')
        .select('*') // Select all fields
        .eq('id', id) // Filter for the correct 'id'
        .single(); // Expecting only one result

      if (error) {
        setError('Failed to load item details'); // Set error message if the query fails
        console.error(error);
      } else {
        setItemData(data); // Store the item data in state
      }
      setLoading(false); // Set loading to false once the data is fetched
    };
    fetchItemDetails();
  }, [id]); // Re-run the effect if 'id' changes


  //This is what user sees
  return (
    <div className="item-detail-container">
      {loading ? (
        <p>Loading...</p> // Display while the data is loading
      ) : error ? (
        <p className="error-message">{error}</p> // Display error message if an error occurred
      ) : (
        <div className="item-detail">
          <h1>{itemData.item}</h1> {/* Display the SCP item number */}
          <h2>{itemData.class}</h2> {/* Display the SCP class */}
          <section>
            {itemData.image ? (
              <img src={itemData.image} alt={itemData.item} className="scp-image" />
            ) : (
              <p>No image available</p> // Display if no image is available
            )}
          </section>
          <section>
            <h3>Description</h3>
            <p>{itemData.description}</p> {/* Display the description of the SCP item */}
          </section>
          
          <section>
            <h3>Containment</h3>
            <p>{itemData.containment}</p> {/* Display the containment information */}
          </section>
        
        </div>
      )}
    </div>
  );
}

export default ItemDetail; // Export the component for use in other parts of the application
