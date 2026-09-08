import API from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getInteriorServices = async () => {
  const response = await API.get("/interior-services");
  return response.data;
};

export const getInteriorServiceById = async (id) => {
  const response = await API.get(`/interior-services/${id}`);
  return response.data;
};

export const addInteriorService = async (service) => {
  const response = await API.post(
    "/interior-services/add",
    service,
    getAuthHeaders()
  );
  return response.data;
};

export const updateInteriorService = async (id, service) => {
  const response = await API.put(
    `/interior-services/${id}`,
    service,
    getAuthHeaders()
  );
  return response.data;
};

export const deleteInteriorService = async (id) => {
  const response = await API.delete(
    `/interior-services/${id}`,
    getAuthHeaders()
  );
  return response.data;
};
