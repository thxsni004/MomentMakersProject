const mongoose=require('mongoose');

const groompackSchema = new mongoose.Schema({

  userid: { type: String, required: true },
  userphone: { type: String, required: true },
  username: { type: String, required: true },
  packagetype: { type: String, required: true },
  addOptions: { type: [String] },
  stageOption: { id: String, name: String, price: Number },
  cameraPackage: { id: String, name: String, price: Number },
  settingOption: { id: String, name: String, price: Number },
  numberOfPeople: { type: Number, required: true, min: 1 },
  totalCost: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  

});
module.exports=mongoose.model('hindugroompack',groompackSchema);