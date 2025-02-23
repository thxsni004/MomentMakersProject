import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Fade.css'; // Custom styles
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function CarouselFadeExample() {
    const navigate = useNavigate();
  return (
    <div>
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
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Additional Content Section */}
      <div className="content-section " style={{ padding: '20px' }}>
        <div className="row">
          {/* Left side content (Text) */}
          <div className="col-md-6">
            <h2 id="head">ISO 9001:2015 CERTIFIED EVENT MANAGEMENT COMPANY IN KERALA</h2>
            <p id="par">
              Have you ever dreamed of planning the perfect event that will be remembered forever? Look no further than Empire Events, the top-notch event management company in Kerala, India, that has everything you need to make your occasion an unforgettable experience.
            </p>
            <p id="par">
              We make everything from corporate event planning and personal celebrations to even small customized event packages absolutely memorable! Contact us today to learn more about our services and how we can help you organize the top event management in Kerala.
            </p>
          </div>

          {/* Right side content (Video) */}
          <div className="col-md-6">
            <div className="video-container">
              <iframe
                width="100%"
                height="315"
                src="./images/event.MP4" // Replace with your video ID
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Event Management Video"
              ></iframe>
            </div>
            {/* <center><button  className="custom-button">admin</button></center> */}
          </div>
        </div>
      </div>
      <Container className="event-container " style={{ padding: '20px' }}>
      <Row className="align-items-stretch ">
        {/* Left side: 2x2 grid of images */}
        <Col xs={12} md={6} className="image-grid">
          <Row>
            <Col xs={6}>
              <Image src="/images/img3.jpg" thumbnail className="styled-image" />
            </Col>
            <Col xs={6}>
              <Image src="/images/img7.jpg" thumbnail className="styled-image" />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={6}>
              <Image src="/images/img4.jpg" thumbnail className="styled-image" />
            </Col>
            <Col xs={6}>
              <Image src="/images/img10.jpg" thumbnail className="styled-image" />
            </Col>
          </Row>
          
        </Col>

        {/* Right side: Text content */}
        <Col xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="text-content ">
          <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}className="section-title">Welcome to Our Event Management</h2>
          <p className='paragraph'>
            We specialize in creating unforgettable events tailored to your needs. Whether it's a wedding, corporate event, or private party, 
            our expert team ensures every detail is perfect.
          </p>
          <p className='paragraph'>
            From venue selection to final execution, trust us to make your vision a reality. Contact us today to start planning your dream event.
          </p><br /><br />
          <h2  className="section-title" style={{ fontWeight: 'bold', marginBottom: '20px' }}>Unlock Your Dream Destination Wedding in Kerala</h2>
          <p className='paragraph'>
          Choose Empire Event Management Company for your premium destination wedding in Kerala, India. Whether you dream of a beach wedding in Kerala or a resort celebration, we will bring it to life, infusing rich traditions.
          </p>
          <p className='paragraph'>
          We also offer venue selection assistance for an easier planning process. Our track record includes clients from India and abroad, making us your ideal partner for a dream destination wedding in Kerala, India.
          </p>
          <section className="button-container">
      <Button className="custom-button"  onClick={() => navigate('/login')}>Login</Button>
      <Button className="custom-button" onClick={() => navigate('/signup')}>Signup</Button>
    </section>
        </Col>
       
      </Row>
      
    </Container>
  

      
       </div>
  );
}

export default CarouselFadeExample;
