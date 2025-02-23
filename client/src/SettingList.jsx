import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SettingList() {

    const [setting, setsetting] = useState([]);
          const [loading, setLoading] = useState(true);
          const [editingSetting, setEditingSetting] = useState(null);
          const [newPrice, setNewPrice] = useState('');

          useEffect(() => {
            // Fetch the stage options from the server
            const fetchsettings = async () => {
              try {
                const response = await axios.get("http://localhost:3001/admin/settings");
                setsetting(response.data); // Save the fetched data to state
                setLoading(false);
            } catch (error) {
                console.error("Error fetching settings options:", error);
                setLoading(false);
              }
            };
        
            fetchsettings();
          }, []);

          const handleDelete = async (id) => {
            try {
              await axios.delete(`http://localhost:3001/admin/settings/${id}`);
              // Remove the deleted package from the state
              setsetting(setting.filter(set => set._id !== id));
            } catch (error) {
              console.error("Error deleting stage:", error);
            }
          };

          const handleEditPrice = async (id) => {
            if (!newPrice) return;
        
            try {
              const updatedSettings = await axios.put(`http://localhost:3001/admin/settings/${id}`, {
                price: newPrice,
              });
    
     // Update the price in the state
  setsetting(setting.map(set =>
    set._id === id ? { ...set, price: updatedSettings.data.price } : set 
    ));
   setEditingSetting(null);
   setNewPrice('');
 } catch (error) {
   console.error("Error updating price:", error);
}
};

if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Package Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        {setting.map((set) => (
          <div key={set._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{set.name}</h3>
            <p>
              Price: ₹{editingSetting === set._id ? (
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                set.price
              )}

{editingSetting=== set._id ? (
              <button onClick={() => handleEditPrice(set._id)} className="mt-2 p-2  text-white bg-warning rounded">Save</button>
            ) : (
              <button onClick={() => setEditingSetting(set._id)} className="mt-2 p-2 text-white bg-success rounded">Edit Price</button>
            )}

            <button onClick={() => handleDelete(set._id)} className="mt-2 p-2  text-white bg-danger rounded">
              Delete
            </button>


            </p>

         


            {set.image && (
              <img
              src={`http://localhost:3001${set.image}`}  // Ensure correct URL
              alt={set.name}
              className="w-full h-auto rounded mt-4"
              onError={(e) => { e.target.src = "/fallback-image.jpg"; }} // Fallback if image fails
            />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingList
