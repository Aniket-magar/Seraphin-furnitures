import { Card, Button } from "react-bootstrap";

function ProductCard({ product }) {
  if (!product) return <p>No product data</p>;

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
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
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <div>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>₹{product.price}</Card.Text>
        </div>

        <Button variant="dark" className="mt-3">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;