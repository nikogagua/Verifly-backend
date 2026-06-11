require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Verifly Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
