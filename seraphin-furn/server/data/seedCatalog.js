require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/product");
const InteriorService = require("../models/InteriorService");
const {
  productCategories,
  interiorServiceCategories,
} = require("./catalogData");

const imagePool = [
  "/images/demo1.avif",
  "/images/demo2.avif",
  "/images/demo3.avif",
  "/images/demo4.avif",
  "/images/demo5.jpg",
];

const productPrices = {
  "Modular Kitchen": 85000,
  Wardrobe: 45000,
  Bed: 32000,
  "Sofa Set": 55000,
  "TV Unit": 26000,
  Bookshelf: 18000,
  "Study Table": 16000,
  "Computer Table": 18000,
  "Gaming Setup": 70000,
  "Office Furniture": 65000,
  "Bank Furniture": 90000,
  "Modular Workstation": 42000,
  "Office Tables": 24000,
  Seating: 12000,
  "Storage Solutions": 22000,
  "Display Racks": 28000,
  Partitions: 20000,
  "Flush Door": 9000,
  "PVC Door": 7500,
  "HDHMR Door": 12500,
  "WPC Door": 11000,
  "Wooden Door": 18000,
  "uPVC Window": 15000,
  "Toughened Glass": 4500,
};

const makeProductName = (subcategory) => `Custom ${subcategory}`;

const makeProductDescription = (category, subcategory) =>
  `Premium ${subcategory.toLowerCase()} solution from Seraphin for ${category.toLowerCase()}, designed with durable materials, clean finishing, and custom sizing.`;

const makeServiceDescription = (category, subcategory) =>
  `Seraphin ${subcategory.toLowerCase()} service for ${category.toLowerCase()}, including layout planning, material selection, custom furniture coordination, and execution support.`;

const products = Object.entries(productCategories).flatMap(
  ([category, subcategories], categoryIndex) =>
    subcategories.map((subcategory, subcategoryIndex) => ({
      name: makeProductName(subcategory),
      category,
      subcategory,
      description: makeProductDescription(category, subcategory),
      price: productPrices[subcategory] || 25000,
      images: [imagePool[(categoryIndex + subcategoryIndex) % imagePool.length]],
      features: [
        "Custom design",
        "Premium finish",
        "Durable materials",
        "Professional installation",
      ],
      specifications: {
        material: "Custom as per requirement",
        finish: "Matte, glossy, laminate, veneer, or polish options",
        warranty: "As per selected material and hardware",
      },
      available: true,
    }))
);

const interiorServices = Object.entries(interiorServiceCategories).flatMap(
  ([category, subcategories], categoryIndex) =>
    subcategories.map((subcategory, subcategoryIndex) => ({
      name: subcategory,
      category,
      subcategory,
      description: makeServiceDescription(category, subcategory),
      images: [imagePool[(categoryIndex + subcategoryIndex) % imagePool.length]],
      features: [
        "Space planning",
        "Concept design",
        "Furniture customization",
        "Execution support",
      ],
      specifications: {
        scope: "Design consultation, planning, material guidance, and execution",
        suitableFor: category,
      },
      available: true,
    }))
);

const upsertCatalog = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in server/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  for (const product of products) {
    await Product.findOneAndUpdate(
      {
        category: product.category,
        subcategory: product.subcategory,
        name: product.name,
      },
      product,
      { upsert: true, returnDocument: "after", runValidators: true }
    );
  }

  for (const service of interiorServices) {
    await InteriorService.findOneAndUpdate(
      {
        category: service.category,
        subcategory: service.subcategory,
        name: service.name,
      },
      service,
      { upsert: true, returnDocument: "after", runValidators: true }
    );
  }

  console.log(`Seeded ${products.length} products`);
  console.log(`Seeded ${interiorServices.length} interior services`);
};

upsertCatalog()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error(error);
    await mongoose.disconnect();
    process.exit(1);
  });
