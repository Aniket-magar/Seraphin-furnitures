import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import CustomCarousel from "../components/CustomCarousel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../api/productService";
import { getInteriorServices } from "../api/interiorService";

const PRODUCT_CATEGORIES = [
  {
    name: "Home Furniture",
    blurb: "Kitchens, wardrobes, beds and seating built for everyday living.",
  },
  {
    name: "Commercial Furniture",
    blurb: "Workstations, seating and storage for offices and banks.",
  },
  {
    name: "Doors & Windows",
    blurb: "Flush, PVC, WPC and wooden doors, plus uPVC windows.",
  },
  {
    name: "Glass",
    blurb: "Toughened glass for partitions, tabletops and facades.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Consultation",
    desc: "Share your space, budget and requirement — we understand the brief.",
  },
  {
    title: "Design",
    desc: "A tailored layout and material plan for your furniture or interior.",
  },
  {
    title: "Manufacture & source",
    desc: "Production and sourcing handled in-house, with quality checks at each stage.",
  },
  {
    title: "Install",
    desc: "On-site installation and handover, finished to spec.",
  },
];

function Home() {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);

  const [featuredServices, setFeaturedServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(false);
        const data = await getProducts();
        setFeaturedProducts(
          data.filter((product) => product.available !== false).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setProductsError(true);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const fetchFeaturedServices = async () => {
      try {
        setServicesLoading(true);
        const data = await getInteriorServices();
        setFeaturedServices(
          data.filter((service) => service.available !== false).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching featured services:", error);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchFeaturedServices();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterError("");

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail);
    if (!isValidEmail) {
      setNewsletterError("Enter a valid email address.");
      return;
    }

    // TODO: wire this up to a real subscribe endpoint
    setNewsletterSubmitted(true);
  };

  return (
    <div className="sr-home">
      <style>{`
        .sr-home {
          background: #F6F3EE;
          color: #232019;
        }
        .sr-section {
          padding: 3.5rem 0;
        }
        .sr-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .sr-section-head h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.85rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 0.35rem;
        }
        .sr-section-head p {
          color: #7A7166;
          margin: 0;
          font-size: 0.95rem;
        }
        .sr-link {
          color: #A8763E;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          white-space: nowrap;
        }
        .sr-link:hover {
          color: #232019;
        }

        /* VALUE STRIP */
        .sr-value-strip {
          background: #FFFFFF;
          border-top: 1px solid #E4DED2;
          border-bottom: 1px solid #E4DED2;
          padding: 2.25rem 0;
        }
        .sr-value-item {
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
        }
        .sr-value-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #F0E6D6;
          color: #A8763E;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sr-value-item h6 {
          font-weight: 600;
          font-size: 0.95rem;
          margin: 0 0 0.2rem;
        }
        .sr-value-item p {
          color: #7A7166;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        /* CATEGORY CARDS */
        .sr-cat-card {
          display: block;
          text-decoration: none;
          background: #FFFFFF;
          border: 1px solid #E4DED2;
          border-radius: 12px;
          padding: 1.5rem;
          height: 100%;
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .sr-cat-card:hover {
          border-color: #A8763E;
          transform: translateY(-2px);
        }
        .sr-cat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #232019;
          color: #F6F3EE;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .sr-cat-card h5 {
          font-weight: 600;
          font-size: 1.05rem;
          color: #232019;
          margin-bottom: 0.4rem;
        }
        .sr-cat-card p {
          color: #7A7166;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        /* PROCESS */
        .sr-process-item {
          position: relative;
          padding-left: 0;
        }
        .sr-process-num {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 2.2rem;
          color: #D8D0C0;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .sr-process-item h6 {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.4rem;
        }
        .sr-process-item p {
          color: #7A7166;
          font-size: 0.87rem;
          line-height: 1.55;
          margin: 0;
        }

        /* SERVICES TEASER */
        .sr-service-card {
          border: 1px solid #E4DED2;
          border-radius: 10px;
          overflow: hidden;
          background: #FFFFFF;
          height: 100%;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        .sr-service-card:hover {
          box-shadow: 0 8px 20px rgba(35, 32, 25, 0.08);
          transform: translateY(-2px);
        }
        .sr-service-body {
          padding: 1rem 1.1rem 1.1rem;
        }
        .sr-service-title {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.2rem;
        }
        .sr-service-sub {
          color: #7A7166;
          font-size: 0.82rem;
        }

        /* CTA BANNER */
        .sr-cta-banner {
          background: #232019;
          color: #F6F3EE;
          border-radius: 16px;
          padding: 2.75rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .sr-cta-banner h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.55rem;
          font-weight: 600;
          margin: 0 0 0.4rem;
        }
        .sr-cta-banner p {
          color: #C9C2B4;
          margin: 0;
          font-size: 0.92rem;
        }
        .sr-btn-light {
          background: #F6F3EE;
          color: #232019;
          border: none;
          font-weight: 500;
          border-radius: 8px;
          padding: 0.7rem 1.6rem;
          white-space: nowrap;
          transition: background 0.15s ease;
        }
        .sr-btn-light:hover {
          background: #A8763E;
          color: #FFFFFF;
        }

        /* NEWSLETTER */
        .sr-newsletter {
          background: #FFFFFF;
          border: 1px solid #E4DED2;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }
        .sr-newsletter h5 {
          font-weight: 600;
          margin-bottom: 0.4rem;
        }
        .sr-newsletter p {
          color: #7A7166;
          font-size: 0.9rem;
          margin-bottom: 1.25rem;
        }
        .sr-newsletter-form {
          display: flex;
          gap: 0.5rem;
          max-width: 420px;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }
        .sr-newsletter-form input {
          flex: 1;
          min-width: 200px;
          border: 1px solid #D8D0C0;
          border-radius: 8px;
          padding: 0.6rem 0.9rem;
          font-size: 0.9rem;
          background: #FFFFFF;
        }
        .sr-newsletter-form input:focus {
          outline: none;
          border-color: #A8763E;
        }
        .sr-newsletter-form button {
          background: #232019;
          color: #F6F3EE;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.4rem;
          font-weight: 500;
          white-space: nowrap;
        }
        .sr-newsletter-form button:hover {
          background: #A8763E;
        }
        .sr-newsletter-error {
          color: #B3413A;
          font-size: 0.8rem;
          margin-top: 0.6rem;
        }
        .sr-newsletter-success {
          color: #4E7C55;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .sr-skeleton {
          background: linear-gradient(90deg, #EFEAE1 25%, #F6F3EE 37%, #EFEAE1 63%);
          background-size: 400% 100%;
          animation: sr-shimmer 1.4s ease infinite;
          border-radius: 10px;
          height: 260px;
        }
        @keyframes sr-shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
        .sr-empty {
          padding: 2.5rem 1rem;
          text-align: center;
          color: #7A7166;
          background: #FFFFFF;
          border: 1px dashed #D8D0C0;
          border-radius: 10px;
        }
      `}</style>

      {/* HERO SECTION */}
      <CustomCarousel />

      {/* VALUE STRIP */}
      <div className="sr-value-strip">
        <Container>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <div className="sr-value-item">
                <div className="sr-value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 21V8l9-5 9 5v13" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div>
                  <h6>Custom design</h6>
                  <p>Furniture and interiors tailored to your space and budget.</p>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="sr-value-item">
                <div className="sr-value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                  </svg>
                </div>
                <div>
                  <h6>Quality materials</h6>
                  <p>Durable finishes and hardware sourced for long-term use.</p>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="sr-value-item">
                <div className="sr-value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="1" y="7" width="15" height="10" rx="1" />
                    <path d="M16 10h4l3 3v4h-7" />
                    <circle cx="5.5" cy="19" r="1.5" />
                    <circle cx="18.5" cy="19" r="1.5" />
                  </svg>
                </div>
                <div>
                  <h6>On-time delivery</h6>
                  <p>Manufacturing and dispatch tracked against your timeline.</p>
                </div>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="sr-value-item">
                <div className="sr-value-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h6>End-to-end install</h6>
                  <p>From measurement to final handover, we manage the site work.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* SHOP BY CATEGORY */}
      <div className="sr-section">
        <Container>
          <div className="sr-section-head">
            <div>
              <h2>Shop by category</h2>
              <p>Furniture, fittings and glass for homes and businesses.</p>
            </div>
          </div>

          <Row className="g-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Col key={cat.name} md={3} sm={6}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="sr-cat-card"
                >
                  <div className="sr-cat-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                  <h5>{cat.name}</h5>
                  <p>{cat.blurb}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="sr-section" style={{ background: "#FFFFFF" }}>
        <Container>
          <div className="sr-section-head">
            <div>
              <h2>Featured products</h2>
              <p>A few pieces our customers keep coming back for.</p>
            </div>
            <Link to="/products" className="sr-link">
              View all products →
            </Link>
          </div>

          <Row className="g-4">
            {productsLoading ? (
              [1, 2, 3].map((i) => (
                <Col key={i} md={4}>
                  <div className="sr-skeleton" />
                </Col>
              ))
            ) : productsError ? (
              <Col xs={12}>
                <div className="sr-empty">Couldn't load featured products right now.</div>
              </Col>
            ) : featuredProducts.length === 0 ? (
              <Col xs={12}>
                <div className="sr-empty">No featured products found.</div>
              </Col>
            ) : (
              featuredProducts.map((item) => (
                <Col key={item._id || item.id} md={4}>
                  <ProductCard product={item} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>

      {/* INTERIOR SERVICES TEASER */}
      <div className="sr-section">
        <Container>
          <div className="sr-section-head">
            <div>
              <h2>Interior services</h2>
              <p>Complete residential and commercial interior solutions.</p>
            </div>
            <Link to="/interior-services" className="sr-link">
              View all services →
            </Link>
          </div>

          <Row className="g-4">
            {servicesLoading ? (
              [1, 2, 3].map((i) => (
                <Col key={i} md={4}>
                  <div className="sr-skeleton" />
                </Col>
              ))
            ) : featuredServices.length === 0 ? (
              <Col xs={12}>
                <div className="sr-empty">No interior projects to show yet.</div>
              </Col>
            ) : (
              featuredServices.map((service) => (
                <Col key={service._id} md={4}>
                  <div
                    className="sr-service-card"
                    role="button"
                    onClick={() => navigate(`/interior-services/${service._id}`)}
                  >
                    {service.images?.[0] && (
                      <img
                        src={service.images[0]}
                        alt={service.name}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="sr-service-body">
                      <div className="sr-service-title">{service.name}</div>
                      <div className="sr-service-sub">{service.category}</div>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>

      {/* HOW WE WORK */}
      <div className="sr-section" style={{ background: "#FFFFFF" }}>
        <Container>
          <div className="sr-section-head">
            <div>
              <h2>How we work</h2>
              <p>From first conversation to final installation.</p>
            </div>
          </div>

          <Row className="g-4">
            {PROCESS_STEPS.map((step, idx) => (
              <Col key={step.title} md={3} sm={6}>
                <div className="sr-process-item">
                  <div className="sr-process-num">{String(idx + 1).padStart(2, "0")}</div>
                  <h6>{step.title}</h6>
                  <p>{step.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA BANNER */}
      <div className="sr-section">
        <Container>
          <div className="sr-cta-banner">
            <div>
              <h3>Planning a furniture or interior project?</h3>
              <p>Get a free consultation and quote for your home or business.</p>
            </div>
            <button className="sr-btn-light" onClick={() => navigate("/contact")}>
              Get a free consultation
            </button>
          </div>
        </Container>
      </div>

      {/* NEWSLETTER */}
      <div className="sr-section" style={{ paddingTop: 0 }}>
        <Container>
          <div className="sr-newsletter">
            <h5>Stay updated</h5>
            <p>New arrivals and project ideas, sent occasionally — no spam.</p>

            {newsletterSubmitted ? (
              <div className="sr-newsletter-success">You're subscribed. Thanks for joining.</div>
            ) : (
              <form className="sr-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
            {newsletterError && <div className="sr-newsletter-error">{newsletterError}</div>}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;