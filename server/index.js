const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const Razorpay = require("razorpay");


const EmpireModel = require('./models/empire');
const Adminmodel=require('./models/adminlogin');
const hiorder = require('./models/bridepack');
const hindugroom=require('./models/groompack');
const muslimbridepack=require('./models/muslimbride');
const muslimgroompack=require('./models/muslimgroom');
const christianbridepack=require('./models/christianbride');
const christiangroompack=require('./models/christiangroom');
const destination=require('./models/destination');
const Order=require('./models/Order.js')
const StageProgram=require('./models/StageProgram.js')
const Booking=require('./models/Booking.js')

const upload = require('./uploads'); // Import the multer config
const { MuslimBride, MuslimGroom, HinduBride, HinduGroom, ChristianBride, ChristianGroom,StageOption,AddOption, PackageOption,SettingOptions,CameraOptions } = require('./models/adminpack');
const multer = require("multer");
const path = require("path");

const razorpay = new Razorpay({
  key_id: 'rzp_test_ij6Cc2ZnU6RAhZ',
  key_secret: '5Vh1htpJehtxRYymLSvTtd4F',
  
});


const app = express();
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded images
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials (sessions, cookies)
  })
);
// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(
  session({
    secret: "your-secret-key", // Change this to a secure key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/moment", collectionName: "sessions" }), // Store sessions in MongoDB
    cookie: {maxAge:30000, secure: false, httpOnly: true, sameSite: "lax", }, // For HTTPS, change `secure: true`
  })
);


app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


app.get("/session", (req, res) => {
  console.log("Session Data:", req.session);  // Debugging log

  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  
  res.json({ loggedIn: false });
});


// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate phone number
const phoneRegex = /^\d{10}$/;
if (!phoneRegex.test(phone)) {
  return res.status(400).json({ error: 'Phone number must contain exactly 10 digits' });
}

  try {
    // Check if email already exists
    const existingUser = await EmpireModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new EmpireModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
 console.log(req.sessionID)
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find the user by email
    const user = await EmpireModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Store user details in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    req.session.save((err) => {  // Ensure session is saved before responding
      if (err) {
        console.error("Session Save Error:", err);
        return res.status(500).json({ error: "Failed to save session" });
      }

      console.log("Session saved successfully!", req.session.user);
      res.json({ message: "Login successful", user: req.session.user });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});









app.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials (replace with DB authentication)
  if (email === 'admin@gmail.com' && password === 'password123') {
      req.session.admin = email; // Store in session
      return res.json({ message: 'Login successful', isAdmin: true });
  } else {
      return res.status(401).json({ message: 'Invalid credentials' });
  }
});

const adminAuth = (req, res, next) => {
  if (req.session.admin) {
      next(); // User is authenticated, continue
  } else {
      res.status(403).json({ message: 'Unauthorized access' });
  }
};

// Example: Protected Admin Dashboard Route
app.get('/adminpage', adminAuth, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

// log out 
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
  });
});


app.post("/bridepack", async (req, res) => {
  try {
    console.log("Order Data Received:", req.body); // Log incoming data
    const order = new hiorder(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});














// // Fetch All Orders (GET request)
app.get('/order/hindubride', async (req, res) => {
  try {
    const orders = await hiorder.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});



app.post("/groompack",async(req,res)=>{
  try{
    console.log("Order Data Received:", req.body);
    const order=new hindugroom(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// // Fetch All Orders (GET request)
app.get('/order/hindugroom', async (req, res) => {
  try {
    const orders = await hindugroom.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post("/mbride",async(req,res)=>{
  try{
    console.log("Order Data Recieved:",req.body);
    const order=new muslimbridepack(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// // Fetch All Orders (GET request)
app.get('/order/muslimbride', async (req, res) => {
  try {
    const orders = await muslimbridepack.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post("/mgroom",async(req,res)=>{
  try{
    console.log("Order Data Recieved:",req.body);
    const order=new muslimgroompack(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// // Fetch All Orders (GET request)
app.get('/order/muslimgroom', async (req, res) => {
  try {
    const orders = await muslimgroompack.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/cbride',async(req,res)=>{

  try{
    console.log("Order Data Recieved:",req.body);
    const order=new christianbridepack(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// // Fetch All Orders (GET request)
app.get('/order/christianbride', async (req, res) => {
  try {
    const orders = await christianbridepack.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


app.post('/cgroom',async(req,res)=>{

  try{
    console.log("Order Data Recieved:",req.body);
    const order=new christiangroompack(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});
// // Fetch All Orders (GET request)
app.get('/order/christiangroom', async (req, res) => {
  try {
    const orders = await christiangroompack.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


app.post('/dest',async(req,res)=>{
  try{
    console.log("Order Data Recieved:",req.body);
    const order=new destination(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error("Error saving order:", error); // Log detailed error
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// // Fetch All Orders (GET request)
app.get('/order/destination', async (req, res) => {
  try {
    const orders = await destination.find(); // Fetch Hindu bride orders from MongoDB
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});




// Admin route for adding new items (bride/groom with image, price, name)

app.post('/admin', upload.single('image'), async (req, res) => {
  const { category, subCategory, name, price ,type} = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  let Model;
  if (type === "addoption") {
    Model = AddOption;  // Store in "addoptions"
  } else if (category === "muslim") {
    Model = subCategory === "bride" ? MuslimBride : MuslimGroom;
  } else if (category === "hindu") {
    Model = subCategory === "bride" ? HinduBride : HinduGroom;
  } else if (category === "christian") {
    Model = subCategory === "bride" ? ChristianBride : ChristianGroom;
  } else {
    return res.status(400).json({ error: "Invalid type or category" });
  }

  try {
    const newItem = new Model({
      name,
      price,
      image: imageUrl,
    });
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item' });
  }
});


// Add Stage Program
app.post("/admin/stage-programs", upload.single("image"), async (req, res) => {
  try {
    const { name, date, price } = req.body;
    const image = req.file.filename;

    const newProgram = new StageProgram({ name, date, price, image });
    await newProgram.save();
    res.status(201).json({ message: "Program added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get All Stage Programs
app.get("/stage-programs", async (req, res) => {
  const programs = await StageProgram.find();
  res.json(programs);
});



// Update Stage Program
app.put("/admin/stage-programs/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, date, price } = req.body;
    let updateData = { name, date, price };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await StageProgram.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Program updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Delete Stage Program
app.delete("/admin/stage-programs/:id", async (req, res) => {
  await StageProgram.findByIdAndDelete(req.params.id);
  res.json({ message: "Program deleted!" });
});

// (a) Book a Stage Program (Generate Participation Card)
// POST - Book a stage program
app.post("/book-stage-program/:id", async (req, res) => {
  try {
    const { userId, vipBooking } = req.body;
    const programId = req.params.id;

    if (!userId || !programId) {
      return res.status(400).json({ error: "Missing userId or programId" });
    }

    console.log("Fetching user:", userId);
    const user = await EmpireModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("Fetching stage program:", programId);
    const stageProgram = await StageProgram.findById(programId);
    if (!stageProgram) return res.status(404).json({ error: "Stage program not found" });

    // Booking logic
    const totalAmount = vipBooking ? stageProgram.price + 500 : stageProgram.price;
    const newBooking = new Booking({
      userid: user.email,
      username: user.name,
      userphone: user.phone,
      programId: stageProgram._id,
      programName: stageProgram.name,
      date: stageProgram.date,
      price: stageProgram.price,
      vipBooking,
      totalAmount,
      participationCard: `PART-${Date.now()}`,
      vipCard: vipBooking ? `VIP-${Date.now()}` : null,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error booking stage program:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// (b) Fetch User's Bookings

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings from MongoDB
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});








app.get('/admin/stages', async (req, res) => {
  try {
    const stages = await StageOption.find(); // Fetch all stage options
    console.log('Fetched stages:', stages);
    res.status(200).json(stages);
  } catch (error) {
    console.error('Error fetching stages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin/Add', async (req, res) => {
  try {
    const add = await AddOption.find(); // Fetch all AddOptions options
    console.log('Fetched Add:', add);
    res.status(200).json(add);
  } catch (error) {
    console.error('Error fetching Add:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin/packages',async(req,res)=>{
  try{
    const packages=await PackageOption.find();res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages", error });
  }
});





// Get all camera options
app.get("/admin/settings", async (req, res) => {
  try {
    const set = await SettingOptions.find();
    console.log("Fetched cameras:", set);
    res.status(200).json(set);
  } catch (error) {
    console.error("Error fetching cameras:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/admin/cameras', async (req, res) => {
  try {
    const camera = await CameraOptions.find(); // Fetch all stage options
    console.log('Fetched camera:', camera);
    res.status(200).json(camera);
  } catch (error) {
    console.error('Error fetching camera:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///////////////////////////////////////////

//post stages

app.post('/admin/stages', upload.single('image'), async (req, res) => {

  console.log("Received file:", req.file); // Debugging
  console.log("Received body:", req.body);

  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store image URL

  try {
    const newStage = new StageOption({ name, price, image: imageUrl });
    await newStage.save();
    res.status(201).json({ message: 'Stage added successfully!', imageUrl });
  } catch (error) {
    console.error('Error adding stage:', error);
    res.status(500).json({ error: 'Error adding stage' });
  }
});

//post add

app.post('/admin/Add', async (req, res) => {
  const { name, price } = req.body;
  console.log("Received data:", { name, price });  // Log the data received to verify
  
  try {
    const newAdd = new AddOption({ name, price });
    await newAdd.save();
    res.status(201).json({ message: 'Addoption added successfully!' });
  } catch (error) {
    console.error('Error adding Addoption:', error);
    res.status(500).json({ error: 'Error adding Addoption' });
  }
});

//post packages

app.post('/admin/packages', upload.single('image'), async (req, res) => {

  console.log("Received file:", req.file); // Debugging
  console.log("Received body:", req.body);

  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store image URL

  try {
    const newpackages = new PackageOption({ name, price, image: imageUrl });
    await newpackages.save();
    res.status(201).json({ message: 'packages added successfully!', imageUrl });
  } catch (error) {
    console.error('Error adding packages:', error);
    res.status(500).json({ error: 'Error adding packages' });
  }
});

//post Settings

app.post('/admin/settings', upload.single('image'), async (req, res) => {

  console.log("Received file:", req.file); // Debugging
  console.log("Received body:", req.body);

  const { name, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Store image URL

  try {
    const newSetting = new SettingOptions({ name, price, image: imageUrl });
    await newSetting.save();
    res.status(201).json({ message: 'Setting added successfully!', imageUrl });
  } catch (error) {
    console.error('Error adding Setting:', error);
    res.status(500).json({ error: 'Error adding Setting' });
  }
});

//post Camera

// app.post('/admin/cameras', async (req, res) => {

//   console.log("Received file:", req.file); // Debugging
//   console.log("Received body:", req.body);

//   const { name, price,description } = req.body;

//   try {
//     const newCamera = new CameraOptions({ name, price, description});
//     await newCamera.save();
//     res.status(201).json({ message: 'camera added successfully!' });
//   } catch (error) {
//     console.error('Error adding camera:', error);
//     res.status(500).json({ error: 'Error adding camera' });
//   }
// });

// Add a new camera option
app.post("/admin/cameras", async (req, res) => {
  console.log("Received body:", req.body);

  const { name, price, description } = req.body;

  try {
    const newCamera = new CameraOptions({ name, price, description });
    await newCamera.save();
    res.status(201).json({ message: "Camera added successfully!", newCamera });
  } catch (error) {
    console.error("Error adding camera:", error);
    res.status(500).json({ error: "Error adding camera" });
  }
});






// id vech stage ne get cheyyan
app.get('/admin/stages/:id', async (req, res) => {
  try {
    const stage = await StageOption.findById(req.params.id);
    if (!stage) {
      return res.status(404).send('Stage not found');
    }
    res.json(stage);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Internal server error');
  }
});


app.get('/admin/Add/:id', async (req, res) => {
  try {
    const add = await AddOption.findById(req.params.id);
    if (!add) {
      return res.status(404).send('addoption not found');
    }
    res.json(add);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Internal server error');
  }
});



app.get('/admin/packages/:id', async (req, res) => {
  try {
    const package= await PackageOption.findById(req.params.id);
    if (!package) {
      return res.status(404).send('package not found');
    }
    res.json(package);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Internal server error');
  }
});

// id vech setting ne get cheyyan
app.get('/admin/settings/:id', async (req, res) => {
  try {
    const setting = await SettingOptions.findById(req.params.id);
    if (!setting) {
      return res.status(404).send('setting not found');
    }
    res.json(setting);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Internal server error');
  }
});

// // id vech camera ne get cheyyan
// app.get('/admin/cameras/:id', async (req, res) => {
//   try {
//     const camera = await CameraOptions.findById(req.params.id);
//     if (!camera) {
//       return res.status(404).send('camera not found');
//     }
//     res.json(camera);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).send('Internal server error');
//   }
// });

// Get a specific camera by ID
app.get("/admin/cameras/:id", async (req, res) => {
  try {
    const camera = await CameraOptions.findById(req.params.id);
    if (!camera) {
      return res.status(404).json({ error: "Camera not found" });
    }
    res.status(200).json(camera);
  } catch (error) {
    console.error("Error fetching camera:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example Express route for deleting a stage
app.delete('/admin/stages/:id', async (req, res) => {
  try {
    const stage = await StageOption.findByIdAndDelete(req.params.id);
    if (!stage) {
      return res.status(404).send('Stage not found');
    }
    res.status(200).send('Stage deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Example Express route for deleting a Addoption
app.delete('/admin/Add/:id', async (req, res) => {
  try {
    const add = await AddOption.findByIdAndDelete(req.params.id);
    if (!add) {
      return res.status(404).send('addoption not found');
    }
    res.status(200).send('addoption deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Example Express route for deleting a packages
app.delete('/admin/packages/:id', async (req, res) => {
  try {
    const package = await PackageOption.findByIdAndDelete(req.params.id);
    if (!package) {
      return res.status(404).send('package not found');
    }
    res.status(200).send('package deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Example Express route for deleting a settings
app.delete('/admin/settings/:id', async (req, res) => {
  try {
    const setting = await SettingOptions.findByIdAndDelete(req.params.id);
    if (!setting) {
      return res.status(404).send('settings not found');
    }
    res.status(200).send('settings deleted');
  } catch (error) {
    res.status(500).send('settings error');
  }
});



// Delete a camera by ID
app.delete("/admin/cameras/:id", async (req, res) => {
  try {
    const camera = await CameraOptions.findByIdAndDelete(req.params.id);
    if (!camera) {
      return res.status(404).json({ error: "Camera not found" });
    }
    res.status(200).json({ message: "Camera deleted successfully" });
  } catch (error) {
    console.error("Error deleting camera:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Example Express route for updating the stage (e.g., updating price)
app.put('/admin/stages/:id', async (req, res) => {
  try {
    const { price } = req.body; // assuming only the price is being updated
    const updatedStage = await StageOption.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );
    if (!updatedStage) {
      return res.status(404).send('Stage not found');
    }
    res.status(200).json(updatedStage);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Example Express route for updating the Addoption (e.g., updating price)
app.put('/admin/Add/:id', async (req, res) => {
  try {
    const { price } = req.body; // assuming only the price is being updated
    const updatedAdd = await AddOption.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );
    if (!updatedAdd) {
      return res.status(404).send('addoption not found');
    }
    res.status(200).json(updatedAdd);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Example Express route for updating the stage (e.g., updating price)
app.put('/admin/packages/:id', async (req, res) => {
  try {
    const { price } = req.body; // assuming only the price is being updated
    const updatedPackage = await PackageOption.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );
    if (!updatedPackage) {
      return res.status(404).send('package not found');
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Example Express route for updating the Settings (e.g., updating price)
app.put('/admin/settings/:id', async (req, res) => {
  try {
    const { price } = req.body; // assuming only the price is being updated
    const updatedSetting= await SettingOptions.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );
    if (!updatedSetting) {
      return res.status(404).send('setting not found');
    }
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// // Example Express route for updating the camera (e.g., updating price)
// app.put('/admin/cameras/:id', async (req, res) => {
//   try {
//     const { price } = req.body; // assuming only the price is being updated
//     const updatedCamera= await CameraOptions.findByIdAndUpdate(
//       req.params.id,
//       { price },
//       { new: true }
//     );
//     if (!updatedCamera) {
//       return res.status(404).send('camera not found');
//     }
//     res.status(200).json(updatedCamera);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });

// Update camera details (Name, Price, Description)
app.put("/admin/cameras/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedCamera = await CameraOptions.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );
    if (!updatedCamera) {
      return res.status(404).json({ error: "Camera not found" });
    }
    res.status(200).json(updatedCamera);
  } catch (error) {
    console.error("Error updating camera:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);  // Debugging
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});





// Store order in session
app.post('/placeorder', (req, res) => {
  const { packageId, packageName, price } = req.body;

  req.session.order = { packageId, packageName, price }; // Save in session
  res.json({ message: 'Order placed successfully!' });
});

// Fetch order details from session
app.get('/cart', (req, res) => {
  if (req.session.order) {
      res.json({ order: req.session.order });
  } else {
      res.json({ message: 'No order placed yet.' });
  }
});



///////////////payment option razorpay

// Create Order Route
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      payment_capture: 1
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define Schema for Success Events
const successEventSchema = new mongoose.Schema({
  type: String, // "image" or "video"
  filePath: String, // Path to file
});

const SuccessEvent = mongoose.model("SuccessEvent", successEventSchema);
// Route to Upload Success Event Photos/Videos
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const newEvent = new SuccessEvent({
      type: req.file.mimetype.startsWith("image/") ? "image" : "video",
      filePath: `/uploads/${req.file.filename}`,
    });
    await newEvent.save();
    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
});
// Route to Get Success Event Photos/Videos
app.get("/api/success-events", async (req, res) => {
  try {
    const events = await SuccessEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error });
  }
});





app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
