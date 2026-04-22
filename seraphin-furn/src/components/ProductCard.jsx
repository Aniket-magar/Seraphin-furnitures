import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

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
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* IMAGE */}
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* CONTENT */}
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>

        <Button
          variant="dark"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            navigate(`/product/${product.id}`);
          }}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default React.memo(ProductCard);