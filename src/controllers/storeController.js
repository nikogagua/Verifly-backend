const Store = require("../models/store");

exports.createStore = async (req, res, next) => {
  try {
    const existingStore = await Store.findOne({
      owner: req.user.userId,
    });

    if (existingStore) {
      return res.status(400).json({
        message: "User already has a store",
      });
    }

    const store = await Store.create({
      owner: req.user.userId,
      ...req.body,
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
