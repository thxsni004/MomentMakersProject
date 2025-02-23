
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const AdminPanel = () => {
  const [categories] = useState(["Muslim", "Christian", "Hindu"]);
  const [subCategories] = useState(["Bride", "Groom"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [formData, setFormData] = useState({ name: "", price: "", type: "stage", image: null, description: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && ["stage", "package", "settingoption"].includes(formData.type)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files ? files[0] : null,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
//gallery
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

 const navigate = useNavigate(); // Ensure useNavigate is inside Home
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubCategory) {
      alert("Please select a category and subcategory.");
      return;
    }

    console.log("Form Data before submission:", formData);

    let dataToSend;

    if (["stage", "package", "settingoption"].includes(formData.type)) {
      dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price);
      dataToSend.append("category", selectedCategory);
      dataToSend.append("subCategory", selectedSubCategory);
      dataToSend.append("type", formData.type);

      if (formData.image) {
        dataToSend.append("image", formData.image);
      }
    } else if (formData.type === "camera") {
      dataToSend = {
        name: formData.name,
        price: formData.price,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        type: formData.type,
        description: formData.description,
      };
    } else {
      dataToSend = {
        name: formData.name,
        price: formData.price,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        type: formData.type,
      };
    }

    try {
      let endpoint = formData.type === "stage" ? "stages" : 
      formData.type === "addoption" ? "Add" : 
      formData.type === "package" ? "packages" : 
      formData.type === "camera" ? "cameras" : "settings";

      await axios.post(`http://localhost:3001/admin/${endpoint}`, dataToSend, {
        headers: ["stage", "package", "settingoption"].includes(formData.type) 
          ? { "Content-Type": "multipart/form-data" } 
          : { "Content-Type": "application/json" },
      });

      setFormData({ name: "", price: "", type: "stage", image: null, description: "" });
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <div  className=" Shading"
    >
    <div className="p-4 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg bg-white text-black transition-all duration-300 ${selectedCategory === cat ? "opacity-75" : "hover:opacity-90"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {subCategories.map((sub) => (
          <button
            key={sub}
            className={`px-4 py-2 rounded-lg bg-white text-black transition-all duration-300 ${selectedSubCategory === sub ? "opacity-75" : "hover:opacity-90"}`}
            onClick={() => setSelectedSubCategory(sub)}
          >
            {sub}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded">
          <option value="stage">Stage</option>
          <option value="addoption">Add Option</option>
          <option value="package">Package</option>
          <option value="settingoption">Setting Option</option>
          <option value="camera">Camera</option>
        </select>
        {formData.type === "camera" && (
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded"></textarea>
        )}
        {["stage", "package", "settingoption"].includes(formData.type) && formData.type !== "camera" && (
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="border p-2 rounded" />
        )}
        <button type="submit" className="bg-white hover:opacity-90  text-black px-4 py-2 rounded-lg transition-all">
          Add Item
        </button><br /><br />
        
      </form>
      <h2 className="">Upload Success Event Photos/Videos</h2>
      <form onSubmit={handleUpload}>
        <input type="file" className="border p-2 rounded" onChange={handleFileChange} accept="image/*,video/*" required />
        <button type="submit " className="bg-white hover:opacity-90  text-black px-4 py-2 rounded-lg transition-all" >Upload</button>
        </form>

<br />
      <button className="custom-button"  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/stagelist');
  }} >See Stages</button>
<br /><br />
<button className="custom-button"  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/addlist');
  }} >See AddOptions</button>
<br /><br />
<button className="custom-button"  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/packlist');
  }} >See Packages</button>
<br /><br />
<button className="custom-button"  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/setting');
  }} >See Setting</button>
<br /><br />
<button className="custom-button"  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/camera');
  }} >See Camera</button>
    </div>
    </div>
  );
};

export default AdminPanel;
