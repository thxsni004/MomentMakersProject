import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";

import "./Main.css"

const ViewHistory = () => {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);

  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
});


useEffect(() => {
  if (user) {
      const storedHistory = JSON.parse(sessionStorage.getItem("orderHistory")) || [];
      const userOrders = storedHistory.filter(order => order.userid === user.email);

      const storedBookings = JSON.parse(sessionStorage.getItem("stageBookings")) || [];
      const userBookings = storedBookings.filter(booking => booking.userid === user.email);

      setOrderHistory([...userOrders, ...userBookings]); // Merge both histories
  }
}, [user]);

const handleBook = async () => {
  const userDetails = JSON.parse(sessionStorage.getItem("user")); 

  if (!selectedProgram || !userDetails) {
      alert("User details not found. Please log in.");
      return;
  }
  try {
    const response = await fetch(
        `http://localhost:3001/book-stage-program/${selectedProgram._id}`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userDetails.email, // Use email for identification
                vipBooking: vipBooking,
            }),
        }
    );

    const data = await response.json();
    if (response.ok) {
        alert("Booking confirmed!");
  // Retrieve existing bookings or initialize an empty array
  const existingBookings = JSON.parse(sessionStorage.getItem("stageBookings")) || [];

  // Save the new booking
  const newBooking = {
      userid: userDetails.email,
      programName: selectedProgram.name,
      date: selectedProgram.date,
      price: vipBooking ? selectedProgram.price + 500 : selectedProgram.price,
      vip: vipBooking ? "Yes" : "No"
  };
  sessionStorage.setItem("stageBookings", JSON.stringify([...existingBookings, newBooking]));

  setShowModal(false);
} else {
  alert(data.error || "Booking failed. Please try again.");
}
} catch (error) {
console.error("Booking failed:", error);
}
};
  return (
    <div className="p-4 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Your order History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " >
      {orderHistory.length > 0 ? (
    orderHistory.map((order, index) => (
        <Card key={index} style={{ marginBottom: "20px", padding: "10px" }}>
            <Card.Body>
                <Card.Title>Order #{index + 1}</Card.Title>
                <Card.Text><strong>Date:</strong> {order.date}</Card.Text>

                {order.programName ? (
                    // Stage Show Booking Details
                    <>
                        <Card.Text><strong>Program:</strong> {order.programName}</Card.Text>
                        <Card.Text><strong>VIP:</strong> {order.vip}</Card.Text>
                        <Card.Text><strong>Price:</strong> ₹{order.price}</Card.Text>
                    </>
                ) : (
                    // Wedding Event Booking Details
                    <>
                        <Card.Text><strong>Package:</strong> {order.packagetype}</Card.Text>
                        <Card.Text><strong>Stage:</strong> {order.stageOption?.price || "Not Selected"}</Card.Text>
                        <Card.Text><strong>Camera:</strong> {order.cameraPackage?.price || "Not Selected"}</Card.Text>
                        <Card.Text><strong>Setting:</strong> {order.settingOption?.price || "Not Selected"}</Card.Text>
                        <Card.Text><strong>Add-Ons:</strong> {Array.isArray(order.addOptions) ? order.addOptions.join(", ") : "None"}</Card.Text>
                        <Card.Text><strong>People Count:</strong> {order.numberOfPeople}</Card.Text>
                        <Card.Text><strong>Total Cost:</strong> ₹{order.totalCost}</Card.Text>
                    </>
                )}
            </Card.Body>
        </Card>
    ))
) : (
    <p>No booking history available.</p>
)}


      <center><Button variant="danger" onClick={() => {
        sessionStorage.removeItem("orderHistory");
        setOrderHistory([]);
      }}>
        Clear Order History
      </Button> </center><br />
      <center> <button className="red-button" onClick={() => navigate("/home")}>Back to Home</button></center>

    </div>
    </div>
  );
};

export default ViewHistory;



