import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getInteriorServices } from "../api/interiorService";

function InteriorServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getInteriorServices();

        const selectedService = data.find((item) => item._id === id);

        if (!selectedService) {
          setService(null);
          return;
        }

        setService(selectedService);
        setActiveImage(0);

        // Similar projects — prefer same subcategory, fall back to category
        const relatedProjects = data.filter(
          (item) =>
            item._id !== selectedService._id &&
            item.available !== false &&
            (item.subcategory === selectedService.subcategory ||
              item.category === selectedService.category)
        );

        setSimilarProjects(relatedProjects.slice(0, 3));
      } catch (error) {
        console.error("Error fetching interior service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const sharedStyles = `
    .sr-idetail { background: #F6F3EE; min-height: 100vh; color: #232019; padding-bottom: 4rem; }
    .sr-btn-outline {
      background: transparent;
      border: 1px solid #D8D0C0;
      color: #4A443B;
      font-weight: 500;
      border-radius: 8px;
      padding: 0.6rem 1.3rem;
      transition: border-color 0.15s ease, color 0.15s ease;
    }
    .sr-btn-outline:hover { border-color: #232019; color: #232019; }
    .sr-btn-primary {
      background: #232019;
      border: 1px solid #232019;
      color: #F6F3EE;
      font-weight: 500;
      border-radius: 8px;
      padding: 0.65rem 1.6rem;
      transition: background 0.15s ease;
    }
    .sr-btn-primary:hover { background: #A8763E; border-color: #A8763E; color: #FFFFFF; }
  `;

  if (loading) {
    return (
      <div className="sr-idetail">
        <style>{`
          ${sharedStyles}
          .sr-skeleton {
            background: linear-gradient(90deg, #EFEAE1 25%, #F6F3EE 37%, #EFEAE1 63%);
            background-size: 400% 100%;
            animation: sr-shimmer 1.4s ease infinite;
            border-radius: 10px;
          }
          @keyframes sr-shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
        `}</style>
        <Container className="py-5">
          <Row>
            <Col md={6}>
              <div className="sr-skeleton" style={{ height: "450px" }} />
            </Col>
            <Col md={6}>
              <div className="sr-skeleton mb-3" style={{ height: "32px", width: "70%" }} />
              <div className="sr-skeleton mb-3" style={{ height: "20px", width: "35%" }} />
              <div className="sr-skeleton" style={{ height: "120px" }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="sr-idetail">
        <style>{sharedStyles}</style>
        <Container className="py-5 text-center">
          <h2>Interior service not found</h2>
          <p className="text-muted mb-4">
            This project may have been removed or is no longer available.
          </p>
          <button className="sr-btn-primary" onClick={() => navigate("/interior-services")}>
            ← Back to Interior Services
          </button>
        </Container>
      </div>
    );
  }

  const images = service.images?.length > 0 ? service.images : [];

  return (
    <div className="sr-idetail">
      <style>{`
        ${sharedStyles}
        .sr-breadcrumb {
          font-size: 0.85rem;
          color: #7A7166;
          padding: 1.5rem 0 0.5rem;
        }
        .sr-breadcrumb a { color: #7A7166; text-decoration: none; }
        .sr-breadcrumb a:hover { color: #A8763E; }
        .sr-breadcrumb .current { color: #232019; font-weight: 500; }
        .sr-gallery-main {
          width: 100%;
          height: 450px;
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
          width: 76px;
          height: 76px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid transparent;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 0.15s ease, border-color 0.15s ease;
        }
        .sr-thumb:hover { opacity: 1; }
        .sr-thumb.active { border-color: #A8763E; opacity: 1; }
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
          margin-bottom: 1.1rem;
        }
        .sr-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #E4DED2;
        }
        .sr-section h4 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.85rem;
        }
        .sr-desc {
          color: #4A443B;
          line-height: 1.7;
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
        .sr-cta-row {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.75rem;
          flex-wrap: wrap;
        }
        .sr-similar { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #E4DED2; }
        .sr-similar h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        .sr-proj-card {
          border: 1px solid #E4DED2;
          border-radius: 10px;
          overflow: hidden;
          background: #FFFFFF;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .sr-proj-card:hover {
          box-shadow: 0 8px 20px rgba(35, 32, 25, 0.08);
          transform: translateY(-2px);
        }
        .sr-proj-body {
          padding: 1rem 1.1rem 1.1rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .sr-proj-title { font-weight: 600; font-size: 1rem; margin-bottom: 0.2rem; }
        .sr-proj-sub { color: #7A7166; font-size: 0.82rem; margin-bottom: 1rem; }
      `}</style>

      <Container>
        {/* BREADCRUMB */}
        <div className="sr-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/interior-services">Interior Services</Link> /{" "}
          {service.category && (
            <>
              <Link to={`/interior-services?category=${encodeURIComponent(service.category)}`}>
                {service.category}
              </Link>{" "}
              /{" "}
            </>
          )}
          <span className="current">{service.name}</span>
        </div>

        <Row className="pt-3">
          {/* IMAGE GALLERY */}
          <Col md={6}>
            {images.length > 0 ? (
              <>
                <img src={images[activeImage]} alt={service.name} className="sr-gallery-main" />
                {images.length > 1 && (
                  <div className="sr-thumb-row">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${service.name} ${idx + 1}`}
                        className={`sr-thumb ${activeImage === idx ? "active" : ""}`}
                        onClick={() => setActiveImage(idx)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                className="sr-gallery-main d-flex align-items-center justify-content-center text-muted"
                style={{ height: "450px" }}
              >
                No image available
              </div>
            )}
          </Col>

          {/* DETAILS */}
          <Col md={6}>
            {service.category && (
              <span className="sr-category-tag">
                {service.subcategory ? `${service.category} · ${service.subcategory}` : service.category}
              </span>
            )}

            <h1 className="sr-title">{service.name}</h1>

            {service.description && (
              <div className="sr-section" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                <h4>About This Project</h4>
                <p className="sr-desc">{service.description}</p>
              </div>
            )}

            {service.features?.length > 0 && (
              <div className="sr-section">
                <h4>Features</h4>
                <ul className="sr-features">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="sr-cta-row">
              <button className="sr-btn-primary" onClick={() => navigate("/contact")}>
                Enquire About This Project
              </button>
              <button className="sr-btn-outline" onClick={() => navigate("/interior-services")}>
                ← Back to Interior Services
              </button>
            </div>
          </Col>
        </Row>

        {/* SIMILAR PROJECTS */}
        {similarProjects.length > 0 && (
          <div className="sr-similar">
            <h2>Similar Projects</h2>
            <Row className="g-4">
              {similarProjects.map((project) => (
                <Col key={project._id} md={4}>
                  <div className="sr-proj-card">
                    {project.images?.[0] && (
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        style={{ width: "100%", height: "220px", objectFit: "cover" }}
                      />
                    )}
                    <div className="sr-proj-body">
                      <div className="sr-proj-title">{project.name}</div>
                      <div className="sr-proj-sub">{project.category}</div>
                      <button
                        className="sr-btn-primary mt-auto"
                        onClick={() => navigate(`/interior-services/${project._id}`)}
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

export default InteriorServiceDetail;