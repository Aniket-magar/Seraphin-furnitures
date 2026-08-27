import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import { getProducts, deleteProduct } from "../../api/productService";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Get unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].filter(Boolean);

  // Search + category filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>

        <Button
          variant="dark"
          onClick={() => navigate("/admin/products/add")}
        >
          + Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <Row className="mb-4 g-3">

        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search product by name..."
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

      {/* Product Count */}
      <p className="text-muted">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Products Table */}
      <Table striped bordered hover responsive>

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No products found
              </td>
            </tr>
          ) : (

            filteredProducts.map((product) => (
              <tr key={product._id}>

                {/* Image */}
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                {/* Name */}
                <td>{product.name}</td>

                {/* Price */}
                <td>₹{product.price}</td>

                {/* Category */}
                <td>{product.category}</td>

                {/* Stock */}
                <td>
                  {Number(product.stock) === 0 ? (
                    <span className="text-danger fw-bold">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-success">
                      {product.stock}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td>

                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      navigate(`/admin/products/edit/${product._id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
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

export default AdminProducts;