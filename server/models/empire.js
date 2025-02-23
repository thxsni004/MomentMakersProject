const mongoose = require('mongoose')

const empireSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number
})

const EmpireModel = mongoose.model("signups",empireSchema)
module.exports =EmpireModel