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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 2️⃣ Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3️⃣ Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 5️⃣ Send response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//  Get user with dynamic age filter
router.get('/userfilter', async (req, res) => {
  try {
    const { age } = req.query;
    const filter = {};
    if (age) {
      filter.age = Number(age);
    }
    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});


// only age
router.get("/users",async (req,res)=>{
    try{
        const users = await User.find({age :10});
    res.json(users);
        }catch(error){
        res.status(500).json({error: "Error Fetching user"});
    }

})


// all data
router.get("/users",async (req,res)=>{
    try{
        const users = await User.find();
    res.json(users);
        }catch(error){s
        res.status(500).json({error: "Error!"});
    }

})


//delete user by id 
router.delete("/users/:id",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"User deleted successfully"});
    }catch(error){
        res.status(500).json({error:"Error deleting user"})
    }
});


// update user by id 
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true } 
    );
    res.json({message: "User update successsfully",user:updatedUser});
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});


module.exports = router;
