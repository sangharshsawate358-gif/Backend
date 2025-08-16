const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ✅ POST: Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, age, education, country } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Name, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            education,
            country
        });

        res.status(201).json({
            success: true,
            msg: "User signed up successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                education: newUser.education,
                country: newUser.country
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error signing up user" });
    }
});

// ✅ POST: Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        res.json({
            success: true,
            msg: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                education: user.education,
                country: user.country
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
