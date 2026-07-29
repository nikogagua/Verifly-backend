const express = require("express");
require("dotenv").config();

const connectDb = require("./config/db");
const app = express();
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");
const productRoutes = require("./routes/product");
const limiter = require("./middleware/rateLimit");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);

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
