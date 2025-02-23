const mongoose = require('mongoose');

const adminSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number
})

const Adminmodel=mongoose.model("Admin",adminSchema);
module.exports=Adminmodel
