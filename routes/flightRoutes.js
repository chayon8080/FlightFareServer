// const express = require("express");
// const router = express.Router();
// const Flight = require("../models/Flight"); 


// router.get("/search", async (req, res) => {
//     try {
//         const { origin, destination, date } = req.query;


//         if (!origin || !destination || !date) {
//             return res.status(400).json({ error: "Missing required query parameters: origin, destination, and date" });
//         }


//         console.log("Query Params:", req.query);

//         const flights = await Flight.find({
//             origin: new RegExp(origin, "i"), 
//             destination: new RegExp(destination, "i"),
//             date: { $gte: new Date(date) },
//         });


//         if (flights.length === 0) {
//             return res.status(404).json({ message: "No flights found" });
//         }


//         res.status(200).json(flights);
//     } catch (error) {
//         console.error("Error fetching flights:", error.message);
//         res.status(500).json({ error: "Server error occurred while fetching flights" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");

router.get("/search", async (req, res) => {
    try {
        const { origin, destination, date } = req.query;
        console.log("Received Query Params:", { origin, destination, date });

        const flights = await Flight.find({
            origin: new RegExp(origin, "i"),
            destination: new RegExp(destination, "i"),
            date: { $eq: new Date(date) },
        });

        if (!flights.length) {
            return res.status(404).json({ message: "No flights found." });
        }

        res.status(200).json(flights);
    } catch (error) {
        console.error("Error fetching flights:", error.message);
        res.status(500).json({ message: "Server error fetching flights." });
    }
});



module.exports = router;

