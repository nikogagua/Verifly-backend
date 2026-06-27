const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    images: [String],

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    boost: {
      plan: {
        type: String,
        enum: ["none", "basic", "premium"],
        default: "none",
      },

      startDate: Date,
      endDate: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
