const express = require("express");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
    const { flightId, numberOfSeats } = req.body;

    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        const totalPrice = flight.price * numberOfSeats;
        const booking = new Booking({
            userId: req.user.id,
            flightId,
            numberOfSeats,
            totalPrice,
        });
        await booking.save();
        res.status(201).json(booking); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
