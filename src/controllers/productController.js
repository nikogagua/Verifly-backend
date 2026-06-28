const Product = require("../models/product");
const Store = require("../models/store");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getPublicProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.myProducts = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      owner: req.user.userId,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }
    const products = await Product.find({ store: store._id });

    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.userId,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const product = await Product.findOne({
      _id: req.params.productId,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.userId,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const product = await Product.findOne({
      _id: req.params.productId,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.images = req.body.images ?? product.images;
    product.category = req.body.category ?? product.category;
    product.stock = req.body.stock ?? product.stock;
    product.isActive = req.body.isActive ?? product.isActive;

    await product.save();

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const store = await Store.findOne({
      owner: req.user.userId,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      owner: req.user.userId,
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const { name, description, price, images, category, stock, isActive } =
      req.body;

    const product = await Product.create({
      store: store._id,
      name,
      description,
      price,
      images,
      category,
      stock,
      isActive,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
