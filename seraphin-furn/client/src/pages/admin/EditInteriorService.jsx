import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInteriorServiceById,
  updateInteriorService,
} from "../../api/interiorService";
import { interiorServiceCategories } from "../../data/catalogData";

function EditInteriorService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    images: "",
    features: "",
    available: true,
  });

  const [loading, setLoading] = useState(true);

  const subcategories = service.category
    ? interiorServiceCategories[service.category] || []
    : [];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getInteriorServiceById(id);

        setService({
          name: data.name || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          description: data.description || "",
          images: Array.isArray(data.images) ? data.images.join(", ") : "",
          features: Array.isArray(data.features)
            ? data.features.join(", ")
            : "",
          available: Boolean(data.available),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching interior service:", error);
        alert("Interior service not found");
        navigate("/admin/interior-services");
      }
    };

    fetchService();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setService({
      ...service,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "category" ? { subcategory: "" } : {}),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateInteriorService(id, {
        ...service,
        images: service.images
          .split(",")
          .map((image) => image.trim())
          .filter(Boolean),
        features: service.features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
      });

      alert("Interior service updated successfully!");
      navigate("/admin/interior-services");
    } catch (error) {
      console.error("Error updating interior service:", error);
      alert("Failed to update interior service");
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <Container className="mt-4" style={{ maxWidth: "750px" }}>
      <h2 className="mb-4">Edit Interior Service</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Service Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={service.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Object.keys(interiorServiceCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subcategory</Form.Label>
          <Form.Select
            name="subcategory"
            value={service.subcategory}
            onChange={handleChange}
            disabled={!service.category}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={service.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Paths</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={service.images}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Add multiple image paths separated by commas.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Features</Form.Label>
          <Form.Control
            type="text"
            name="features"
            value={service.features}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Add multiple features separated by commas.
          </Form.Text>
        </Form.Group>

        <Form.Check
          className="mb-4"
          type="checkbox"
          name="available"
          label="Show this service"
          checked={service.available}
          onChange={handleChange}
        />

        <Button variant="dark" type="submit">
          Update Service
        </Button>

        <Button
          variant="secondary"
          className="ms-2"
          type="button"
          onClick={() => navigate("/admin/interior-services")}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default EditInteriorService;
