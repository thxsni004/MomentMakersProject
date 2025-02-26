import React, { useEffect, useState } from "react";
import { Card, Button, Form, Modal, Row, Col } from "react-bootstrap";

const AdminStagePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", price: "", image: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);

  // Fetch Programs
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const response = await fetch("http://localhost:3001/stage-programs");
    const data = await response.json();
    setPrograms(data);
  };
    // Handle File Change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    

 // Handle Add / Edit
 const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("price", formData.price);
    if (file) {
      formDataToSend.append("image", file);
    }

    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:3001/admin/stage-programs/${editId}`
      : "http://localhost:3001/admin/stage-programs";

    await fetch(url, {
      method,
      body: formDataToSend,
    });

    setShowModal(false);
    setEditMode(false);
    fetchPrograms();
  };

  // Handle Delete
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/admin/stage-programs/${id}`, { method: "DELETE" });
    fetchPrograms();
  };

  // Open Edit Modal
  const handleEdit = (program) => {
    setFormData({ name: program.name, date: program.date, price: program.price });
    setEditId(program._id);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="">
      <h1>Admin - Manage Stage Programs</h1>
     <center><Button  onClick={() => setShowModal(true)}>Add New Program</Button></center> 


      <Row className="mt-3">
        {programs.map((program) => (
          <Col key={program._id} xs={1} sm={2} md={3} >
            <Card>
              <Card.Img variant="top" src={`http://localhost:3001/uploads/${program.image}`} />
              <Card.Body>
                <Card.Title>{program.name}</Card.Title>
                <Card.Text>Date: {program.date}</Card.Text>
                <Card.Text>Price: ₹{program.price}</Card.Text>
                <Button variant="warning" onClick={() => handleEdit(program)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(program._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

     {/* Add / Edit Modal */}
     <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Program" : "Add Program"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Program Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} accept="image/*,video/*" required />
            </Form.Group>
            <Button type="submit">{editMode ? "Update" : "Add"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminStagePrograms;
