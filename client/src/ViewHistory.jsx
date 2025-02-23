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
  const storedHistory = JSON.parse(sessionStorage.getItem("orderHistory")) || [];
  if (user) {
      // Filter orders to show only the logged-in user's history
      const userOrders = storedHistory.filter(order => order.userid === user.email);
      setOrderHistory(userOrders);
  }
}, [user]);

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
              <Card.Text><strong>Package:</strong> {order.packagetype}</Card.Text>
              <Card.Text><strong>Stage:</strong> {order.stageOption?.price || "Not Selected"}</Card.Text>
              <Card.Text><strong>Camera:</strong> {order.cameraPackage?.price || "Not Selected"}</Card.Text>
              <Card.Text><strong>Setting:</strong> {order.settingOption?.price || "Not Selected"}</Card.Text>
              <Card.Text><strong>Add-Ons:</strong> {Array.isArray(order.addOptions) ? order.addOptions.join(", ") : "None"}</Card.Text>
              <Card.Text><strong>People Count:</strong> {order.numberOfPeople}</Card.Text>
              <Card.Text><strong>Total Cost:</strong> ₹{order.totalCost}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No order history available.</p>
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





//////////////
// import React, { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';
// import { useNavigate } from "react-router-dom";

// function ViewHistory() {
//     const navigate = useNavigate();
//     const [orderHistory, setOrderHistory] = useState([]);
//     const [user, setUser] = useState(() => {
//         return JSON.parse(sessionStorage.getItem("user")) || null;
//     });

//     useEffect(() => {
//         const storedHistory = JSON.parse(sessionStorage.getItem("orderHistory")) || [];
//         if (user) {
//             // Filter orders to show only the logged-in user's history
//             const userOrders = storedHistory.filter(order => order.userid === user.email);
//             setOrderHistory(userOrders);
//         }
//     }, [user]);

//     return (
//         <div>
//             <h2>Your Order History</h2>
//             {orderHistory.length > 0 ? (
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Package Type</th>
//                             <th>Additional Options</th>
//                             <th>Stage</th>
//                             <th>Camera Package</th>
//                             <th>Setting</th>
//                             <th>People</th>
//                             <th>Total Cost</th>
//                             <th>Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orderHistory.map((order, index) => (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{order.packagetype}</td>
//                                 <td>{order.addOptions.join(", ")}</td>
//                                 <td>{order.stageOption?.price || "N/A"}</td>
//                                 <td>{order.cameraPackage?.price || "N/A"}</td>
//                                 <td>{order.settingOption?.price || "N/A"}</td>
//                                 <td>{order.numberOfPeople}</td>
//                                 <td>₹{order.totalCost}</td>
//                                 <td>{order.date}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             ) : (
//                 <p>No order history found.</p>
//             )}
//             <button onClick={() => navigate("/")}>Back to Home</button>
//         </div>
//     );
// }

// export default ViewHistory;
