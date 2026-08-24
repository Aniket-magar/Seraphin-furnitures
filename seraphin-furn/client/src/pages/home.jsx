import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import CustomCarousel from "../components/CustomCarousel";
import products from "../data/products";

function Home() {
  // Show only featured products (first 3 for now)
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      {/* HERO SECTION */}
      <CustomCarousel />

      {/* FEATURED PRODUCTS */}
      <Container className="mt-5">
        <h2 className="mb-4">Featured Products</h2>

        <Row>
          {featuredProducts.map((item) => (
            <Col key={item.id} md={4}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;