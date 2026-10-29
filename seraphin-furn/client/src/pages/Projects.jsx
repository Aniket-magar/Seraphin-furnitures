
import { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPublishedProjects } from "../api/projectService";

const COLORS = {
  background: "#F6F3EE",
  black: "#232019",
  gold: "#A8763E",
  lightGold: "#C6A16B",
  text: "#4B453C",
  muted: "#7A7166",
  border: "#E4DED2",
  white: "#FFFFFF",
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch published projects from the backend.
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPublishedProjects();

      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading published projects:", err);
      setError(
        "We couldn't load our projects right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <main
      style={{
        background: COLORS.background,
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 65px",
          background: COLORS.black,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        <Container>
          <p
            style={{
              color: COLORS.lightGold,
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "18px",
            }}
          >
            SERAPHIN FURNITURE
          </p>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: "500",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
          >
            Our Projects
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#D8D1C5",
              fontSize: "16px",
              lineHeight: "1.9",
            }}
          >
            Discover thoughtfully designed interiors, bespoke furniture,
            and spaces crafted around the way people live.
          </p>
        </Container>
      </section>

      {/* Projects Section */}
      <Container className="py-5">
        <div
          style={{
            textAlign: "center",
            marginBottom: "42px",
          }}
        >
          <p
            style={{
              color: COLORS.gold,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontSize: "11px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            OUR PORTFOLIO
          </p>

          <h2
            style={{
              color: COLORS.black,
              fontSize: "clamp(27px, 4vw, 38px)",
              fontWeight: "500",
              marginBottom: "14px",
            }}
          >
            Spaces That Tell a Story
          </h2>

          <p
            style={{
              maxWidth: "620px",
              margin: "0 auto",
              color: COLORS.muted,
              fontSize: "15px",
              lineHeight: "1.8",
            }}
          >
            Explore our completed projects, where thoughtful planning,
            quality materials, and refined craftsmanship come together.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "250px" }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{
                color: COLORS.gold,
                width: "42px",
                height: "42px",
              }}
            />

            <p
              className="mt-3 mb-0"
              style={{ color: COLORS.muted }}
            >
              Loading our projects...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <Alert
            variant="light"
            className="text-center mx-auto"
            style={{
              maxWidth: "600px",
              border: `1px solid ${COLORS.border}`,
              background: COLORS.white,
              padding: "30px",
            }}
          >
            <h5 style={{ color: COLORS.black }}>
              Something went wrong
            </h5>

            <p style={{ color: COLORS.muted }}>
              {error}
            </p>

            <Button
              variant="dark"
              onClick={fetchProjects}
              style={{
                background: COLORS.black,
                border: `1px solid ${COLORS.black}`,
                borderRadius: "0",
                padding: "10px 28px",
              }}
            >
              Try Again
            </Button>
          </Alert>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div
            className="text-center"
            style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              padding: "55px 20px",
            }}
          >
            <h4
              style={{
                color: COLORS.black,
                fontWeight: "500",
                marginBottom: "12px",
              }}
            >
              Our Portfolio Is Growing
            </h4>

            <p
              style={{
                color: COLORS.muted,
                marginBottom: "0",
              }}
            >
              No published projects are available at the moment.
              Please check back soon.
            </p>
          </div>
        )}

        {/* Project Cards */}
        {!loading && !error && projects.length > 0 && (
          <Row className="g-4">
            {projects.map((project) => (
              <Col
                key={project._id}
                xs={12}
                md={6}
                lg={4}
              >
                <Card
                  className="h-100 border-0"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                    boxShadow: "0 5px 22px rgba(35, 32, 25, 0.07)",
                    transition:
                      "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform =
                      "translateY(-5px)";
                    event.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(35, 32, 25, 0.13)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform =
                      "translateY(0)";
                    event.currentTarget.style.boxShadow =
                      "0 5px 22px rgba(35, 32, 25, 0.07)";
                  }}
                >
                  {/* Landscape Project Image */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      background: COLORS.border,
                      overflow: "hidden",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title || "SERAPHIN project"}
                        loading="lazy"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          const fallback =
                            event.currentTarget.nextElementSibling;

                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}

                    <div
                      style={{
                        display: project.coverImage ? "none" : "flex",
                        position: "absolute",
                        inset: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.muted,
                        fontSize: "13px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Image unavailable
                    </div>
                  </div>

                  {/* Project Information */}
                  <Card.Body
                    className="p-4 d-flex flex-column"
                    style={{ flex: "1 1 auto" }}
                  >
                    {project.category && (
                      <p
                        style={{
                          color: COLORS.gold,
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                        }}
                      >
                        {project.category}
                      </p>
                    )}

                    <h3
                      style={{
                        color: COLORS.black,
                        fontSize: "21px",
                        fontWeight: "500",
                        lineHeight: "1.4",
                        marginBottom: "12px",
                      }}
                    >
                      {project.title || "Untitled Project"}
                    </h3>

                    {project.location && (
                      <p
                        style={{
                          color: COLORS.muted,
                          fontSize: "13px",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            color: COLORS.gold,
                            marginRight: "7px",
                          }}
                        >
                          Location
                        </span>
                        {project.location}
                      </p>
                    )}

                    <p
                      style={{
                        color: COLORS.text,
                        fontSize: "14px",
                        lineHeight: "1.8",
                        marginBottom: "16px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description ||
                        "Discover the details of this SERAPHIN project."}
                    </p>

                    {project.completionDate && (
                      <p
                        style={{
                          color: COLORS.muted,
                          fontSize: "12px",
                          marginBottom: "20px",
                        }}
                      >
                        Completed:{" "}
                        {new Date(
                          project.completionDate
                        ).toLocaleDateString("en-IN", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}

                    <Button
                      as={Link}
                      to={`/projects/${project._id}`}
                      variant="outline-dark"
                      className="w-100 mt-auto"
                      style={{
                        background: "transparent",
                        border: `1px solid ${COLORS.gold}`,
                        color: COLORS.black,
                        borderRadius: "0",
                        padding: "11px",
                        letterSpacing: "1px",
                        fontSize: "12px",
                        textTransform: "uppercase",
                      }}
                    >
                      Explore Project
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Call-to-Action Section */}
      <section
        style={{
          background: "#EAE3D7",
          padding: "65px 20px",
          textAlign: "center",
        }}
      >
        <Container>
          <p
            style={{
              color: COLORS.gold,
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            START YOUR JOURNEY
          </p>

          <h2
            style={{
              color: COLORS.black,
              fontSize: "clamp(27px, 4vw, 38px)",
              fontWeight: "500",
              marginBottom: "18px",
            }}
          >
            Let's Create Something Exceptional
          </h2>

          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto 28px",
              color: COLORS.text,
              fontSize: "15px",
              lineHeight: "1.8",
            }}
          >
            From bespoke furniture to thoughtfully designed interiors,
            let us help bring your vision to life.
          </p>

          <Button
            as={Link}
            to="/interior-services"
            style={{
              background: COLORS.black,
              color: COLORS.white,
              border: `1px solid ${COLORS.black}`,
              borderRadius: "0",
              padding: "13px 30px",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Explore Interior Services
          </Button>
        </Container>
      </section>
    </main>
  );
}

export default Projects;
