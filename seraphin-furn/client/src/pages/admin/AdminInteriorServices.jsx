import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  deleteInteriorService,
  getInteriorServices,
} from "../../api/interiorService";
import { interiorServiceCategories } from "../../data/catalogData";

function AdminInteriorServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const data = await getInteriorServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching interior services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interior service?"
    );

    if (!confirmDelete) return;

    try {
      await deleteInteriorService(id);
      fetchServices();
    } catch (error) {
      console.error("Error deleting interior service:", error);
      alert("Failed to delete interior service");
    }
  };

  const categories = Object.keys(interiorServiceCategories);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || service.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Interior Services</h2>

        <Button
          variant="dark"
          onClick={() => navigate("/admin/interior-services/add")}
        >
          + Add Service
        </Button>
      </div>

      <Row className="mb-4 g-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search service by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={4}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <p className="text-muted">
        Showing {filteredServices.length} of {services.length} services
      </p>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredServices.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No interior services found
              </td>
            </tr>
          ) : (
            filteredServices.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.subcategory || "-"}</td>
                <td>
                  {service.available ? (
                    <span className="text-success">Available</span>
                  ) : (
                    <span className="text-danger fw-bold">Hidden</span>
                  )}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      navigate(`/admin/interior-services/edit/${service._id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminInteriorServices;
