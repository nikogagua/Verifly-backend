const express = require("express");
require("dotenv").config();

const connectDb = require("./config/db");
const app = express();
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);

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
