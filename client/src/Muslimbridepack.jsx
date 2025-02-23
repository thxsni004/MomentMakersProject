import React, { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function Muslimbridepack() {
  const navigate = useNavigate(); // Hook for navigation  


  
const[user,setselecteduser]=useState(()=>{
  return JSON.parse(sessionStorage.getItem("user"))||null;
})

        const [selectedStage, setSelectedStage] = useState(() => {
           return JSON.parse(sessionStorage.getItem("selectedStage")) || null;
         });
         const [selectedAdd, setSelectedAdd] = useState(() => {
           return JSON.parse(sessionStorage.getItem("selectedAdd")) || [];
         });
         const [selectedCameraPackage, setSelectedCameraPackage] = useState(() => {
           return JSON.parse(sessionStorage.getItem("selectedCameraPackage")) || null;
         });
         const [selectedSetting, setSelectedSetting] = useState(() => {
           return JSON.parse(sessionStorage.getItem("selectedSetting")) || null;
         });
         const [numberOfPeople, setNumberOfPeople] = useState(() => {
           return JSON.parse(sessionStorage.getItem("numberOfPeople")) || 1;
         });
         const [foodPrice, setFoodPrice] = useState(() => {
           return JSON.parse(sessionStorage.getItem("foodPrice")) || 250;
         }); 
       const [stages, setStages] = useState([]);
       const [add,setadd]=useState([]); 
       const[packages,setpackages]=useState([]);
       const[setting,setsetting]=useState([]);
       const[camera,setcamera]=useState([]); 
   
   
        // Save selections to sessionStorage whenever they change
         useEffect(() => {
          sessionStorage.setItem("user", JSON.stringify(user));
           sessionStorage.setItem("selectedStage", JSON.stringify(selectedStage));
           sessionStorage.setItem("selectedAdd", JSON.stringify(selectedAdd));
           sessionStorage.setItem("selectedCameraPackage", JSON.stringify(selectedCameraPackage));
           sessionStorage.setItem("selectedSetting", JSON.stringify(selectedSetting));
           sessionStorage.setItem("numberOfPeople", JSON.stringify(numberOfPeople));
           sessionStorage.setItem("foodPrice", JSON.stringify(foodPrice));
         }, [selectedStage, selectedAdd, selectedCameraPackage, selectedSetting, numberOfPeople, foodPrice,user]);
       
         // Function to clear all selections
     const clearAllSelections = () => {
       setSelectedStage(null);
       setSelectedAdd([]);
       setSelectedCameraPackage(null);
       setSelectedSetting(null);
       setNumberOfPeople(1);
       setFoodPrice(250);
    
   
           // Clear from sessionStorage
           sessionStorage.removeItem("selectedStage");
           sessionStorage.removeItem("selectedAdd");
           sessionStorage.removeItem("selectedCameraPackage");
           sessionStorage.removeItem("selectedSetting");
           sessionStorage.removeItem("numberOfPeople");
           sessionStorage.removeItem("foodPrice");
         };  

    // const AddOptions = [
    //   { id: 'iceCream', name: 'iceCream', price: 30 },
    //   { id: 'cottoncandy', name: 'cottoncandy', price: 30 },
    //   { id: 'popcorn', name: 'popcorn', price: 30 },
    // ];
    // const stageOptions = [
    //   { id: "middle", name: "Middle Class Stage", price: 20000,image:"muslimpack/stage2.jpg" },
    //   { id: "upperMiddle", name: "Upper Middle Class Stage", price: 60000,image:"muslimpack/stage1.jpg"  },
    //   { id: "high", name: "High Class Stage", price: 200000,image:"muslimpack/stage.jpg"  },
    // ];
    // const SettingOptions = [
    //   { id: "middle", name: "Boffet", price: 20000, image:"hindupack/boffet.jpg" },
    //   { id: "upperMiddle", name: "Setting", price: 60000,image:"hindupack/setting.jpg"  },
    //   { id: "high", name: "Arabian", price: 200000,image:"hindupack/arabian.jpg"  },
    // ];
    // const cameraOptions = [
    //   {
    //     id: "basic",
    //     name: "Basic Photography Package",
    //     description: "Candid photography with one professional photographer.",
    //     price: 15000,
    //   },
    //   {
    //     id: "premium",
    //     name: "Premium Photography Package",
    //     description:
    //       "Includes candid photography and video coverage with two photographers.",
    //     price: 40000,
    //   },
    //   {
    //     id: "luxury",
    //     name: "Luxury Photography Package",
    //     description:
    //       "Complete cinematic wedding film, drone shots, and advanced editing.",
    //     price: 80000,
    //   },
    // ];
    const placeOrder = async () => {
      const userDetails = JSON.parse(sessionStorage.getItem("user")); // Adjust as needed

      if (!userDetails || !userDetails.email) {
        alert("User not logged in!");
        return;
      }
      const orderDetails = {
        username:userDetails.name,
        userid: userDetails.email, 
        userphone:userDetails.phone,

        packagetype: `package ${foodPrice } Rate`,
        addOptions: selectedAdd.map((item) => item.name), // Store names instead of IDs
        stageOption: selectedStage,     // Selected stage object
        cameraPackage: selectedCameraPackage, // Selected camera package
        settingOption:selectedSetting,
        numberOfPeople,                 // Number of people
        totalCost: calculateGrandTotal(), // Calculated total cost
        date: new Date().toLocaleString(), // Store current date & time
      };
 // Retrieve previous order history from session storage
 let orderHistory = JSON.parse(sessionStorage.getItem("orderHistory")) || [];

 // Append new order details
 orderHistory.push(orderDetails);

 // Save updated history to session storage
 sessionStorage.setItem("orderHistory", JSON.stringify(orderHistory));



      console.log(orderDetails);

                      // Store order details in localStorage (optional)
                      localStorage.setItem("cartData", JSON.stringify(orderDetails));
    
                      // Navigate to cart page and pass state
                      navigate("/cart", { state: { orderDetails } });

      try {
        const response = await fetch('http://localhost:3001/mbride', {
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
  
    const handleAddChange = (option) => {
      setSelectedAdd((prev) => {
        const exists = prev.find((item) => item.id === option._id);
        if (exists) {
          return prev.filter((item) => item.id !== option._id);
        } else {
          return [...prev, { id: option._id, name: option.name }];
        }
      });
    };
    
  
    const handleStageChange = (id, price) => {
      setSelectedStage({ id, price });
    };

    const handleSettingChange = (id, price) => {
      setSelectedSetting({ id, price });
    };
  
    const handleCameraPackageChange = (id, price) => {
      setSelectedCameraPackage({ id, price });
    };
  
    const calculateFoodTotal = () => {
      const AddCost = selectedAdd.length * 30;
      return (foodPrice + AddCost) * numberOfPeople;
    };
    const calculateStageTotal = () => {
      return selectedStage?.price || 0;
    };
    const calculateSettingTotal = () => {
      return selectedSetting?.price || 0;
    };
    const calculateCameraTotal = () => {
      return selectedCameraPackage?.price || 0;
    };
    const calculateGrandTotal = () => {
      return calculateFoodTotal() + calculateStageTotal() + calculateCameraTotal()+ calculateSettingTotal();;
    };

    // Fetch stages from the backend
        useEffect(() => {
          const fetchStages = async () => {
            try {
              const response = await fetch('http://localhost:3001/admin/stages');
              const data = await response.json();
              console.log('Stages fetched:', data);  // Log fetched stages
              setStages(data); // Update state with fetched stages
            } catch (error) {
              console.error('Error fetching stages:', error);
            }
          };
        
          fetchStages();
        }, []);
        console.log('Stages fetched:', stages); 

        
        useEffect(() => {
            const fetchAddOptions = async () => {
              try {
                   const response = await fetch("http://localhost:3001/admin/Add"); // Correct API route
                    const data = await response.json();
              setadd(data); // Store fetched data in state
                 } catch (error) {
                   console.error("Error fetching add options:", error);
                }
              };
                                
           fetchAddOptions();
            }, []);
  
        console.log('AddOptions fetched:', add);

      //Fetch package from the backend
              useEffect(() => {
                const fetchPackages = async () => {
                  try {
                    const response = await fetch('http://localhost:3001/admin/packages');
                    const data = await response.json();
                    console.log('packages fetched:', data);  // Log fetched packages
                    setpackages(data); // Update state with fetched packages
                  } catch (error) {
                    console.error('Error fetching packages:', error);
                  }
                };
              
                fetchPackages();
              }, []);
              console.log('packages fetched:', packages);
          
               // Fetch settings from the backend
               useEffect(() => {
                const fetchsettings = async () => {
                  try {
                    const response = await fetch('http://localhost:3001/admin/settings');
                    const data = await response.json();
                    console.log('settings fetched:', data);  // Log fetched settings
                    setsetting(data); // Update state with fetched settings
                  } catch (error) {
                    console.error('Error fetching settings:', error);
                  }
                };
              
                fetchsettings();
              }, []);
              console.log('settings fetched:', setting);
          
          
               // Fetch Camera from the backend
               useEffect(() => {
                const fetchCamera = async () => {
                  try {
                    const response = await fetch('http://localhost:3001/admin/cameras');
                    const data = await response.json();
                    console.log('camera fetched:', data);  // Log fetched settings
                    setcamera(data); // Update state with fetched settings
                  } catch (error) {
                    console.error('Error fetching camera:', error);
                  }
                };
              
                fetchCamera();
              }, []);
              console.log('camera fetched:', camera); 
  
    return (
      <div className='hindubridepack'>
          {/* Breadcrumb with custom styling */}
   <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item href="/home">🏠</Breadcrumb.Item>
        <Breadcrumb.Item href="/muslim">🔙 </Breadcrumb.Item>
      </Breadcrumb>

      <h2>Food Packages</h2>
<Row xs={1} sm={2} md={3} className="g-4">
  {packages.length > 0 ? (
    packages.map((pkg) => (
      <Col key={pkg._id}>
        <Card style={{ width: "18rem" }} className={foodPrice === pkg.price ? "blurred-card" : ""}>
          <Card.Img variant="top" src={`http://localhost:3001${pkg.image}`} />
          <Card.Body>
            <Card.Title>{pkg.name}</Card.Title>
            <Card.Text>{pkg.description}</Card.Text>
            <Card.Text>₹{pkg.price}</Card.Text>
            <Button
              variant="primary"
              onClick={() => setFoodPrice(pkg.price)}
              disabled={foodPrice === pkg.price}
            >
              {foodPrice === pkg.price ? "Selected" : "Select"}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p>No packages available.</p>
  )}
</Row>

  
        
        <h2>Add Options</h2>
<Row xs={1} sm={2} md={3} className="g-4">
  {add.length > 0 ? (
    add.map((addoption) => (
      <Col key={addoption._id}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{addoption.name}</Card.Title>
            <Card.Text>₹{addoption.price}</Card.Text>
            <Form.Check
  type="checkbox"
  label={`Add ${addoption.name}`}
  checked={selectedAdd.some((item) => item.id === addoption._id)}
  onChange={() => handleAddChange(addoption)}
/>

          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p>No add options available.</p>
  )}
</Row>
  
        {/* <h2>Stage Options</h2>
        <Row xs={1} sm={2} md={3} className="g-4">
          {stageOptions.map((stage) => (
            <Col key={stage.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={stage.image} alt={`${stage.name} image`} />
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
        </Row> */}
        <h2>Stage Options</h2>
<Row xs={1} sm={2} md={3} className="g-4">
  {stages.length > 0 ? (
    stages.map((stage) => (
      <Col key={stage._id}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={`http://localhost:3001${stage.image}`} alt={`${stage.name} image`} />
          <Card.Body>
            <Card.Title>{stage.name}</Card.Title>
            <Card.Text>₹{stage.price}</Card.Text>
            <Button
              variant="primary"
              onClick={() => handleStageChange(stage._id, stage.price)}
              disabled={selectedStage?.id === stage._id}
            >
              {selectedStage?.id === stage._id ? "Selected" : "Select"}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p>No stages available.</p>
  )}
</Row>

  
<h2>Camera Options</h2>
<Row xs={1} sm={2} md={3} className="g-4">
  {camera.length > 0 ? (
    camera.map((cam) => (
      <Col key={cam._id}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{cam.name}</Card.Title>
            <Card.Text>{cam.description}</Card.Text>
            <Card.Text> ₹{cam.price}</Card.Text>
            <Button
              variant="primary"
              onClick={() => handleCameraPackageChange(cam._id, cam.price)}
              disabled={selectedCameraPackage?.id === cam._id}
            >
              {selectedCameraPackage?.id === cam._id ? "Selected" : "Select"}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p>No cameras available.</p>
  )}
</Row>


<h2>Setting Options</h2>
      <Row xs={1} sm={2} md={3} className='gg-4'>
        {setting.length > 0 ?(
          setting.map((set)=>(
            <Col key={set._id}>
              <Card style={{width:"18rem"}}>
                <Card.Img variant='top' src={`http://localhost:3001${set.image}`} alt={`${set.name} image`}/>
                <Card.Body>
                  <Card.Title>{set.name}</Card.Title>
                  <Card.Text>₹{set.price}</Card.Text>
                  <Button
                  variant='primary'
                  onClick={()=>handleSettingChange(set._id,set.price)}
                  disabled={selectedStage?.id===set._id}>
                    {selectedSetting?.id===set._id ? "selected":"select"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ):(
          <p>No Stage Available</p>
        )}
      </Row>

        
  
        <h2>Number of People</h2>
       <center> <Form.Control
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
          style={{ width: '200px', margin: '20px 0' }}
        /></center>
  
  <h2>Current Totals</h2>
        <p>Food & Add items: ₹{calculateFoodTotal()}</p>
        <p>Stage: ₹{calculateStageTotal()}</p>
        <p>Camera: ₹{calculateCameraTotal()}</p>
        <p>Setting:₹{calculateSettingTotal()}</p>
  
        <h2>Grand Total</h2>
        <p>₹{calculateGrandTotal()}</p>

   <center>     <Button
 
 onClick={placeOrder}
>
 Place Order
</Button></center>
<br />
<center>
  <button 
    className="carousel-button" 
    onClick={() => window.location.href = "https://wa.me/919562420067?text=I%20want%20help%20in%20this%20package"}
  >
    Talk To Expert
  </button>
</center>
<br /><center>
<button onClick={clearAllSelections}  className="red-button" >
        Clear All
      </button></center>
      </div>
    );
  }
  

export default Muslimbridepack
