
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";

import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../../api/projectService";

const initialForm = {
  title: "",
  category: "Residential",
  location: "",
  shortDescription: "",
  description: "",
  coverImage: "",
  imagesText: "",
  completionDate: "",
  status: "Draft",
  featured: false,
};

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load projects. Check your admin login and backend."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title || "",
      category: project.category || "Residential",
      location: project.location || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      coverImage: project.coverImage || "",
      imagesText: Array.isArray(project.images)
        ? project.images.join("\n")
        : "",
      completionDate: project.completionDate
        ? new Date(project.completionDate).toISOString().slice(0, 10)
        : "",
      status: project.status || "Draft",
      featured: Boolean(project.featured),
    });

    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    const images = form.imagesText
      .split(/[\n,]+/)
      .map((image) => image.trim())
      .filter(Boolean);

    const projectData = {
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      coverImage: form.coverImage.trim(),
      images,
      completionDate: form.completionDate || null,
      status: form.status,
      featured: form.featured,
    };

    try {
      if (editingId) {
        await updateProject(editingId, projectData);
        setSuccess("Project updated successfully.");
      } else {
        await addProject(projectData);
        setSuccess("Project added successfully.");
      }

      setForm(initialForm);
      setEditingId(null);
      await fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
      setError(
        err.response?.data?.message ||
          "Could not save the project. Please check the form and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteProject(project._id);

      setSuccess("Project deleted successfully.");

      if (editingId === project._id) {
        setForm(initialForm);
        setEditingId(null);
      }

      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(
        err.response?.data?.message ||
          "Could not delete the project."
      );
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2>Projects Management</h2>
          <p className="text-muted mb-0">
            Manage SERAPHIN Furniture's completed interior and furniture
            projects.
          </p>
        </div>

        <Button variant="outline-dark" onClick={fetchProjects}>
          Refresh Projects
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccess("")}
        >
          {success}
        </Alert>
      )}

      {/* Add/Edit Project Form */}
      <Card className="shadow-sm border-0 mb-5">
        <Card.Body className="p-4">
          <h4 className="mb-4">
            {editingId ? "Edit Project" : "Add New Project"}
          </h4>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Project Title *</Form.Label>
                  <Form.Control
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxury 3BHK Residence"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Office">Office</option>
                    <option value="Custom Furniture">Custom Furniture</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Pune, Maharashtra"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Completion Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="completionDate"
                    value={form.completionDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleChange}
                    placeholder="A brief introduction shown on the project gallery."
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Full Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the design, materials, furniture, and project details."
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Cover Image URL *</Form.Label>
                  <Form.Control
                    type="url"
                    name="coverImage"
                    value={form.coverImage}
                    onChange={handleChange}
                    placeholder="https://example.com/project-cover.jpg"
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter a direct image URL. This form does not upload files.
                  </Form.Text>
                </Form.Group>
              </Col>

              {form.coverImage.trim() && (
                <Col xs={12}>
                  <p className="text-muted mb-2">Cover image preview</p>
                  <img
                    src={form.coverImage}
                    alt="Project cover preview"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.display = "block";
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "320px",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Col>
              )}

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Additional Gallery Image URLs</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="imagesText"
                    value={form.imagesText}
                    onChange={handleChange}
                    placeholder={
                      "Enter one image URL per line\nhttps://example.com/image-2.jpg\nhttps://example.com/image-3.jpg"
                    }
                  />
                  <Form.Text className="text-muted">
                    You can enter one URL per line or separate URLs with commas.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Publication Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Draft">Draft — hidden from visitors</option>
                    <option value="Published">Published — visible publicly</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6} className="d-flex align-items-end">
                <Form.Check
                  type="switch"
                  id="project-featured"
                  name="featured"
                  label="Feature this project"
                  checked={form.featured}
                  onChange={handleChange}
                />
              </Col>

              <Col xs={12} className="d-flex flex-wrap gap-2 mt-4">
                <Button type="submit" variant="dark" disabled={saving}>
                  {saving ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : editingId ? (
                    "Update Project"
                  ) : (
                    "Add Project"
                  )}
                </Button>

                {editingId && (
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={resetForm}
                    disabled={saving}
                  >
                    Cancel Edit
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Existing Projects */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Existing Projects</h4>
        <Badge bg="dark">{projects.length} projects</Badge>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="text-muted mt-2">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <h5>No projects added yet</h5>
            <p className="text-muted mb-0">
              Use the form above to add your first SERAPHIN project.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-responsive">
          <Table bordered hover responsive="sm" className="bg-white align-middle">
            <thead className="table-light">
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Featured</th>
                <th style={{ minWidth: "160px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      {project.coverImage && (
                        <img
                          src={project.coverImage}
                          alt=""
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          style={{
                            width: "64px",
                            height: "52px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                      <strong>{project.title}</strong>
                    </div>
                  </td>

                  <td>{project.category}</td>
                  <td>{project.location || "—"}</td>

                  <td>
                    <Badge
                      bg={project.status === "Published" ? "success" : "secondary"}
                    >
                      {project.status || "Draft"}
                    </Badge>
                  </td>

                  <td>{project.featured ? "Yes" : "No"}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(project)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}

export default AdminProjects;
