const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    userphone: { type: String, required: true },
    username: { type: String, required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    programName: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    vipBooking: { type: Boolean, default: false },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model("Booking", BookingSchema);
