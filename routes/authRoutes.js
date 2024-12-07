const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register Route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        // Create new user
        const user = new User({ username, email, password });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        // Return success response with token and user info
        res.status(201).json({
            message: "User registered successfully!",
            token,
            user: {
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Return success response with token and user info
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                email: user.email,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
