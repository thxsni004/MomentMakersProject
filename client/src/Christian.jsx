import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';




 function Christian() {
  return (
    <div className='Shadeone'> 
       <div>
       <Row xs={1} md={2} className="g-4">
   {/* First Card */}
   <Col>
     <Card>
       <Card.Img variant="top" src="christian/bride2.jpg" alt="Card Image 1" />
       <Card.Body>
         <Card.Title>✨ Christian Bride Wedding Packages ✨</Card.Title>
         <Card.Text>
           
         </Card.Text>
         <Link to="/cbride" className="btn btn-primary">
           Package
         </Link>
       </Card.Body>
     </Card>
   </Col>

{/* Second Card */}
<Col>
     <Card>
       <Card.Img variant="top" src="christian/groom2.jpg" alt="Card Image 2" />
       <Card.Body>
         <Card.Title>✨ Christian Groom Wedding Packages ✨</Card.Title>
         <Card.Text>
           
         </Card.Text>
         <Link to="/cgroom" className="btn btn-primary">
         Package
         </Link>
       </Card.Body>
     </Card>
   </Col>
 </Row>

    {/* Breadcrumb with custom styling */}
    <Breadcrumb className="custom-breadcrumb">
       <center><Breadcrumb.Item href="/home">🏠 </Breadcrumb.Item></center> 
      </Breadcrumb>
   
 
 </div>
    </div>
  )
}
export default Christian;
