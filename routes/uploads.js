const express = require("express")
const router = express.Router();
const upload = require('../middleware/uploads');

router.post("/uploads", upload.array("image", 3), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ msg: "No files uploaded" });
    }

         const imageUrls = req.files.map(file => {
        return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    res.json({ msg: "Images uploaded successfully", imageUrls });
});

module.exports = router;