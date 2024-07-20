const mongoose = require("mongoose");
const { uploadFileToBucket } = require("../helpers/uploadPhoto");
const { getBucket } = require("../middleware/db");
const Screenshot = require("../models/Screenshot");
const ObjectId = mongoose.Types.ObjectId;
exports.uploadScreenshot = async (req, res) => {
  try {
    const { userId } = req.body;
    const screenshot = req.file;

    if (!userId) {
      return res.status(400).json("Please provide a userId");
    }
    if (!screenshot) {
      return res.status(400).json("Please upload a file");
    }
    const screenshotId = await uploadFileToBucket(screenshot);
    const newScreenshot = new Screenshot({
      userId,
      photoId: screenshotId,
    });
    await newScreenshot.save();
    res.status(201).json({
      message: "Screenshot uploaded successfully",
      data: newScreenshot,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.downloadScreenshot = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json("Please provide a userId");
    }
    const screenshots = await Screenshot.find({ userId });
    if (!screenshots || screenshots.length === 0) {
      return res.status(404).json("Screenshots not found");
    }
    const imagesUrls = screenshots.map((screenshot) => ({
      id: screenshot._id,
      url: `http://localhost:4000/screenshots/image/${screenshot.photoId}`,
    }));
    res.status(200).json({ screenshots: imagesUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.fetchImage = async (req, res) => {
  try {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }

    const { photoId } = req.params;
    if (!photoId) {
      return res.status(400).json("Please provide a fileId");
    }
    const photoObject = new ObjectId(photoId);

    const downloadStream = bucket.openDownloadStream(photoObject);
    downloadStream.on("error", (error) => {
      console.log(error);
      res.status(500).json("Error occurred while streaming the file");
    });

    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
