import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { getProductById, getProducts } from "../api/productService";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setProduct(null);
        setError(false);
        setActiveImage(0);
        setQuantity(1);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ SIMILAR PRODUCTS (same category, excluding current item)
  useEffect(() => {
    if (!product) return;

    const fetchSimilar = async () => {
      try {
        const all = await getProducts();
        const matches = all.filter(
          (p) =>
            p._id !== product._id &&
            p.available !== false &&
            (p.subcategory === product.subcategory ||
              p.category === product.category)
        );
        setSimilarProducts(matches.slice(0, 4));
      } catch (err) {
        console.error("Error fetching similar products:", err);
      }
    };

    fetchSimilar();
  }, [product]);

  if (error) {
    return (
      <div className="sr-detail">
        <style>{`
          .sr-detail { background: #F6F3EE; min-height: 100vh; color: #232019; }
        `}</style>
        <Container className="py-5 text-center">
          <h2>Product not found</h2>
          <p className="text-muted mb-4">
            The product you're looking for may have been removed or is unavailable.
          </p>
          <button className="sr-btn-outline" onClick={() => navigate("/products")}>
            ← Back to Products
          </button>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="sr-detail">
        <style>{`
          .sr-detail { background: #F6F3EE; min-height: 100vh; color: #232019; }
          .sr-skeleton {
            background: linear-gradient(90deg, #EFEAE1 25%, #F6F3EE 37%, #EFEAE1 63%);
            background-size: 400% 100%;
            animation: sr-shimmer 1.4s ease infinite;
            border-radius: 10px;
          }
          @keyframes sr-shimmer {
            0% { background-position: 100% 50%; }
            100% { background-position: 0 50%; }
          }
        `}</style>
        <Container className="py-5">
          <Row>
            <Col md={6}>
              <div className="sr-skeleton" style={{ height: "420px" }} />
            </Col>
            <Col md={6}>
              <div className="sr-skeleton mb-3" style={{ height: "32px", width: "70%" }} />
              <div className="sr-skeleton mb-3" style={{ height: "24px", width: "30%" }} />
              <div className="sr-skeleton" style={{ height: "100px" }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [product.image || "/images/demo1.avif"];

  const specEntries = product.specifications
    ? Object.entries(product.specifications).filter(([, v]) => v)
    : [];

  return (
    <div className="sr-detail">
      <style>{`
        .sr-detail {
          background: #F6F3EE;
          min-height: 100vh;
          padding-bottom: 4rem;
          color: #232019;
        }
        .sr-breadcrumb {
          font-size: 0.85rem;
          color: #7A7166;
          padding: 1.5rem 0 0.5rem;
        }
        .sr-breadcrumb a {
          color: #7A7166;
          text-decoration: none;
        }
        .sr-breadcrumb a:hover {
          color: #A8763E;
        }
        .sr-breadcrumb .current {
          color: #232019;
          font-weight: 500;
        }
        .sr-gallery-main {
          width: 100%;
          height: 440px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid #E4DED2;
          background: #FFFFFF;
        }
        .sr-thumb-row {
          display: flex;
          gap: 0.6rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }
        .sr-thumb {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid transparent;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 0.15s ease, border-color 0.15s ease;
        }
        .sr-thumb:hover {
          opacity: 1;
        }
        .sr-thumb.active {
          border-color: #A8763E;
          opacity: 1;
        }
        .sr-category-tag {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 500;
          color: #A8763E;
          background: #F0E6D6;
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }
        .sr-title {
          font-size: 1.9rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 0.4rem;
        }
        .sr-price {
          font-size: 1.6rem;
          font-weight: 600;
          color: #232019;
          margin-bottom: 1.1rem;
        }
        .sr-desc {
          color: #4A443B;
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }
        .sr-qty {
          display: inline-flex;
          align-items: center;
          border: 1px solid #D8D0C0;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 0.75rem;
        }
        .sr-qty button {
          background: #FFFFFF;
          border: none;
          width: 38px;
          height: 42px;
          font-size: 1.1rem;
          color: #232019;
          cursor: pointer;
        }
        .sr-qty button:hover {
          background: #EFEAE1;
        }
        .sr-qty span {
          width: 40px;
          text-align: center;
          font-weight: 500;
        }
        .sr-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin: 1.5rem 0;
        }
        .sr-btn-primary {
          background: #232019;
          border: 1px solid #232019;
          color: #F6F3EE;
          font-weight: 500;
          border-radius: 8px;
          padding: 0.65rem 1.6rem;
          transition: background 0.15s ease;
        }
        .sr-btn-primary:hover {
          background: #A8763E;
          border-color: #A8763E;
          color: #FFFFFF;
        }
        .sr-btn-outline {
          background: transparent;
          border: 1px solid #D8D0C0;
          color: #4A443B;
          font-weight: 500;
          border-radius: 8px;
          padding: 0.65rem 1.4rem;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .sr-btn-outline:hover {
          border-color: #232019;
          color: #232019;
        }
        .sr-section {
          margin-top: 2.25rem;
          padding-top: 1.75rem;
          border-top: 1px solid #E4DED2;
        }
        .sr-section h5 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .sr-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sr-features li {
          background: #FFFFFF;
          border: 1px solid #E4DED2;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 0.85rem;
          color: #4A443B;
        }
        .sr-spec-table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          border: 1px solid #E4DED2;
          border-radius: 8px;
          overflow: hidden;
        }
        .sr-spec-table tr:not(:last-child) td {
          border-bottom: 1px solid #E4DED2;
        }
        .sr-spec-table td {
          padding: 0.65rem 1rem;
          font-size: 0.9rem;
        }
        .sr-spec-table td:first-child {
          color: #7A7166;
          width: 40%;
          text-transform: capitalize;
        }
        .sr-spec-table td:last-child {
          color: #232019;
          font-weight: 500;
        }
        .sr-similar h5 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
      `}</style>

      <Container>
        {/* BREADCRUMB */}
        <div className="sr-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
          {product.category && (
            <>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                {product.category}
              </Link>{" "}
              /{" "}
            </>
          )}
          <span className="current">{product.name}</span>
        </div>

        <Row className="pt-3">
          {/* IMAGE GALLERY */}
          <Col md={6}>
            <img
              src={images[activeImage]}
              alt={product.name}
              className="sr-gallery-main"
            />
            {images.length > 1 && (
              <div className="sr-thumb-row">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className={`sr-thumb ${activeImage === idx ? "active" : ""}`}
                    onClick={() => setActiveImage(idx)}
                  />
                ))}
              </div>
            )}
          </Col>

          {/* DETAILS */}
          <Col md={6}>
            {product.category && (
              <span className="sr-category-tag">
                {product.subcategory
                  ? `${product.category} · ${product.subcategory}`
                  : product.category}
              </span>
            )}

            <h1 className="sr-title">{product.name}</h1>

            {product.price != null && (
              <div className="sr-price">₹{product.price.toLocaleString("en-IN")}</div>
            )}

            {product.description && <p className="sr-desc">{product.description}</p>}

            <div className="sr-actions">
              <div className="sr-qty">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button
                className="sr-btn-primary"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>

              <button className="sr-btn-outline" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>

            {/* FEATURES */}
            {product.features?.length > 0 && (
              <div className="sr-section">
                <h5>Features</h5>
                <ul className="sr-features">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SPECIFICATIONS */}
            {specEntries.length > 0 && (
              <div className="sr-section">
                <h5>Specifications</h5>
                <table className="sr-spec-table">
                  <tbody>
                    {specEntries.map(([key, value]) => (
                      <tr key={key}>
                        <td>{key.replace(/([A-Z])/g, " $1")}</td>
                        <td>{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Col>
        </Row>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <div className="sr-section sr-similar">
            <h5>Similar Products</h5>
            <Row className="g-4">
              {similarProducts.map((item) => (
                <Col key={item._id} md={3} sm={6}>
                  <ProductCard product={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductDetail;