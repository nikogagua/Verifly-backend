const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const mongoDbConectionString = process.env.MONGODB_URI;

const app = express();

app.get("/", (req, res) => {
  res.send("Verifly Backend is running 🚀");
});

mongoose
  .connect(mongoDbConectionString)
  .then(() => {
    console.log("MongoDB connected successfully 🚀");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed ❌", err);
  });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
