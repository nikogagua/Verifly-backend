const express = require("express");
require("dotenv").config();

const connectDb = require("./config/db");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Verifly Backend is running 🚀");
});

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start server ❌", err);
  }
};

startServer();
