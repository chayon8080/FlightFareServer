// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const flightRoutes = require("./routes/flightRoutes"); 

// dotenv.config();

// const app = express();


// app.use(cors({ origin: "http://localhost:5173" })); 


// app.use(express.json());

// app.use("/api/flights", flightRoutes); 


// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

const flightRoutes = require("./routes/flightRoutes");
app.use("/api/flights", flightRoutes);
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://chayonghosh2001:gflHgeuN1I5zO8KX@cluster0.n00wd.mongodb.net/FlightFareDB?retryWrites=true&w=majority";

mongoose.set('debug', true);
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
