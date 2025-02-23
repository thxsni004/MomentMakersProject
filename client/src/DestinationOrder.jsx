import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

function DestinationOrder() {
      const [orders, setOrders] = useState([]); 
    
             useEffect(() => {
                  const fetchOrders = async () => {
                    try {
                      const response = await fetch("http://localhost:3001/order/destination");
                      const data = await response.json();
                      setOrders(data);
                    } catch (error) {
                      console.error("Error fetching orders:", error);
                    }
                  };
              
                  fetchOrders();
                }, []); 
  return (
    <div>
      <Container>
                <h2 className="my-4 text-center">Destination Orders</h2>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Stage</th>
                      <th>Camera Package</th>
                      <th>Total Cost</th>
                      <th>Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order.stageOption ? order.stageOption.price : "None"}</td>
                          <td>{order.cameraPackage ? order.cameraPackage.price : "None"}</td>
     
                          
                          <td>₹{order.totalCost}</td>
                          <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No orders available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Container>
    </div>
  )
}

export default DestinationOrder
