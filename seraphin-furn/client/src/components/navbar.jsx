import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";


function CustomNavbar() {

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: "500",
    letterSpacing: "1px",
    color: isActive ? "#ffffff" : "#bdbdbd",
    // borderBottom: isActive
    //   ? "2px solid #ffffff"
    //   : "2px solid transparent",
    paddingBottom: "4px",
    transition: "all 0.2s ease",
    userSelect: 'none', 
  WebkitUserSelect: 'none', // For Safari
  msUserSelect: 'none',
  });

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      style={{ height: "40px" }}
    >
      <Container>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="mx-auto gap-4">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              style={navLinkStyle}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/products"
              style={navLinkStyle}
            >
              Furniture
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/interior-services"
              style={navLinkStyle}
            >
              Interior Services
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/bestsellers"
              style={navLinkStyle}
            >
              Best sellers 
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/Projects"
              style={navLinkStyle}
            >
              Projects
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/cart"
              style={navLinkStyle}
            >
              My list
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/about-us"
              style={navLinkStyle}
            >
              About us
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/consultation"
              style={navLinkStyle}
            >
              Consultation
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;