import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import products from "../data/products";
import { useLocation } from "react-router-dom";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  // ✅ COMBINED FILTER (search + category)
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  // ✅ RELATED PRODUCTS
  const relatedProducts = products.filter(
    (p) =>
      p.category === filteredProducts[0]?.category &&
      !p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">

      {/* HEADING */}
      <h4>
        {search ? `Results for "${search}"` : "All Products"}
      </h4>

      {/* CATEGORY FILTER */}
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

      {/* MAIN RESULTS */}
      <Row>
        {filteredProducts.length === 0 ? (
          <p style={{ padding: "20px" }}>No products found</p>
        ) : (
          filteredProducts.map((item) => (
            <Col key={item.id} md={4}>
              <ProductCard product={item} />
            </Col>
          ))
        )}
      </Row>

      {/* ✅ RELATED PRODUCTS SECTION */}
      {filteredProducts.length > 0 && relatedProducts.length > 0 && (
        <>
          <h5 className="mt-5">Related Products</h5>

          <Row>
            {relatedProducts.slice(0, 6).map((item) => (
              <Col key={item.id} md={4}>
                <ProductCard product={item} />
              </Col>
            ))}
          </Row>
        </>
      )}

    </Container>
  );
}

export default Products;