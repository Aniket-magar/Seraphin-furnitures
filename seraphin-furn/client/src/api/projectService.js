
import API from "./api";

// Get all projects

export const getProjects = async () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error(
      "Admin token is missing. Please log in to the admin panel again."
    );
  }

  const response = await API.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// Get one project by ID
export const getProjectById = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.get(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Add a new project
export const addProject = async (project) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.post("/projects", project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update a project
export const updateProject = async (id, project) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.put(`/projects/${id}`, project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete a project
export const deleteProject = async (id) => {
  const token = localStorage.getItem("adminToken");

  const response = await API.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getPublishedProjects = async () => {
  const response = await API.get("/projects/published");
  return response.data;
};
