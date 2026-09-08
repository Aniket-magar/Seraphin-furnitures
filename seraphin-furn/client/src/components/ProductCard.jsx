import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const productId = product._id || product.id;
  const productName = product.name || product.title;
  const productImage = product.images?.[0] || product.image || "/images/demo1.avif";

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        margin: "10px",
        cursor: "pointer",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
      onClick={() => navigate(`/product/${productId}`)}
    >
      {/* IMAGE */}
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={productImage}
          alt={productName}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* CONTENT */}
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>

        <Button
          variant="dark"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            navigate(`/product/${productId}`);
          }}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default React.memo(ProductCard);
