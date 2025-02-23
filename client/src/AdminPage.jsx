import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminPage.css'; // Import external CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './main.css';

function AdminPage() {
  return (
    
      <div className="admin-container Shading">
      <h1 className="admin-title">Admin Panel</h1>

    <div 
    
    className="d-flex flex-wrap gap-4 justify-content-center mt-4 admin-background"

  >
        {adminLinks.map((link, index) => (
          <Link to={link.path} key={index}className="p-3 text-center shadow-lg hover-effect"
          >
            <Card border={link.border} style={cardStyle} className="hover-effect">
              <Card.Header className="text-center fw-bold">{link.header}</Card.Header>
              <Card.Body>
                <Card.Title className="text-center">{link.title}</Card.Title>
                <Card.Text className="text-center"></Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
                   
                        
     
    </div>
    </div>
  );
}

const cardStyle = {
  width: '20rem',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
};

const adminLinks = [
  { path: '/order', border: 'warning', header: 'Orders', title: 'View Orders' },
  { path: '/admin', border: 'primary', header: 'ADD', title: 'Add Fields' },
  { path: '/stagelist', border: 'secondary', header: 'Stages', title: 'Edit and Delete Stages' },
  { path: '/addlist', border: 'success', header: 'AddOptions', title: 'Edit and Delete AddOptions' },
  { path: '/packlist', border: 'danger', header: 'Packages', title: 'Edit and Delete Packages' },
  { path: '/setting', border: 'info', header: 'Settings', title: 'Edit and Delete Settings' },
  { path: '/camera', border: 'dark', header: 'Camera', title: 'Edit and Delete Camera' },
];


export default AdminPage

