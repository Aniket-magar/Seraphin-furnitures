import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import products from "../data/products";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <Container className="mt-4">
      <h1>All Products</h1>

      <div className="mb-4 d-flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "dark" : "outline-dark"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <Row>
        {filteredProducts.map((item) => (
          <Col key={item.id} md={4} className="d-flex">
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;