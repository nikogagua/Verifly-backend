const User = require("../models/user");
const Store = require("../models/store");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role, businessName, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (cleanName.length < 3 || cleanName.length > 20) {
      return res.status(400).json({
        message: "Username must be 3-20 characters",
      });
    }

    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({ message: "invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    if (role === "owner" && (!businessName || !phone)) {
      return res.status(400).json({
        message: "Business name and phone are required for shop owners",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: role === "owner" ? "owner" : "explorer",
    });
    let store = null;

    if (role === "owner") {
      store = await Store.create({
        owner: user._id,
        name: businessName,
        phone,
      });
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      store,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const cleanEmail = email.trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
