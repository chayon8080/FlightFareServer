const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    // time: { type: String, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model("Flight", flightSchema);
