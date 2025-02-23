import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Carousel from 'react-bootstrap/Carousel'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components for the form
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // For phone and email icons

function Contact() {
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setFormData((prevData)=>({...prevData,[name]:value}));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    // Pre-fill WhatsApp message content
    const whatsappMessage = `Hello Empire,\n\nHere are my details:\n- Name: ${name}\n- Email: ${email}\n- Phone: ${phone}\n- Message: ${message}`;
    const whatsappURL = `https://wa.me/9562420067?text=${encodeURIComponent(whatsappMessage)}`;
 // Redirect to WhatsApp
 window.open(whatsappURL, '_blank');
};

  return (
    <div>
           <Navbar expand="lg" className="custom-navbar">
      <div style={{ width: "100%" }}>
        {/* Logo Section */}
        <Navbar.Brand href="#home" className="logo-container">
          <img
            src="/logo/logo.jpg"
            width="60"
            height="60"
            className="logo"
            alt="React Bootstrap logo"
          />
          <span className="brand-name">Empire</span>
        </Navbar.Brand>
        
        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links-container">
            <Nav.Link href="/home" className="nav-link">Home</Nav.Link>
            <Nav.Link href="/about" className="nav-link">About Us</Nav.Link>
            <Nav.Link href="/service" className="nav-link">Services</Nav.Link>
            <Nav.Link href="/contact" className="nav-link">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
      {/* Carousel Section */}
      <div className="carousel-container">
        <Carousel fade>
          {/* Single Carousel Item */}
          <Carousel.Item>
            <img
              className="d-block w-100 full-image"
              src="/images/stage8.jpg" 
              alt="Slide"
              style={{
                height: '70vh', /* Adjust the height of the carousel */
                objectFit: 'cover', /* Ensure the image covers the area */
                objectPosition: 'center', /* Center the image */
              }}
            />
          
            <Carousel.Caption>
              <h3 className="carousel-title">Contact Us</h3>
              <p className="carousel-text">Need help planning your next event? Look no further than Empire Event Management Kerala!</p>
              <p className="carousel-text">We can provide everything you need to ensure your event is a success.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <section className="work-with-us-section" style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
      {/* Left Side Content */}
      <div className="left-side ShadeTwo" style={{ flex: 1, paddingRight: '20px' }}>
        {/* Logo and Brand */}
        <img
          src="/logo/logo.jpg"
          width="60"
          height="60"
          className="logo"
          alt="React Bootstrap logo"
        />
        <span className="brand-name" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '10px' }}>
          Empire
        </span>
         {/* Heading */}
         <h1>Want to Know About Us?</h1>
        
        {/* Contact Information */}
        <p><FaPhoneAlt /> Talk to Our Client Support Team: <strong>+91-9562-420-067</strong></p>
        <p><FaEnvelope /> Write to us about your needs: <strong>Empiremoment@gmail.com</strong></p>
      </div>

      {/* Right Side Form */}
      <div className="right-side ShadeTwo" style={{ flex: 1, paddingLeft: '20px' }}>
        <Form onSubmit={handleSubmit}>
          {/* Name Field */}
          <Form.Group controlId="formName" style={{ marginBottom: '10px' }}>
            
          <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
          </Form.Group>
              {/* Email Field */}
              <Form.Group controlId="formEmail" style={{ marginBottom: '10px' }}>
            
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
          </Form.Group>

          {/* Phone Field */}
          <Form.Group controlId="formPhone" style={{ marginBottom: '10px' }}>
           
          <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
          </Form.Group>

          {/* Message Field */}
          <Form.Group controlId="formMessage" style={{ marginBottom: '10px' }}>
            
          <Form.Control
                as="textarea"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />
          </Form.Group>
             {/* Submit Button */}
             <Button variant="primary" type="submit" style={{ width: '50%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </section>
    </div>
  );
}

export default Contact;
