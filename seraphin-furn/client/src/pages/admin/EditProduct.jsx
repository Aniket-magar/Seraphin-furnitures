import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getProductById, updateProduct } from "../../api/productService";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);

  // Get existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          description: data.description || "",
          image: data.image || "",
          stock: data.stock || "",
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

  // Handle input changes
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
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
    <Container className="mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Edit Product</h2>

      <Form onSubmit={handleSubmit}>

        {/* Product Name */}
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

        {/* Price */}
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
        </Form.Group>

        {/* Stock */}
        <Form.Group className="mb-4">
          <Form.Label>Stock</Form.Label>

          <Form.Control
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>

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