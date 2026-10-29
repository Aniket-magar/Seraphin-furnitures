
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProducts } from "../api/productService";
import "./Bestseller.css";

function Bestsellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchBestsellers = async () => {
      try {
        const data = await getProducts();

        // Support APIs that return either an array or { products: [...] }.
        const allProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];

        const bestsellers = allProducts.filter(
          (product) =>
            product.isBestSeller === true &&
            product.available !== false
        );

        if (isMounted) {
          setProducts(bestsellers);
          setError("");
        }
      } catch (err) {
        console.error("Error fetching bestsellers:", err);

        if (isMounted) {
          setError(
            "We couldn't load our collection. Please try again later."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBestsellers();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);

  const getProductId = (product) => product._id || product.id;

  const getProductName = (product) =>
    product.name || product.title || "Furniture";

  const getProductImage = (product) =>
    product.images?.find(
      (image) => typeof image === "string" && image.trim() !== ""
    ) ||
    product.image ||
    "/images/demo1.avif";

  return (
    <main className="best-page">
      {/* Hero section */}
      <section className="best-hero">
        <Container>
          <p className="best-eyebrow">THE SERAPHIN EDIT</p>

          <h1>Our Bestsellers</h1>

          <p className="best-hero-description">
            Considered design. Exceptional comfort. Timeless furniture
            crafted to make every space feel like home.
          </p>

          <span className="best-hero-line" />
        </Container>
      </section>

      {/* Bestselling products */}
      <section className="best-collection">
        <Container>
          {loading ? (
            <div className="best-status">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">
                  Loading bestsellers...
                </span>
              </Spinner>
              <p>Curating your collection...</p>
            </div>
          ) : error ? (
            <div className="best-status best-error">
              <h2>Something went wrong</h2>
              <p>{error}</p>
              <button
                type="button"
                className="best-button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="best-status">
              <p className="best-eyebrow">A NOTE FROM SERAPHIN</p>

              <h2>A collection in the making</h2>

              <p>
                Our bestselling pieces are being curated. In the meantime,
                explore our complete furniture collection.
              </p>

              <Link to="/products" className="best-button">
                Explore all products
                <span aria-hidden="true"> ↗</span>
              </Link>
            </div>
          ) : (
            <div className="best-list">
              {products.map((product, index) => {
                const productId = getProductId(product);
                const productName = getProductName(product);
                const productImage = getProductImage(product);

                const features = Array.isArray(product.features)
                  ? product.features.filter(Boolean).slice(0, 3)
                  : [];

                return (
                  <article
                    className={`best-item ${
                      index % 2 === 1 ? "best-item-reverse" : ""
                    }`}
                    key={productId || `${productName}-${index}`}
                  >
                    {/* Product image */}
                    <div className="best-image-wrap">
                      <Link
                        to={`/product/${productId}`}
                        aria-label={`View ${productName}`}
                        className="best-image-link"
                      >
                        <img
                          className="best-image"
                          src={productImage}
                          alt={productName}
                          loading={index < 2 ? "eager" : "lazy"}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              "/images/demo1.avif";
                          }}
                        />
                      </Link>

                      <span className="best-image-label">
                        EDITION No. {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Product details */}
                    <div className="best-details">
                      <p className="best-category">
                        {product.category || "SERAPHIN COLLECTION"}
                        {product.subcategory
                          ? ` / ${product.subcategory}`
                          : ""}
                      </p>

                      <h2>{productName}</h2>

                      <p className="best-description">
                        {product.description ||
                          "Thoughtfully designed to bring lasting style, comfort, and character to your home."}
                      </p>

                      {features.length > 0 && (
                        <ul className="best-features">
                          {features.map((feature, featureIndex) => (
                            <li
                              key={`${productId}-feature-${featureIndex}`}
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="best-product-bottom">
                        <div className="best-price-wrap">
                          <span className="best-price-label">
                            PRICE
                          </span>

                          <p className="best-price">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <Link
                          to={`/product/${productId}`}
                          className="best-button"
                        >
                          Discover piece
                          <span aria-hidden="true"> ↗</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Closing call to action */}
      <section className="best-footer">
        <Container>
          <p className="best-eyebrow">MAKE YOUR SPACE YOUR OWN</p>

          <h2>Good design lives with you.</h2>

          <p className="best-footer-description">
            Discover furniture that brings together thoughtful design,
            everyday comfort, and enduring style.
          </p>

          <Link
            to="/products"
            className="best-button best-button-light"
          >
            Explore all furniture
            <span aria-hidden="true"> →</span>
          </Link>
        </Container>
      </section>
    </main>
  );
}

export default Bestsellers;
