import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productService";
import { getInteriorServices } from "../../api/interiorService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productData, serviceData] = await Promise.all([
          getProducts(),
          getInteriorServices(),
        ]);

        setProducts(productData);
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Total products
  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) => product.available !== false
  ).length;

  const hiddenProducts = products.filter(
    (product) => product.available === false
  ).length;

  const totalServices = services.length;

  return (
    <Container className="mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-muted">
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

        {/* Total Products */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Total Products</h6>
              <h2>{totalProducts}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Available Products */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Available Products</h6>
              <h2>{availableProducts}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Hidden Products */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Hidden Products</h6>
              <h2>{hiddenProducts}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Categories */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Interior Services</h6>
              <h2>{totalServices}</h2>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Management Cards */}
      <Row className="g-4">

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5>Product Management</h5>

              <p className="text-muted">
                Add, edit, view and delete furniture products.
              </p>

              <Button
                variant="dark"
                onClick={() => navigate("/admin/products")}
              >
                Manage Products
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5>Interior Services</h5>

              <p className="text-muted">
                Add, edit, view and delete interior design services.
              </p>

              <Button
                variant="outline-dark"
                onClick={() => navigate("/admin/interior-services")}
              >
                Manage Services
              </Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
  );
}

export default AdminDashboard;
