import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addProduct } from "../../api/productService";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      alert("Product added successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Add Product</h2>

      <Form onSubmit={handleSubmit}>

        {/* Product Name */}
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>

          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>

          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </Form.Group>

        {/* Category */}
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>

          <Form.Select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Dining">Dining</option>
            <option value="Office">Office</option>
            <option value="Living Room">Living Room</option>
          </Form.Select>
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>

          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </Form.Group>

        {/* Image */}
        <Form.Group className="mb-3">
          <Form.Label>Image Path</Form.Label>

          <Form.Control
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="/images/demo1.avif"
            required
          />

          <Form.Text className="text-muted">
            Example: /images/demo1.avif
          </Form.Text>
        </Form.Group>

        {/* Stock */}
        <Form.Group className="mb-4">
          <Form.Label>Stock</Form.Label>

          <Form.Control
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Add Product
        </Button>

        <Button
          variant="secondary"
          className="ms-2"
          type="button"
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </Button>

      </Form>
    </Container>
  );
}

export default AddProduct;