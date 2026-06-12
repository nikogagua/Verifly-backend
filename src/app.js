const express = require("express");
require("dotenv").config();

const connectDb = require("./config/db");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Verifly Backend is running 🚀");
});

//testing if user will be added to db by visiting /teest-user route
const User = require("./models/user");
app.get("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "test@gmail.com",
      password: "123456",
      role: "owner",
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
