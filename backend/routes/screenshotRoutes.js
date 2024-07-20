const express = require("express");
const { upload } = require("../middleware/db");
const { uploadScreenshot, downloadScreenshot, fetchImage } = require("../controllers/screenshotController");
const router = express.Router();

router.post("/", upload.single("screenshot"), uploadScreenshot);
router.get("/:userId", downloadScreenshot);
router.get('/image/:photoId', fetchImage);

module.exports = router;
