import React, { useEffect,useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './Service.css'; // Add a custom CSS file for animations and styling

function Services() {
  const [media, setMedia] = useState([]);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/success-events");
        setMedia(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    fetchMedia();
  }, []);

  return (
    <div>
      {/* Navbar Section */}
      <Navbar expand="lg" className="custom-navbar">
        <div style={{ width: '100%' }}>
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

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-links-container">
              <Nav.Link href="/home" className="nav-link">Home</Nav.Link>
              <Nav.Link href="/about" className="nav-link">About Us</Nav.Link>
              <Nav.Link href="/services" className="nav-link">Services</Nav.Link>
              <Nav.Link href="/contact" className="nav-link">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* Carousel Section */}
      <div className="carousel-container">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100 full-image"
              src="/images/stage7.jpg"
              alt="Slide"
              style={{
                height: '70vh',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />

            <Carousel.Caption>
              <h3 className="carousel-title">Where your vision becomes reality</h3>
              <p className="carousel-text">We can provide everything you need to ensure your event is a success.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2 className="text-center">Services</h2>
        <div className="container py-4">
          <div className="row">
            {/* Stage Decoration */}
            <div className="col-md-4 text-center service-item">
              <div className="service-animation stage-decoration">
                <img src="/images/img1.jpg" alt="Stage Decoration" className="service-image" />
              </div>
              <h4>Stage Decorations</h4>
              <p>
                Our creative stage decor sets the perfect backdrop for your event, combining style, color, and theme to impress your guests.
              </p>
            </div>

            {/* Luxury Car Rentals */}
            <div className="col-md-4 text-center service-item">
              <div className="service-animation luxury-car">
                <img src="/images/car.jpg" alt="Luxury Car Rentals" className="service-image" />
              </div>
              <h4>Luxury Car Rentals</h4>
              <p>
                Arrive in style with our premium luxury car rentals, adding a touch of elegance to your special event. Best car rentals at Kozhikode.
              </p>
            </div>

            {/* Birthday Party */}
            <div className="col-md-4 text-center service-item">
              <div className="service-animation birthday-party">
                <img src="/images/birthday.jpg" alt="Birthday Party" className="service-image" />
              </div>
              <h4>Birthday Party Services</h4>
              <p>
                From kids' parties to milestone birthdays, we design fun-filled and memorable celebrations that everyone will enjoy.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
      <h2 className="text-center">Success Events</h2>
      <Carousel>
        {media.map((item, index) => (
          <Carousel.Item key={index}>
            {item.type === "image" ? (
              <img src={`http://localhost:3001${item.filePath}`} alt="Success Event" className="d-block w-100" style={{ height: "400px", objectFit: "cover" }} />
            ) : (
              <video controls className="d-block w-100" style={{ height: "400px", objectFit: "cover" }}>
                <source src={`http://localhost:3001${item.filePath}`} type="video/mp4" />
              </video>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    </div>

  );
}

export default Services;
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import './Service.css'; // Custom CSS file for animations and styling

// function Services() {
//   const [images, setImages] = useState([
//     '/images/img1.jpg',
//     '/images/img2.jpg',
//     '/images/img3.jpg',
//     '/images/img5.jpg',
//     '/images/img6.jpg',
//     '/images/img8.jpg',
//     '/images/img9.jpg',
//     '/images/img11.jpg',
//   ]);

//   const [videos, setVideos] = useState([
//     '/images/event.MP4',
//     '/videos/video2.mp4',
//     '/videos/video3.mp4',
//   ]);

//   return (
//     <div>
//       {/* Navbar Section */}
//       <Navbar expand="lg" className="custom-navbar">
//         <div style={{ width: '100%' }}>
//           <Navbar.Brand href="#home" className="logo-container">
//             <img
//               src="/logo/logo.jpg"
//               width="60"
//               height="60"
//               className="logo"
//               alt="Empire Logo"
//             />
//             <span className="brand-name">Empire</span>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto nav-links-container">
//               <Nav.Link href="/home" className="nav-link">Home</Nav.Link>
//               <Nav.Link href="/about" className="nav-link">About Us</Nav.Link>
//               <Nav.Link href="/services" className="nav-link">Services</Nav.Link>
//               <Nav.Link href="/contact" className="nav-link">Contact Us</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </div>
//       </Navbar>

//       {/* Carousel Section */}
//       <div className="carousel-container">
//         <Carousel fade>
//           <Carousel.Item>
//             <img
//               className="d-block w-100 full-image"
//               src="/images/stage7.jpg"
//               alt="Slide"
//               style={{ height: '70vh', objectFit: 'cover', objectPosition: 'center' }}
//             />
//             <Carousel.Caption>
//               <h3 className="carousel-title">Where your vision becomes reality</h3>
//               <p className="carousel-text">We provide everything you need to make your event a success.</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         </Carousel>
//       </div>

//       {/* Services Section */}
//       <div className="services-section">
//         <h2 className="text-center">Our Gallery</h2>
//         <div className="container py-4">
//           <div className="row">
//             {/* Images Section */}
//             <div className="col-md-6 text-center service-item">
//               <h4>Event Images</h4>
//               <div className="service-animation">
//                 {images.map((img, index) => (
//                   <img key={index} src={img} alt="Event" className="service-image" />
//                 ))}
//               </div>
//             </div>

//             {/* Videos Section */}
//             <div className="col-md-6 text-center service-item">
//               <h4>Event Videos</h4>
//               <div className="service-animation">
//                 {videos.map((vid, index) => (
//                   <video key={index} controls className="service-video">
//                     <source src={vid} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// // }

// export default Services;

