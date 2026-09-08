import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getProductById, updateProduct } from "../../api/productService";
import { useNavigate, useParams } from "react-router-dom";
import { productCategories } from "../../data/catalogData";

function EditProduct() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);

  const subcategories = product.category
    ? productCategories[product.category] || []
    : [];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          description: data.description || "",
          images: Array.isArray(data.images)
            ? data.images.join(", ")
            : data.image || "",
          features: Array.isArray(data.features)
            ? data.features.join(", ")
            : "",
          specifications:
            typeof data.specifications?.details === "string"
              ? data.specifications.details
              : "",
          available: data.available !== false,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Product not found");
        navigate("/admin/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
      await updateProduct(id, {
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

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <Container className="mt-4" style={{ maxWidth: "750px" }}>
      <h2 className="mb-4">Edit Product</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Features</Form.Label>
          <Form.Control
            type="text"
            name="features"
            value={product.features}
            onChange={handleChange}
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
          Update Product
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

export default EditProduct;
