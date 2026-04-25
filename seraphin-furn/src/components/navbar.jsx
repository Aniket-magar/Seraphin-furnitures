import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CustomNavbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="sm" style={{height:"40px"}}>
      <Container>
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="mx-auto gap-4">
            <Nav.Link as={Link} to="/" style={{ fontWeight: "500", letterSpacing: "1px" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ fontWeight: "500", letterSpacing: "1px" }}>Products</Nav.Link>
            <Nav.Link as={Link} to="/cart" style={{ fontWeight: "500", letterSpacing: "1px" }}>
              My list ({totalItems})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;