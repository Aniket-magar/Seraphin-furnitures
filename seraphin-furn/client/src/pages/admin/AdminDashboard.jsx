import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Total products
  const totalProducts = products.length;

  // Total stock
  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  // Out of stock
  const outOfStock = products.filter(
    (product) => Number(product.stock || 0) === 0
  ).length;

  // Unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].filter(Boolean);

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

        {/* Total Stock */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Total Stock</h6>
              <h2>{totalStock}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Out of Stock */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Out of Stock</h6>
              <h2>{outOfStock}</h2>
            </Card.Body>
          </Card>
        </Col>

        {/* Categories */}
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted">Categories</h6>
              <h2>{categories.length}</h2>
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
              <h5>Add New Product</h5>

              <p className="text-muted">
                Add a new furniture product to the Seraphin store.
              </p>

              <Button
                variant="outline-dark"
                onClick={() => navigate("/admin/products/add")}
              >
                + Add Product
              </Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
  );
}

export default AdminDashboard;