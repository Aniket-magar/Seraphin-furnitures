import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import products from "../data/products";

function Products() {
  return (
    <Container className="mt-4">
      <h1>All Products</h1>

      <Row>
        {products.map((item) => (
          <Col key={item.id} md={4}>
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;