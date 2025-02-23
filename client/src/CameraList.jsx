import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CameraList() {

    const [camera, setcamera] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCamera, setEditingCamera] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
      // Fetch the stage options from the server
      const fetchCamera = async () => {
        try {
          const response = await axios.get("http://localhost:3001/admin/cameras");
          setcamera(response.data); // Save the fetched data to state
          setLoading(false);
      } catch (error) {
          console.error("Error fetching setting options:", error);
          setLoading(false);
        }
      };
  
      fetchCamera();
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/admin/cameras/${id}`);
          // Remove the deleted package from the state
          setcamera(camera.filter(cam => cam._id !== id));
        } catch (error) {
          console.error("Error deleting camera:", error);
        }
      };
      const handleEditPrice = async (id) => {
        if (!newPrice) return;
    
        try {
          const updatedCamera = await axios.put(`http://localhost:3001/admin/cameras/${id}`, {
            price: newPrice,
          });
 // Update the price in the state
 setcamera(camera.map(cam =>
    cam._id === id ? { ...cam, price: updatedCamera.data.price } : cam 
    ));
   setEditingCamera(null);
   setNewPrice('');
 } catch (error) {
   console.error("Error updating price:", error);
}
};

if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Camera Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camera.map((cam) => (
          <div key={cam._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{cam.name}</h3>
            <p>
              Price: ₹{editingCamera === cam._id ? (
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                cam.price
              )}
            </p>

            {editingCamera=== cam._id ? (
              <button onClick={() => handleEditPrice(cam._id)} className="mt-2 p-2  text-white bg-warning rounded">Save</button>
            ) : (
              <button onClick={() => setEditingCamera(cam._id)} className="mt-2 p-2 text-white bg-success rounded" >Edit Price</button>
            )}

            <button onClick={() => handleDelete(cam._id)} className="mt-2 p-2  text-white bg-danger rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CameraList
