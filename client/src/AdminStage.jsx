import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AdminStage = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStage, setEditingStage] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  

  useEffect(() => {
    // Fetch the stage options from the server
    const fetchStages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/admin/stages");
        setStages(response.data); // Save the fetched data to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stage options:", error);
        setLoading(false);
      }
    };

    fetchStages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/admin/stages/${id}`);
      // Remove the deleted stage from the state
      setStages(stages.filter(stage => stage._id !== id));
    } catch (error) {
      console.error("Error deleting stage:", error);
    }
  };

  const handleEditPrice = async (id) => {
    if (!newPrice) return;
  
    try {
      const { data } = await axios.put(`http://localhost:3001/admin/stages/${id}`, {
        price: newPrice,
      });
  
      setStages(prevStages =>
        prevStages.map(stage =>
          stage._id === id ? { ...stage, price: data.price } : stage
        )
      );
      setEditingStage(null);
      setNewPrice('');
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };
  

  if (loading) return <div >Loading...</div>;

  return (
  
    <div className="p-4 max-w-4xl mx-auto text-black ">
      <h1 className="text-3xl font-bold mb-6 text-center">Stage Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        {stages.map((stage) => (
          <div key={stage._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{stage.name}</h3>
            <p>
              Price: ₹{editingStage === stage._id ? (
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                stage.price
              )}

<br />
{editingStage === stage._id ? (
              <button onClick={() => handleEditPrice(stage._id)} className="mt-2 p-2  bg-warning rounded">Save</button>
            ) : (
              <button onClick={() => setEditingStage(stage._id)} className="mt-2 p-2 bg-success rounded">Edit Price</button>
            )}

            <button onClick={() => handleDelete(stage._id)} className="mt-2 p-2  bg-danger text-white rounded">
              Delete
            </button>
            </p>

          

            {/* {stage.image && (
              <img
                src={`http://localhost:3001/uploads/${stage.image}`}
                alt={stage.name}
                className="w-full h-auto rounded mt-4"
              />
            )} */}
           {stage.image && (
  <img
    src={`http://localhost:3001${stage.image}`}  // Ensure correct URL
    alt={stage.name}
    className="w-full h-auto rounded mt-4"
    onError={(e) => { e.target.src = "/fallback-image.jpg"; }} // Fallback if image fails
  />
)}





          </div>
        ))}
      </div>
    </div>
    
  );
};

export default AdminStage;
