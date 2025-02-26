import React, { useState, useEffect } from "react";
import './Home.css'; // Custom styles
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'; // Importing social media icons
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios'; // Import axios for API requests
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown for profile menu
import { FaUserCircle } from "react-icons/fa"; // Import user icon




function Home() {
  const cardData=[
    {

   image: "images/img17.jpg",
      title: "Hindu Wedding",
      text: "Celebrate the sacred bond of marriage with a traditional Hindu wedding..",
      link: "/hindu",
    },
    {
      image: "images/img4.jpg",
      title: "Muslim Wedding",
      text: "Celebrate the union of two souls with the elegance of a  Muslim wedding. ",
      link: "/muslim",
    },
    {
      image: "images/img14.jpg",
      title: "Christian Wedding",
      text: "Celebrate the sacred bond of love with a traditional Christian wedding.",
      link: "/chrstian",
    },
    // {
    //   image: "images/img18.jpg",
    //   title: "Destination Wedding",
    //   text: "Celebrate the sacred bond of love with a traditional weddings in destination..",
    //   link: "/dest",
    // },

    {
     image: "images/stageshow.jpg",
      title: "🌟Stage Shows🌟 ",
      text: "🎆 Entertainment Redefined - Book Your Favorite Show Now!",
      link: "/other",
    },
  ]
 
  const navigate = useNavigate(); // Ensure useNavigate is inside Home
  const [user, setUser] = useState(null);


console.log(sessionStorage.getItem("user"));



useEffect(() => {
  axios.get("http://localhost:3001/session", { withCredentials: true })
    .then(response => {
      console.log("Session Data:", response.data);
      if (response.data.loggedIn && response.data.user) {
        setUser(response.data.user);
        sessionStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Sync session data
      }
    })
    .catch(error => console.error("Error fetching session:", error));
}, []);

  // If no user is logged in, redirect to login page
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      navigate("/login"); // Redirect to login if no user is found
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);




console.log(document.cookie);




const handleLogout = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  axios.post("http://localhost:3001/logout", {}, { withCredentials: true }) // Inform the backend
    .then(() => {
      setUser(null);
      navigate("/login");
    })
    .catch((error) => console.error("Logout error:", error));
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
            {/* <Nav.Link href="/cart" className="nav-link">History</Nav.Link> */}
            <Nav.Link href="/logout" className="nav-link">Logout</Nav.Link>
          </Nav>
  {/* Profile Dropdown */}
  <Dropdown align="end" className="profile-dropdown">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
              <FaUserCircle size={20} style={{ marginRight: "5px" }} /> {/* Profile Icon */}
                {user ? user.name : "Profile"} {/* Display user's name or "Profile" if not logged in */}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {user ? (
                  <>
                    <Dropdown.ItemText>
                      <strong>Email:</strong> {user.email}
                    </Dropdown.ItemText>
                    <Dropdown.ItemText>
                      <strong>Phone:</strong> {user.phone}
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/ViewHistory">View History</Dropdown.Item>
                    {/* <Dropdown.Item href="/whitelist">Whitelist</Dropdown.Item> */}
                    {/* <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item> */}
                    </>
                ) : (
                  <Dropdown.Item onClick={() => navigate("/login")}>Login</Dropdown.Item>
                )}
              </Dropdown.Menu>
             
              </Dropdown>
           
          </Navbar.Collapse>
      </div>
    </Navbar>
         {/* Carousel Section */}
         <div className="carousel-container">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100 full-image"
              src="/images/img9.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
            <h3 className="carousel-title">Partner with Empire Event</h3>
            <h3 className="carousel-title">Management in Kerala</h3>
              <p className="carousel-text">ISO 9001:2015 certified company</p>
                {/* Social Media Icons */}
                <div className="social-icons">
                <a href="https://www.facebook.com/thanseerkhan" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} className="icon" />
                </a>
                <a href="https://www.instagram.com/empire_eventss" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className="icon" />
                </a>
                <a href="https://wa.me/9747827817" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={30} className="icon" />
                </a>
                <a href="https://www.youtube.com/@empireevents" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={30} className="icon" />
                </a>
              </div><br />
              <Button
  variant="primary"
  className="carousel-button"
  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/contact');
  }}
>
  Contact Us
</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 full-image"
              src="/images/img3.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
            <h3 className="carousel-title">Partner with Empire Event</h3>
            <h3 className="carousel-title">Management in Kerala</h3>
              <p className="carousel-text">ISO 9001:2015 certified company.</p>
                {/* Social Media Icons */}
                <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} className="icon" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className="icon" />
                </a>
                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={30} className="icon" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={30} className="icon" />
                </a>
              </div><br />
              <Button
  variant="primary"
  className="carousel-button"
  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/contact');
  }}
>
  Contact Us
</Button>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 full-image"
              src="/images/img6.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="carousel-title">Partner with Empire Event</h3>
              <h3 className="carousel-title">Management in Kerala</h3>
              <p className="carousel-text">ISO 9001:2015 certified company</p>
                {/* Social Media Icons */}
                <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} className="icon" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className="icon" />
                </a>
                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={30} className="icon" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={30} className="icon" />
                </a>
              </div><br />
              <Button
  variant="primary"
  className="carousel-button"
  onClick={() => {
    console.log("Button clicked! Navigating...");
    navigate('/contact');
  }}
>
  Contact Us
</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="cardss ">
      <Row xs={1} md={2} className="g-4 ">
      {cardData.map((card, idx) => (
          <Col key={idx}>
            <Card>
            <Card.Img variant="top"  src={card.image} />
            <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <a href={card.link}>click</a>
              </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

    </div>

    
    </div>
    
  );
}

export default Home;
