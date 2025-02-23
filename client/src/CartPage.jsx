import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./Logout.css"

function CartPage() {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || {};
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert("Razorpay is still loading. Please wait...");
      return;
    }

    // Create an order from backend
    const response = await fetch("http://localhost:3001/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: orderDetails.totalCost }),
    });

    const orderData = await response.json();
    if (!orderData.id) {
      alert("Error creating order");
      return;
    }

    // Razorpay options
    const options = {
      key: "rzp_test_ij6Cc2ZnU6RAhZ", // Replace with your Test Key
      amount: orderDetails.totalCost * 100, // Convert ₹ to paise
      currency: "INR",
      name: "Event Booking",
      description: "Event Payment",
      order_id: orderData.id, // Order ID from backend
      handler: function (response) {
        alert(`Payment Successful! Transaction ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="logout-container">
      <h1>Order Summary</h1>
      <p>Date: {orderDetails.date}</p>
      <p>Package Type: {orderDetails.packagetype}</p>
      <p>Food & Add-ons: {orderDetails.addOptions?.join(", ") || "None"}</p>
      <p>Stage: {orderDetails.stageOption?.price || "Not Selected"}</p>
      <p>Camera Package: {orderDetails.cameraPackage?.price || "Not Selected"}</p>
      <p>Setting: {orderDetails.settingOption?.price || "Not Selected"}</p>
      <p>Number of People: {orderDetails.numberOfPeople}</p>
      <h3>Total Cost: ₹{orderDetails.totalCost}</h3>

      <button className="red-button" onClick={handlePayment} disabled={!razorpayLoaded}>
        {razorpayLoaded ? "Proceed to Payment" : "Loading Payment..."}
      </button>

      <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item href="/home">🏠</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default CartPage;

