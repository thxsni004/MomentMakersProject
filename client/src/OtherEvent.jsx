import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
 
const OtherEvent = () => {
    const [programs, setPrograms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [vipBooking, setVipBooking] = useState(false);
  // Get user details from session storage
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

 
  useEffect(() => {
    if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
      }

    fetchPrograms();
  }, [user]);

  const fetchPrograms = async () => {
    try {
      const response = await fetch("http://localhost:3001/stage-programs");
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };


const handleBook = async () => {
    const userDetails = JSON.parse(sessionStorage.getItem("user")); // Retrieve user from session

    if (!selectedProgram || !userDetails.id) {
      alert("User details not found. Please log in.");
      return;
    }
  
    console.log("Booking request:", { userId: userDetails.id, vipBooking });

    try {
      const response = await fetch(
        `http://localhost:3001/book-stage-program/${selectedProgram._id}`, // Ensure _id is used
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId :userDetails.id, // Ensure user._id is correctly stored in sessionStorage
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
    <div className="">
          <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item href="/home">🏠</Breadcrumb.Item>
        <Breadcrumb.Item href="/home">🔙 </Breadcrumb.Item>
      </Breadcrumb>
     <h1>Stage Programs</h1>
 
      <Row >
        {programs.map((program) => (
          <Col key={program._id} xs={1} sm={2} md={3} >
            <Card>
            <Card.Img variant="top" src={`http://localhost:3001/uploads/${program.image}`} alt={program.name} />

              <Card.Body>
                <Card.Title>{program.name}</Card.Title>
                <Card.Text>Date: {program.date}</Card.Text>
                <Card.Text>Price: ₹{program.price}</Card.Text>
                <Button onClick={() => { setSelectedProgram(program); setShowModal(true); }}>
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to book **{selectedProgram?.name}**?</p>
          <Form.Check 
            type="checkbox"
            label="VIP Booking (₹500 Extra)"
            onChange={(e) => setVipBooking(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleBook}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OtherEvent;
