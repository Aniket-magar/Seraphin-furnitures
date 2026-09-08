// models/InteriorService.js
const mongoose = require("mongoose");
const {
  interiorServiceCategoryNames,
  interiorServiceSubcategoryNames,
} = require("../data/catalogData");

const interiorServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: interiorServiceCategoryNames,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      enum: interiorServiceSubcategoryNames,
      trim: true,
    },
    description: {
      type: String,
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

module.exports = mongoose.model(
  "InteriorService",
  interiorServiceSchema,
  "interiorServices"
);
