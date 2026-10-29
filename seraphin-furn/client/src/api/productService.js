
import API from "./api";

// Get all products
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// Get a product by ID
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

// Add a product
export const addProduct = async (product) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.post("/products/add", product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update a product
export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.put(`/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
