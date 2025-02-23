import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PackageList() {

    const [packages, setpackages] = useState([]);
      const [loading, setLoading] = useState(true);
      const [editingPackage, setEditingPackage] = useState(null);
      const [newPrice, setNewPrice] = useState('');


      useEffect(() => {
        // Fetch the stage options from the server
        const fetchPackages = async () => {
          try {
            const response = await axios.get("http://localhost:3001/admin/packages");
            setpackages(response.data); // Save the fetched data to state
            setLoading(false);
        } catch (error) {
            console.error("Error fetching package options:", error);
            setLoading(false);
          }
        };
    
        fetchPackages();
      }, []);


      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/admin/packages/${id}`);
          // Remove the deleted package from the state
          setpackages(packages.filter(pkg => pkg._id !== id));
        } catch (error) {
          console.error("Error deleting stage:", error);
        }
      };

      const handleEditPrice = async (id) => {
        if (!newPrice) return;
    
        try {
          const updatedPackage = await axios.put(`http://localhost:3001/admin/packages/${id}`, {
            price: newPrice,
          });

 // Update the price in the state
 setpackages(packages.map(pkg =>
    pkg._id === id ? { ...pkg, price: updatedPackage.data.price } : pkg
  ));
  setEditingPackage(null);
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
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{pkg.name}</h3>
            <p>
              Price: ₹{editingPackage === pkg._id ? (
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                pkg.price
              )}

<br />
{editingPackage === pkg._id ? (
              <button onClick={() => handleEditPrice(pkg._id)} className="mt-2 p-2  text-white bg-warning rounded">Save</button>
            ) : (
              <button onClick={() => setEditingPackage(pkg._id)} className="mt-2 p-2 text-white bg-success rounded">Edit Price</button>
            )}

            <button onClick={() => handleDelete(pkg._id)} className="mt-2 p-2  text-white  bg-danger rounded">
              Delete
            </button>

            </p>

        

            {pkg.image && (
               <img
               src={`http://localhost:3001${pkg.image}`}  // Ensure correct URL
               alt={pkg.name}
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

export default PackageList
