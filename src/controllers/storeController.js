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

    const {
      name,
      description,
      category,
      phone,
      socials,
      address,
      logo,
      primaryColor,
      secondaryColor,
      backgroundImage,
    } = req.body;
    const store = await Store.create({
      owner: req.user.userId,
      name,
      description,
      category,
      phone,
      socials,
      address,
      logo,
      primaryColor,
      secondaryColor,
      backgroundImage,
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

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.status(200).json({
      stores,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.myStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({ owner: req.user.userId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ store });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.editStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({ owner: req.user.userId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.name = req.body.name || store.name;
    store.description = req.body.description || store.description;
    store.category = req.body.category || store.category;
    store.phone = req.body.phone || store.phone;
    store.socials = req.body.socials || store.socials;
    store.address = req.body.address || store.address;
    store.logo = req.body.logo || store.logo;
    store.primaryColor = req.body.primaryColor || store.primaryColor;
    store.secondaryColor = req.body.secondaryColor || store.secondaryColor;
    store.backgroundImage = req.body.backgroundImage || store.backgroundImage;

    await store.save();

    res.status(200).json({
      message: "Store updated successfully",
      store,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const store = await Store.findOneAndDelete({
      owner: req.user.userId,
    });
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.status(200).json({
      message: "Store deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
