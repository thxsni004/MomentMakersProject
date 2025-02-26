const mongoose = require("mongoose");

const StageProgramSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("StageProgram", StageProgramSchema);
