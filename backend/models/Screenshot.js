const mongoose = require("mongoose");

const ScreenshotSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    photoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
      required: [true, "photo required"],
    },
  },
  { timestamps: true }
);
const Screenshot = mongoose.model("Screenshot", ScreenshotSchema);
module.exports = Screenshot;
