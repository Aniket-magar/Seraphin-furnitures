import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Jost:wght@400;500&display=swap');

  .seraphin-top-bar {
    background: #2e1f0e;
    text-align: center;
    padding: 6px 0;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    color: #c8a97e;
    letter-spacing: 1.5px;
  }

  .seraphin-navbar {
    background-color: #1a1208 !important;
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
    padding: 12px 0;
  }

  .seraphin-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: #e8d5b7 !important;
    letter-spacing: 2px;
    line-height: 1;
  }

  .seraphin-brand-tag {
    display: block;
    font-family: 'Jost', sans-serif;
    font-size: 9px;
    color: #c8a97e;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .seraphin-nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 13px !important;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #c8b89a !important;
    position: relative;
    padding-bottom: 4px !important;
    transition: color 0.2s ease;
  }

  .seraphin-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 8px;
    width: 0;
    height: 1px;
    background: #c8a97e;
    transition: width 0.3s ease;
  }

  .seraphin-nav-link:hover {
    color: #e8d5b7 !important;
  }

  .seraphin-nav-link:hover::after {
    width: calc(100% - 16px);
  }

  .seraphin-dropdown .dropdown-menu {
    background-color: #1a1208;
    border: 1px solid #3a2910;
    border-radius: 0;
    padding: 8px 0;
    margin-top: 8px !important;
  }

  .seraphin-dropdown .dropdown-item {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #c8b89a;
    padding: 10px 20px;
    transition: background 0.2s, color 0.2s;
  }

  .seraphin-dropdown .dropdown-item:hover {
    background-color: #2e1f0e;
    color: #e8d5b7;
  }

  .seraphin-dropdown .dropdown-toggle::after {
    color: #c8a97e;
  }

  /* Collections — distinct warm orange accent */
  .seraphin-collections > a.nav-link,
  .seraphin-collections > a.dropdown-toggle {
    color: #c8a97e !important;
    font-weight: 500 !important;
  }
  .seraphin-collections > a.nav-link:hover,
  .seraphin-collections > a.dropdown-toggle:hover {
    color: #f0a060 !important;
  }
  .seraphin-collections > a.nav-link::after {
    background: #d4752a !important;
  }

  .seraphin-icon-btn {
    background: none !important;
    border: none !important;
    color: #c8b89a !important;
    font-size: 18px;
    padding: 4px 8px !important;
    transition: color 0.2s !important;
    line-height: 1;
  }

  .seraphin-icon-btn:hover {
    color: #e8d5b7 !important;
  }

  .seraphin-cart-wrap {
    position: relative;
    display: inline-flex;
  }

  .seraphin-cart-badge {
    position: absolute;
    top: -6px;
    right: -2px;
    background: #c8a97e !important;
    color: #1a1208 !important;
    font-size: 9px !important;
    font-weight: 600;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
  }

  .seraphin-cta-btn {
    background: #c8a97e !important;
    border: none !important;
    color: #1a1208 !important;
    font-family: 'Jost', sans-serif !important;
    font-size: 11px !important;
    font-weight: 500 !important;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 22px !important;
    border-radius: 0 !important;
    transition: background 0.2s !important;
  }

  .seraphin-cta-btn:hover {
    background: #e8d5b7 !important;
    color: #1a1208 !important;
  }

  .seraphin-toggler {
    border: none !important;
    padding: 4px !important;
  }

  .seraphin-toggler:focus {
    box-shadow: none !important;
  }

  .seraphin-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23c8b89a' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
  }

  @media (max-width: 991px) {
    .seraphin-navbar .navbar-collapse {
      background-color: #1a1208;
      padding: 16px 0 20px;
      border-top: 1px solid #2e1f0e;
      margin-top: 12px;
    }

    .seraphin-nav-link::after {
      display: none;
    }

    .seraphin-cta-btn {
      width: 100%;
      margin-top: 8px;
      text-align: center;
    }

    .mobile-icons {
      display: flex;
      gap: 8px;
      padding: 8px 0;
      border-top: 1px solid #2e1f0e;
      margin-top: 8px;
    }
  }
`;

const SeraphimNavbar = () => {
  const [cartCount] = useState(3);

  return (
    <>
      <style>{styles}</style>

      {/* Top Announcement Bar */}
      <div className="seraphin-top-bar">
        FREE SHIPPING ON ORDERS ABOVE ₹25,000 &nbsp;|&nbsp; VISIT OUR SHOWROOM IN GONDIA
      </div>

      {/* Main Navbar */}
      <Navbar
        expand="lg"
        sticky="top"
        className="seraphin-navbar"
      >
        <Container fluid="xl">

          {/* Brand Logo */}
          <Navbar.Brand href="/" className="seraphin-brand-name">
            SERAPHIN
            <span className="seraphin-brand-tag">Furnitures</span>
          </Navbar.Brand>

          {/* Mobile Toggler */}
          <Navbar.Toggle
            aria-controls="seraphin-nav"
            className="seraphin-toggler"
          />

          {/* Collapsible Nav Links */}
          <Navbar.Collapse id="seraphin-nav">
            <Nav className="mx-auto gap-lg-2">
              <Nav.Link href="/" className="seraphin-nav-link">
                Home
              </Nav.Link>

              <NavDropdown
                title="Collections"
                id="collections-dropdown"
                className="seraphin-nav-link seraphin-dropdown seraphin-collections"
              >
                <NavDropdown.Item href="/collections/living-room">Living Room</NavDropdown.Item>
                <NavDropdown.Item href="/collections/bedroom">Bedroom</NavDropdown.Item>
                <NavDropdown.Item href="/collections/dining-room">Dining Room</NavDropdown.Item>
                <NavDropdown.Item href="/collections/home-office">Home Office</NavDropdown.Item>
                <NavDropdown.Item href="/collections/outdoor">Outdoor</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/new-arrivals" className="seraphin-nav-link">
                New Arrivals
              </Nav.Link>

              <Nav.Link href="/custom-orders" className="seraphin-nav-link">
                Custom Orders
              </Nav.Link>

              <Nav.Link href="/about" className="seraphin-nav-link">
                About
              </Nav.Link>

              <Nav.Link href="/contact" className="seraphin-nav-link">
                Contact
              </Nav.Link>
            </Nav>

            {/* Action Icons */}
            <div className="d-flex align-items-center gap-2 mt-lg-0 mt-2">

              {/* Search */}
              <Button className="seraphin-icon-btn" title="Search">
                🔍
              </Button>

              {/* Wishlist */}
              <Button className="seraphin-icon-btn" title="Wishlist">
                ♡
              </Button>

              {/* Cart */}
              <div className="seraphin-cart-wrap">
                <Button className="seraphin-icon-btn" title="Cart">
                  🛒
                </Button>
                {cartCount > 0 && (
                  <Badge className="seraphin-cart-badge">{cartCount}</Badge>
                )}
              </div>

              {/* CTA Button */}
              <Button className="seraphin-cta-btn ms-2">
                Book a Visit
              </Button>
            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
};

export default SeraphimNavbar;