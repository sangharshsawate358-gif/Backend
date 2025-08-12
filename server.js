// server.js

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const path = require("path");


// Middleware to parse JSON 
app.use(express.json());

// Import routes
const videoUploadRoute = require("./routes/uploadVideo");

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use("/api", videoUploadRoute);



// Static folder for image access
app.use("/uploads", express.static("uploads")); //  allow access to uploaded files


// mongodb connection
app.use(express.json());
// in password @ converted into %40
const mongourl = "mongodb+srv://ghorbandkedar8:kedar%401234@cluster0.yxq1nrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.error("MongoDB Connection error:", err);
  });


//test route (get /)
app.get("/", (req, res) => {
  res.send("API is working");
});


//mount user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);



// Image upload route
const uploadRoute = require("./routes/uploads"); //  import upload route
app.use("/api", uploadRoute); //  mount it on /api/upload



//start server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:${PORT}");
});




