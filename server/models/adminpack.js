const mongoose = require('mongoose');

// Schema for item (e.g., bride/groom items)
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,  // Store the image URL
});

// Schema for stage options
const stageSchema = new mongoose.Schema({
  name: String,      // Name of the stage
  price: Number,     // Price of the stage
  image: String,     // URL for the stage image
});



const addSchema = new mongoose.Schema({
  name: String,      // Name of the stage
  price: Number,     // Price of the stage/ This m 'price' a required field
 
});


const packageSchema = new mongoose.Schema({
  name: String,      // Name of the stage
  price: Number,     // Price of the stage
  image: String,     // URL for the stage image
});

const settingSchema=new mongoose.Schema({
  name: String,      // Name of the stage
  price: Number,     // Price of the stage
  image: String,     // URL for the stage image
})

const cameraSchema=new mongoose.Schema({
  name: String,      // Name of the stage
  price: Number,     // Price of the stage
  description: String,     // URL for the stage image
})



const HinduBrideSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const HinduGroomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const HinduBride = mongoose.model("HinduBride", HinduBrideSchema);
const HinduGroom = mongoose.model("HinduGroom", HinduGroomSchema);


const MuslimBrideSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const MuslimGroomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const MuslimBride = mongoose.model("MuslimBride", MuslimBrideSchema);
const MuslimGroom = mongoose.model("MuslimGroom", MuslimGroomSchema);


const ChristianBrideSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const ChristianGroomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const ChristianBride = mongoose.model("ChristianBride", ChristianBrideSchema);
const ChristianGroom = mongoose.model("ChristianGroom", ChristianGroomSchema);






// Model for stages
const StageOption = mongoose.model('StageOption', stageSchema);
const AddOption=mongoose.model('AddOption',addSchema);
const PackageOption=mongoose.model('PackageOption',packageSchema);
const SettingOptions=mongoose.model('SettingOptions',settingSchema);
const CameraOptions=mongoose.model('CameraOptions',cameraSchema);
// Exporting all models
module.exports = { MuslimBride, MuslimGroom, HinduBride, HinduGroom, ChristianBride, ChristianGroom ,StageOption,AddOption,PackageOption,SettingOptions,CameraOptions};
