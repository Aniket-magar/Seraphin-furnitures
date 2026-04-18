import { Card, Button } from "react-bootstrap";

function ProductCard({ product }) {
  if (!product) return <p>No product data</p>;

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>₹{product.price}</Card.Text>
        <Button variant="outline-success">Success</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;