import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from './supabase';
import './ItemDetail.css';

function ItemDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      const { data, error } = await supabase
        .from('scp')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to load item details');
        console.error(error);
      } else {
        setItemData(data);
      }
      setLoading(false);
    };
    fetchItemDetails();
  }, [id]);

  return (
    <div className="item-detail-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="item-detail">
          <h1>{itemData.item}</h1> {/* Display the SCP item number */}
          <h2>{itemData.class}</h2> {/* Display the SCP class */}
          <section>
            {itemData.image ? (
              <img src={itemData.image} alt={itemData.item} className="scp-image" />
            ) : (
              <p>No image available</p>
            )}
          </section>
          <section>
            <h3>Description</h3>
            <p>{itemData.description}</p> {/* Display the description */}
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

export default ItemDetail;
