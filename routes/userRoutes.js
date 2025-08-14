const express = require("express");
const router = express.Router();
const User = require("../models/User");

// post 
router.post('/register', async (req,res) => {
    try {
        const{name , email, password, age, education, contry } = req.body;
        const newUser = await User.create({name,email,password,age, education, contry});
        res.json(newUser);
    }catch (error) {
        res.status(500).json({error: "Error creating user"});
    }
});

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
                age: user.age
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;