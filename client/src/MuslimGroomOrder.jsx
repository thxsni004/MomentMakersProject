import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

function MuslimGroomOrder() {
      const [orders, setOrders] = useState([]); 
        
                 useEffect(() => {
                      const fetchOrders = async () => {
                        try {
                          const response = await fetch("http://localhost:3001/order/muslimgroom");
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
 <div  className="table-container">
                       <h2 className="orders-header text-center my-4">Hindu Groom Orders</h2>
                       <Table className="orders-table" striped bordered hover responsive>
                       <thead className="table-header">
                      <tr>  
                             <th>#</th>
                             <th>User Name</th>
                              <th>User Email</th>
                              <th>User Phone</th>
                             <th>Package Type</th>
                             <th>AddOptions</th>
                             <th>Stage</th>
                             <th>Camera Package</th>
                             <th>Setting Option</th>
                             <th>People</th>
                             <th>Total Cost</th>
                             <th>Order Date</th>
                           </tr>
                         </thead>
                         <tbody>
                           {orders.length > 0 ? (
                             orders.map((order, index) => (
                               <tr key={order._id}>
                                 <td>{index + 1}</td>
                                 <td>{order.username}</td>
                                   <td>{order.userphone}</td>
                                  <td>{order.userid}</td>
                                 <td>{order.packagetype}</td>
                                 <td>{order.addOptions.join(", ") || "None"}</td>
                                 <td>{order.stageOption ? order.stageOption.price : "None"}</td>
                                 <td>{order.cameraPackage ? order.cameraPackage.price : "None"}</td>
                                 <td>{order.settingOption ? order.settingOption.price:"None"}</td>
                                 <td>{order.numberOfPeople}</td>
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
                     </div>
    </div>
  )
}

export default MuslimGroomOrder
