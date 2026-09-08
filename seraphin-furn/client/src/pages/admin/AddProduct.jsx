import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { addProduct } from "../../api/productService";
import { useNavigate } from "react-router-dom";
import { productCategories } from "../../data/catalogData";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
    images: "",
    features: "",
    specifications: "",
    available: true,
  });

  const subcategories = product.category
    ? productCategories[product.category] || []
    : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "category" ? { subcategory: "" } : {}),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        ...product,
        price: Number(product.price),
        images: product.images
          .split(",")
          .map((image) => image.trim())
          .filter(Boolean),
        features: product.features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
        specifications: product.specifications
          ? { details: product.specifications }
          : {},
      });

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "750px" }}>
      <h2 className="mb-4">Add Product</h2>

      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Object.keys(productCategories).map((category) => (
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
            value={product.subcategory}
            onChange={handleChange}
            required
            disabled={!product.category}
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
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Paths</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={product.images}
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
            value={product.features}
            onChange={handleChange}
            placeholder="Custom size, Premium finish, Soft close"
          />
          <Form.Text className="text-muted">
            Add multiple features separated by commas.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specifications</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="specifications"
            value={product.specifications}
            onChange={handleChange}
            placeholder="Material, finish, size, warranty, or other details"
          />
        </Form.Group>

        <Form.Check
          className="mb-4"
          type="checkbox"
          name="available"
          label="Show this product"
          checked={product.available}
          onChange={handleChange}
        />

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
