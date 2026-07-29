const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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
    category: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
    address: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    primaryColor: { type: String, default: "#000000" },
    secondaryColor: { type: String, default: "#ffffff" },
    backgroundImage: { type: String, default: "" },

    isVerified: {
      type: Boolean,
      default: false,
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
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Store", storeSchema);
