import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getProducts, deleteProduct } from "../../api/productService";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products
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

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // Refresh product list
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container className="mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>

        <Button
          variant="dark"
          onClick={() => navigate("/admin/products/add")}
        >
          + Add Product
        </Button>
      </div>

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
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>

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

                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>{product.category}</td>

                <td>{product.stock}</td>

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