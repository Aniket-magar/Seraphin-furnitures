import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addInteriorService } from "../../api/interiorService";
import { interiorServiceCategories } from "../../data/catalogData";

function AddInteriorService() {
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

  const subcategories = service.category
    ? interiorServiceCategories[service.category] || []
    : [];

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
      await addInteriorService({
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

      alert("Interior service added successfully!");
      navigate("/admin/interior-services");
    } catch (error) {
      console.error("Error adding interior service:", error);
      alert("Failed to add interior service");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "750px" }}>
      <h2 className="mb-4">Add Interior Service</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Service Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            placeholder="Complete Home Interior"
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
            placeholder="Describe the interior service"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Paths</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={service.images}
            onChange={handleChange}
            placeholder="/images/demo1.avif, /images/demo2.avif"
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
            placeholder="Space planning, 3D design, Custom furniture"
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
          Add Service
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

export default AddInteriorService;
