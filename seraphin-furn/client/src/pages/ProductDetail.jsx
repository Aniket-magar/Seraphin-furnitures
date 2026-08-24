import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { getProductById } from "../api/productService";

function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <Container className="mt-5">
      <h1>{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
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

      <Button variant="dark" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>

      <Button className="ms-2" onClick={() => navigate(-1)}>
        ← Back
      </Button>
    </Container>
  );
}

export default ProductDetail;