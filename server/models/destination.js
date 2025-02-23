const mongoose=require('mongoose')

const destinationSchema=new mongoose.Schema({
   
 
  stageOption: { id: String, name: String, price: Number },
  cameraPackage: { id: String, name: String, price: Number },
  totalCost: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
})
module.exports=mongoose.model('destinationpack',destinationSchema);

