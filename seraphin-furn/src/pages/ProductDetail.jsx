import { useParams } from "react-router-dom";
import products from "../data/products";
import { Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();

  // ✅ Fix ID mismatch (string vs number)
  const product = products.find((p) => p.id.toString() === id);

  const { addToCart } = useContext(CartContext);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Product not found</h2>;
  }

  return (
    <Container className="mt-5">
      <h1>{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "400px",
          margin: "20px 0",
          borderRadius: "12px",
        }}
      />

      <h3>₹{product.price}</h3>

      <p style={{ marginTop: "10px" }}>{product.description}</p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <Button
        variant="dark"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>
    </Container>
  );
}

export default ProductDetail;