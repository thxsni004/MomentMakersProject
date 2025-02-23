import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

 function Muslim() {
  return (
    <div className='Shadeone'>
   
       
          <Row xs={1} md={2} className="g-4">
      {/* First Card */}
      <Col>
        <Card>
          <Card.Img variant="top" src="muslimpack/bride3.jpg" alt="Card Image 1" />
          <Card.Body>
            <Card.Title>✨ Muslim Bride Wedding Packages ✨</Card.Title>
            <Card.Text>
              
            </Card.Text>
            <Link to="/mbride" className="btn btn-primary">
              Package
            </Link>
          </Card.Body>
        </Card>
      </Col>

 {/* Second Card */}
 <Col>
        <Card>
          <Card.Img variant="top" src="muslimpack/groom1.jpg" alt="Card Image 2" />
          <Card.Body>
            <Card.Title>✨ Muslim Groom Wedding Packages ✨</Card.Title>
            <Card.Text>
              
            </Card.Text>
            <Link to="/mgroom" className="btn btn-primary">
            Package
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
          {/* Breadcrumb with custom styling */}
   <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item href="/home">🏠</Breadcrumb.Item>
      </Breadcrumb>
    
    </div>
  )
}
export default Muslim;
