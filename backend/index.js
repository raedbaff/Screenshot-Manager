const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./middleware/db")
const screenshotRouter = require("./routes/screenshotRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/screenshots", screenshotRouter);

app.get("/", (req, res) => {
  res.send('hello world');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});




