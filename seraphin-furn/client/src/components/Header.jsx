import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // 🔍 HANDLE INPUT
  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
    setActiveIndex(-1);
  };

  // 🔁 SYNC WITH URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearch(query);
  }, [location.search]);

  // 🔍 SEARCH ACTION
  const handleSubmit = () => {
    if (search.trim() !== "") {
      navigate(`/products?search=${search}`);
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div style={{ background: "#111", color: "#fff", padding: "10px 0" }}>
      <Container>
        <Row className="align-items-center">

          {/* LOGO */}
          <Col md={3}>
            <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Seraphin
            </h3>
          </Col>

          {/* SEARCH */}
          <Col md={5}>
            <div style={{ position: "relative" }}>
              
              <InputGroup>
                <Form.Control
                  placeholder="Search furniture..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      setActiveIndex((prev) =>
                        prev < suggestions.length - 1 ? prev + 1 : prev
                      );
                    }

                    else if (e.key === "ArrowUp") {
                      setActiveIndex((prev) =>
                        prev > 0 ? prev - 1 : 0
                      );
                    }

                    else if (e.key === "Enter") {
                      if (activeIndex >= 0) {
                        const selected = suggestions[activeIndex];
                        setSearch(selected.title);
                        setSuggestions([]);
                        setActiveIndex(-1);
                        navigate(`/products?search=${selected.title}`);
                      } else {
                        handleSubmit();
                      }
                    }
                  }}
                />

                <Button onClick={handleSubmit} style={{backgroundColor:"white"}}>
                  🔍
                </Button>
              </InputGroup>

              {/* SUGGESTIONS */}
              {suggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    width: "100%",
                    background: "#fff",
                    color: "#000",
                    borderRadius: "8px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                  }}
                >
                  {suggestions.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        background:
                          index === activeIndex ? "#f0f0f0" : "#fff",
                      }}
                      onClick={() => {
                        setSearch(item.title);
                        setSuggestions([]);
                        setActiveIndex(-1);
                        navigate(`/products?search=${item.title}`);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {/* IMAGE */}
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />

                      {/* INFO */}
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "500" }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          ₹{item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col md={4} className="d-flex justify-content-end gap-3">
            <span style={{ cursor: "pointer" }}>Track Order</span>
            <span style={{ cursor: "pointer" }}>Login</span>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default Header;