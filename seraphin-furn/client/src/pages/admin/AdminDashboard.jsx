
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../api/productService";
import { getInteriorServices } from "../../api/interiorService";
import { getProjects } from "../../api/projectService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productData, serviceData, projectData] = await Promise.all([
          getProducts(),
          getInteriorServices(),
          getProjects(),
        ]);

        setProducts(Array.isArray(productData) ? productData : []);
        setServices(Array.isArray(serviceData) ? serviceData : []);
        setProjects(Array.isArray(projectData) ? projectData : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Product statistics
  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) => product.available !== false
  ).length;

  const hiddenProducts = products.filter(
    (product) => product.available === false
  ).length;

  // Service and project statistics
  const totalServices = services.length;
  const totalProjects = projects.length;

  return (
    <Container className="mt-4 mb-5">
      {/* Dashboard Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome to Seraphin Furniture Admin Panel
          </p>
        </div>

        <Button
          variant="dark"
          onClick={() => navigate("/admin/products")}
        >
          Manage Products
        </Button>
      </div>

      {/* Statistics */}
      <Row className="g-4 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Total Products</h6>
              <h2>{totalProducts}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Available Products</h6>
              <h2>{availableProducts}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Hidden Products</h6>
              <h2>{hiddenProducts}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Interior Services</h6>
              <h2>{totalServices}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Total Projects</h6>
              <h2>{totalProjects}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Management Cards */}
      <h4 className="mb-3">Management</h4>

      <Row className="g-4">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <h5>Product Management</h5>

              <p className="text-muted">
                Add, edit, view, and delete furniture products.
              </p>

              <div className="mt-auto">
                <Button
                  variant="dark"
                  onClick={() => navigate("/admin/products")}
                >
                  Manage Products
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <h5>Interior Services</h5>

              <p className="text-muted">
                Add, edit, view, and delete interior design services.
              </p>

              <div className="mt-auto">
                <Button
                  variant="outline-dark"
                  onClick={() => navigate("/admin/interior-services")}
                >
                  Manage Services
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <h5>Projects Management</h5>

              <p className="text-muted">
                Showcase completed furniture installations and interior
                design projects. Add, edit, publish, and delete projects.
              </p>

              <div className="mt-auto">
                <Button
                  variant="outline-dark"
                  onClick={() => navigate("/admin/projects")}
                >
                  Manage Projects
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
