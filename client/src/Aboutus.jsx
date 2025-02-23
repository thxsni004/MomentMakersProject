import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Carousel from 'react-bootstrap/Carousel'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button } from 'react-bootstrap'; // Import Bootstrap components for the form
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // For phone and email icons
import './Aboutus.css'; 


 function Aboutus() {
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
              src="/images/stage3.jpg" 
              alt="Slide"
              style={{
                height: '70vh', /* Adjust the height of the carousel */
                objectFit: 'cover', /* Ensure the image covers the area */
                objectPosition: 'center', /* Center the image */
              }}
            />
          
            <Carousel.Caption>
              <h3 className="carousel-title">About Empire Event Management</h3>
              <p className="carousel-text">Need help planning your next event? Look no further than Empire Event Management Kerala!</p>
              <p className="carousel-text">We can provide everything you need to ensure your event is a success.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="about-us-container">
      <section className="work-with-us-section" style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
      {/* Left Side Content */}
      <div className="left-side" style={{ flex: 1, paddingRight: '20px' }}>
        {/* Logo and Brand */}
        <img
          src="/logo/logo.jpg"
          width="60"
          height="60"
          className="logo"
          alt="React Bootstrap logo"
        />
        <span className="brand-name" id='head' style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '10px' }}>
          Empire Event Management
        </span>
         {/* Heading */}
         
        
        
      </div>

      {/* Right Side Form */}
      <div className="right-side" style={{ flex: 1, paddingLeft: '20px' }}>
        <div>
         <h1 id='head'>Welcome to Empire Event Management Company</h1>
         <p id='par'>We are an ISO 9001:2015-certified event management company in Kerala with over 15+ years of experience in the field. Our Empire Company specializes in weddings and a variety of other corporate and private events, creating lasting memories for countless clients in the Malayalee community and those seeking Kerala destination weddings. Empire Event Management has successfully planned over 550 weddings, 70 corporate events, 20 inaugurations, and 150 other private events over the past decade, up to 2025. Additionally, the brand name Empire Event Management is often referred to interchangeably as Empire Events by the company and people in Kerala. Empire Events is primarily used as an informal or short name for the company; however, our official name remains Empire Event Management. We mainly serve in God’s Own Country as a specialized event management company for Kerala events.</p>
         <p id='par'>In 2008, our venture was initiated in Kuriachira, Thrissur. At first, we handled event management tasks mostly in the limited regions close to Thrissur and its surroundings. What started as a small firm has now expanded into a multi-locality event management service in Kerala. Our hard work has enabled us to step out of the neighborhoods of Thrissur to the popular territories of Thrissur and Cochin. Today, Empire Events is strongly represented in Thrissur, Calicut, and Kochi –  the four most dynamic cities of Kerala.</p>
        </div>
      </div>
    </section>
    
    <section className="work-with-us-section" style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
      {/* Left Side Content */}
      <div className="left-side" style={{ flex: 1, paddingRight: '20px' }}>
       <h1 id='head'>Mayjohn P J - A Visionary's Journey</h1>
       <p id='par'>Mr. Mayjohn P J, also known as Mayjohn Pindiyan, is the CEO and founder of Empire Event Management Company. Mr. Mayjohn, after his MBA graduation worked under several IT firms in Thrissur and Kochi. His talent lay elsewhere though, he was a part of a ganamela and orchestra troupe as a professional singer. His vocal ability was showcased in many occasions and wedding ceremonies. He tried to explore his passion with his own orchestra troupe – Valence Orchestra, but it didn’t develop as expected.

 Then the idea of ‘Event Management’ struck his mind.  The term as well as the event management field was relatively unknown till 2008. This was the inspiration that led to the founding of Empire  Events. Mayjohn’s interest in the performing arts brings the collective insight of an audience and spectators to Empire events, allowing to organize occasions in a unique manner. For the first three years, Empire Events was operating without an office setting. However, in 2011, they opened a tiny office in Thrissur, marking their transition into a fully functioning organization. Right now, as we reach 2025, the company has grown with multiple offices in different districts and cities across Kerala.</p>
       
         {/* Heading */}
         
        
        
      </div>

      {/* Right Side Form */}
      <div className="right-side" style={{ flex: 1, paddingLeft: '20px' }}>
        <div>
       <img src="images/businessman.jpg" alt="error" />
        </div>
      </div>
    </section>
    </div>

    </div>
  )
}
export default Aboutus;