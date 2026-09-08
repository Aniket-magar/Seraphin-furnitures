const mongoose = require("mongoose");
const {
  productCategoryNames,
  productSubcategoryNames,
} = require("../data/catalogData");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: productCategoryNames,
      trim: true,
    },

    subcategory: {
      type: String,
      required: true,
      enum: productSubcategoryNames,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
