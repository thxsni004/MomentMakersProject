import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Destination() {
  const [selectedStage, setSelectedStage] = useState([]);
      const [selectedCameraPackage, setSelectedCameraPackage] = useState(null);

      
     
  
  
   
      const stageOptions = [
        { id: "middle", name: "Full package", price: 1500000, image:"logo/dest.jpg" },
        { id: "upperMiddle", name: "Full package", price: 1700000,image:"logo/dest1.jpg" },
        { id: "high", name: "Full package", price: 1900000,image:"logo/dest2.jpg"  },
        { id: "2000000", name: "Full package", price: 2000000,image:"logo/dest3.jpg"  },
        { id: "2700000", name: "Full package", price: 2700000,image:"logo/dest4.jpg"  },
        { id: "3100000", name: "Full package", price: 3100000,image:"logo/dest5.jpg"  },
        { id: "3300000", name: "Full package", price: 3300000,image:"logo/dest6.jpg"  },
        { id: "3400000", name: "Full package", price: 3400000,image:"logo/dest7.jpg"  },
        { id: "4200000", name: "Full package", price: 4200000,image:"logo/dest8.jpg"  },
        { id: "4600000", name: "Full package", price: 4600000,image:"logo/dest9.jpg"  },
        { id: "4900000", name: "Full package", price: 4900000,image:"logo/dest10.jpg"  },
        { id: "5000000", name: "Full package", price: 5000000,image:"logo/dest11.jpg"  },
      ];
   
      const cameraOptions = [
        {
          id: "basic",
          name: "Basic Photography Package",
          description: "Candid photography with one professional photographer.",
          price: 15000,
        },
        {
          id: "premium",
          name: "Premium Photography Package",
          description:
            "Includes candid photography and video coverage with two photographers.",
          price: 40000,
        },
        {
          id: "luxury",
          name: "Luxury Photography Package",
          description:
            "Complete cinematic wedding film, drone shots, and advanced editing.",
          price: 80000,
        },
      ];

      const placeOrder = async () => {
        const orderDetails = {
          stageOption: selectedStage,     // Selected stage object
          cameraPackage: selectedCameraPackage, // Selected camera package
          totalCost: calculateGrandTotal() // Calculated total cost
        };
        console.log(orderDetails);
    
        try {
          const response = await fetch('http://localhost:3001/dest', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
          });
      
          if (response.ok) {
            alert('Order placed successfully!');
          } else {
            alert('Failed to place order.');
          }
        } catch (error) {
          console.error(error);
          alert('Error placing order.');
        }
      };
    




    
      const handleStageChange = (id, price) => {
        setSelectedStage({ id, price });
      };
    
      const handleCameraPackageChange = (id, price) => {
        setSelectedCameraPackage({ id, price });
      };
    

      const calculateStageTotal = () => {
        return selectedStage?.price || 0;
      };
     
      const calculateCameraTotal = () => {
        return selectedCameraPackage?.price || 0;
      };
      const calculateGrandTotal = () => {
        return   calculateStageTotal() + calculateCameraTotal();
      };

  return (
    
<div className="hindubridepack">
  
        <h2>Stage Options</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
          {stageOptions.map((stage) => (
            <Col key={stage.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={stage.image} alt={`${stage.name} image`}/>
                <Card.Body>
                  <Card.Title>{stage.name}</Card.Title>
                  <Card.Text>₹{stage.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleStageChange(stage.id, stage.price)}
                    disabled={selectedStage?.id === stage.id}
                  >
                    {selectedStage?.id === stage.id ? "Selected" : "Select"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
  
        <h2>Camera Packages</h2>
        <Row xs={1} md={3} className="g-4">
          {cameraOptions.map((camera) => (
            <Col key={camera.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{camera.name}</Card.Title>
                  <Card.Text>{camera.description}</Card.Text>
                  <Card.Text>₹{camera.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleCameraPackageChange(camera.id, camera.price)
                    }
                    disabled={selectedCameraPackage?.id === camera.id}
                  >
                    {selectedCameraPackage?.id === camera.id
                      ? "Selected"
                      : "Select"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
     
        
        
  
       
  
  <h2>Current Totals</h2>
        
        <p>Stage: ₹{calculateStageTotal()}</p>
        <p>Camera: ₹{calculateCameraTotal()}</p>
        
  
        <h2>Grand Total</h2>
        <p>₹{calculateGrandTotal()}</p>
      <center>  <Button
  
  onClick={placeOrder}
>
  Place Order
</Button></center> <br />
<center>
  <button 
    className="carousel-button" 
    onClick={() => window.location.href = "https://wa.me/919562420067?text=I%20want%20help%20in%20this%20package"}
  >
    Talk To Expert
  </button>
</center>




      </div>
    );
  }
  

export default Destination;
