import API from "./api";

// GET all products
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// GET single product
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

// ADD product
export const addProduct = async (productData) => {
  const response = await API.post("/products/add", productData);
  return response.data;
};

// UPDATE product
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

// DELETE product
export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};