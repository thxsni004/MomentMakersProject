const mongoose=require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    username: String,
    userphone: String,
    packagetype: String,
    addOptions: [String],
    stageOption: Object,
    cameraPackage: Object,
    settingOption: Object,
    numberOfPeople: Number,
    totalCost: Number,
    date: String,
  });
  module.exports=mongoose.model('OrderHistory',OrderSchema);