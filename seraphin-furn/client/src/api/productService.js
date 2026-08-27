import API from "./api";

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (product) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.post("/products/add", product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.put(`/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};