const {Readable} = require("stream");
const { getBucket } = require("../middleware/db");

exports.uploadFileToBucket = (file) => {
    const bucket = getBucket();
    if (!bucket) {
      return res.status(500).json({ error: "Bucket is not initialized" });
    }
    return new Promise((resolve, reject) => {
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      const uploadStream = bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });
      uploadStream.on("error", (error) => {
        reject(error);
      });
      uploadStream.on("finish", () => {
        resolve(uploadStream.id);
      });
      readableStream.pipe(uploadStream);
    });
  };