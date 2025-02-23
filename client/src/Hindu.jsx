import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


 function Hindu() {
  return (
    <div className='Shadeone'>
    <div>
      
          <Row xs={1} md={2} className="g-4">
      {/* First Card */}
      <Col>
        <Card>
          <Card.Img variant="top" src="hindupack/bride.jpg" alt="Card Image 1" />
          <Card.Body>
            <Card.Title>✨ Hindu Bride Wedding Packages ✨</Card.Title>
            <Card.Text>
              
            </Card.Text>
            <Link to="/bridepack" className="btn btn-primary">
              Package
            </Link>
          </Card.Body>
        </Card>
      </Col>

 {/* Second Card */}
 <Col>
        <Card>
          <Card.Img variant="top" src="hindupack/groom.jpg" alt="Card Image 2" />
          <Card.Body>
            <Card.Title>✨ Hindu Groom Wedding Packages ✨</Card.Title>
            <Card.Text>
              
            </Card.Text>
            <Link to="/groompack" className="btn btn-primary">
            Package
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </div>
      <Breadcrumb className="custom-breadcrumb">
    <Breadcrumb.Item href="/home">🏠</Breadcrumb.Item>
    </Breadcrumb></div>
    
  )
}
export default Hindu;
