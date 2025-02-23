import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddList() {

     const [add,setadd]=useState([]); 
      const [loading, setLoading] = useState(true);
      const [editingAdd, setEditingAdd] = useState(null);
      const [newPrice, setNewPrice] = useState('');
    

      useEffect(() => {
        // Fetch the stage options from the server
        const fetchAddOptions = async () => {
          try {
            const response = await axios.get("http://localhost:3001/admin/Add");
            setadd(response.data); // Save the fetched data to state
            setLoading(false);
          } catch (error) {
            console.error("Error fetching stage options:", error);
            setLoading(false);
          }
        };
    
        fetchAddOptions();
      }, []);


      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/admin/Add/${id}`);
          // Remove the deleted stage from the state
          setadd(add.filter(adding => adding._id !== id));
        } catch (error) {
          console.error("Error deleting stage:", error);
        }
      };

      const handleEditPrice = async (id) => {
        if (!newPrice) return;
    
        try {
          const updatedAdd = await axios.put(`http://localhost:3001/admin/Add/${id}`, {
            price: newPrice,
          });
    
          // Update the price in the state
          setadd(add.map(adding =>
            adding._id === id ? { ...adding, price: updatedAdd.data.price } : adding
          ));
          setEditingAdd(null);
          setNewPrice('');
        } catch (error) {
          console.error("Error updating price:", error);
        }
      };
    
      if (loading) return <div>Loading...</div>;


  return (
    <div className="p-4 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {add.map((adding) => (
          <div key={adding._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{adding.name}</h3>
            <p>
              Price: ₹{editingAdd === adding._id ? (
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                adding.price
              )}
            </p>

            {editingAdd === adding._id ? (
              <button onClick={() => handleEditPrice(adding._id)} className="mt-2 p-2  text-white rounded bg-warning" >Save</button>
            ) : (
              <button onClick={() => setEditingAdd(adding._id)} className="mt-2 p-2 text-white rounded bg-success">Edit Price</button>
            )}

            <button onClick={() => handleDelete(adding._id)} className="mt-2 p-2  text-white rounded bg-danger">
              Delete
            </button>

           
          </div>
        ))}
      </div>
    </div>
  );
};
export default AddList
