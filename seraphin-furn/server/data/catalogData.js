const productCategories = {
  "Home Furniture": [
    "Modular Kitchen",
    "Wardrobe",
    "Bed",
    "Sofa Set",
    "TV Unit",
    "Bookshelf",
    "Study Table",
    "Computer Table",
    "Gaming Setup",
  ],
  "Commercial Furniture": [
    "Office Furniture",
    "Bank Furniture",
    "Modular Workstation",
    "Office Tables",
    "Seating",
    "Storage Solutions",
    "Display Racks",
    "Partitions",
  ],
  "Doors & Windows": [
    "Flush Door",
    "PVC Door",
    "HDHMR Door",
    "WPC Door",
    "Wooden Door",
    "uPVC Window",
  ],
  Glass: ["Toughened Glass"],
};

const interiorServiceCategories = {
  "Residential Interior": [
    "Complete Home Interior",
    "Gaming Room",
    "Spiritual & Wellness Room",
    "Home Theatre",
    "Wall Panelling",
    "PVC False Ceiling",
    "Flooring",
    "Elevation",
  ],
  "Commercial Interior": [
    "Office Interior",
    "Bank Interior",
    "Retail Store Interior",
    "Cafe & Restaurant Interior",
    "Hospital & Clinic Interior",
    "Co-living Interior",
    "Hostel / PG Interior",
    "Hotel Interior",
  ],
};

const productCategoryNames = Object.keys(productCategories);
const productSubcategoryNames = Object.values(productCategories).flat();
const interiorServiceCategoryNames = Object.keys(interiorServiceCategories);
const interiorServiceSubcategoryNames = Object.values(
  interiorServiceCategories
).flat();

module.exports = {
  productCategories,
  productCategoryNames,
  productSubcategoryNames,
  interiorServiceCategories,
  interiorServiceCategoryNames,
  interiorServiceSubcategoryNames,
};
