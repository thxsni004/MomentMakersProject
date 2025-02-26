import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function Orders() {
  const navigate = useNavigate();

  const categories = [
    { name: "Hindu Bride", path: "/orders/hindubride", color: "#6a0572" },
    { name: "Hindu Groom", path: "/orders/hindugroom", color: "#ff9f1c" },
    { name: "Muslim Bride", path: "/orders/muslimbride", color: "#a0c4ff" },
    { name: "Muslim Groom", path: "/orders/muslimgroom", color: "#00a896" },
    { name: "Christian Bride", path: "/orders/christianbride", color: "#f4a261" },
    { name: "Christian Groom", path: "/orders/christiangroom", color: "#e76f51" },
    // { name: "Destination", path: "/orders/destination", color: "#6a0572" },
  ];


  return (
    <div className="cover Shading">
    <div 
    
    className="  d-flex flex-wrap gap-4 justify-content-center mt-4 admin-background"

 
  >
 <Container  >
        <h2 className="text-center mb-4 text-light">Orders</h2>
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card
                className="p-3 text-center shadow-lg hover-effect"
                onClick={() => navigate(category.path)}
                style={{
                  cursor: "pointer",
                  backgroundColor: category.color,
                  borderRadius: "15px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: "#fff" }}>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </div>
  );
}

export default Orders;


