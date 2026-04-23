import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        padding: "10px 0",
      }}
    >
      <Container>
        <Row className="align-items-center">

          {/* LOGO */}
          <Col md={3}>
            <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}            >
              Seraphin
            </h3>
          </Col>

          {/* SEARCH BAR */}
          <Col md={5}>
            <InputGroup>
              <Form.Control
                placeholder="Search furniture..."
                style={{ borderRadius: "8px 0 0 8px" }}
              />
              <button
                style={{
                  background: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                🔍
              </button>
            </InputGroup>
          </Col>

          {/* RIGHT SIDE (LOGIN + TRACK) */}
          <Col
            md={4}
            className="d-flex justify-content-end gap-3 align-items-center"
          >
            <span style={{ cursor: "pointer" }}>Track Order</span>
            <span style={{ cursor: "pointer" }}>Login</span>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Header;