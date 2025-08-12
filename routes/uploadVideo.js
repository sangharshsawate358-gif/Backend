const express = require("express");
const router = express.Router();
const upload = require("./../middleware/uploads");

// Upload a single video file (field name should be "video")
router.post("/uploadvideo", upload.array("video",3), (req, res) => {
  if (!req.files || req.files.length === 0 ) {
    return res.status(400).json({ msg: "No video uploaded" });
  }

  const videoUrl = req.files.map(file => {
        return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });
  res.json({ msg: "Video uploaded successfully", videoUrl });
});

module.exports = router;