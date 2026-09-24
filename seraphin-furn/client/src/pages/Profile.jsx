import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // =========================================================
  // GET PROFILE FROM BACKEND
  // =========================================================

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/login");
            return;
          }

          throw new Error(
            data.message || "Unable to load profile"
          );
        }

        setUser(data.user);

        // Update localStorage with latest user data
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error("Profile loading error:", error);

        setError(
          "Unable to load your profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================================================
  // OPEN EDIT PROFILE
  // =========================================================

  const handleOpenEdit = () => {
    setSaveError("");

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
      country: user?.address?.country || "India",
    });

    setShowEditModal(true);
  };

  // =========================================================
  // FORM INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // UPDATE PROFILE
  // =========================================================

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setSaveError("");

    if (!formData.name.trim()) {
      setSaveError("Name is required.");
      return;
    }

    setSaving(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,

            address: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode,
              country: formData.country,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        setSaveError(
          data.message || "Unable to update profile."
        );

        setSaving(false);
        return;
      }

      // Update React state
      setUser(data.user);

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSaving(false);
      setShowEditModal(false);
    } catch (error) {
      console.error("Profile update error:", error);

      setSaveError(
        "Unable to connect to the server."
      );

      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "60vh",
        }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="dark" />

          <p className="text-muted mt-3">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error}
        </Alert>

        <Button
          variant="dark"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  // =========================================================
  // USER INITIAL
  // =========================================================

  const userInitial = user.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  // =========================================================
  // ADDRESS
  // =========================================================

  const hasAddress =
    user.address &&
    (
      user.address.street ||
      user.address.city ||
      user.address.state ||
      user.address.pincode
    );

  return (
    <>
      {/* =====================================================
          PROFILE PAGE
      ====================================================== */}

      <div
        style={{
          backgroundColor: "#f7f7f7",
          minHeight: "calc(100vh - 120px)",
          padding: "40px 0",
        }}
      >
        <Container>

          {/* PAGE HEADER */}

          <div className="mb-4">
            <h1
              style={{
                fontWeight: "600",
                letterSpacing: "-0.5px",
              }}
            >
              My Account
            </h1>

            <p className="text-muted mb-0">
              Manage your Seraphin Furniture account and
              orders.
            </p>
          </div>

          <Row className="g-4">

            {/* =================================================
                SIDEBAR
            ================================================== */}

            <Col xs={12} lg={3}>
              <Card
                className="border-0 shadow-sm"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <Card.Body className="p-4">

                  {/* USER */}

                  <div className="text-center mb-4">

                    <div
                      style={{
                        width: "85px",
                        height: "85px",
                        borderRadius: "50%",
                        backgroundColor: "#111",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 15px",
                        fontSize: "30px",
                        fontWeight: "600",
                      }}
                    >
                      {userInitial}
                    </div>

                    <h5 className="mb-1">
                      {user.name}
                    </h5>

                    <small className="text-muted">
                      Customer Account
                    </small>

                  </div>

                  <hr />

                  {/* MENU */}

                  <ListGroup variant="flush">

                    <ListGroup.Item
                      action
                      active
                      onClick={() => navigate("/profile")}
                      style={{
                        borderRadius: "8px",
                        marginBottom: "5px",
                        border: "none",
                        backgroundColor: "#111",
                      }}
                    >
                      👤 &nbsp; My Profile
                    </ListGroup.Item>

                    <ListGroup.Item
                      action
                      onClick={() => navigate("/orders")}
                      style={{
                        border: "none",
                        borderRadius: "8px",
                        marginBottom: "5px",
                      }}
                    >
                      📦 &nbsp; My Orders
                    </ListGroup.Item>

                    <ListGroup.Item
                      action
                      onClick={() => navigate("/wishlist")}
                      style={{
                        border: "none",
                        borderRadius: "8px",
                        marginBottom: "5px",
                      }}
                    >
                      ♡ &nbsp; Wishlist
                    </ListGroup.Item>

                    <ListGroup.Item
                      action
                      onClick={() => navigate("/cart")}
                      style={{
                        border: "none",
                        borderRadius: "8px",
                        marginBottom: "5px",
                      }}
                    >
                      🛒 &nbsp; My Cart
                    </ListGroup.Item>

                    <ListGroup.Item
                      action
                      onClick={handleOpenEdit}
                      style={{
                        border: "none",
                        borderRadius: "8px",
                        marginBottom: "5px",
                      }}
                    >
                      📍 &nbsp; Saved Addresses
                    </ListGroup.Item>

                    <ListGroup.Item
                      action
                      onClick={handleOpenEdit}
                      style={{
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      ⚙️ &nbsp; Account Settings
                    </ListGroup.Item>

                  </ListGroup>

                  <hr />

                  {/* LOGOUT */}

                  <Button
                    variant="outline-dark"
                    className="w-100"
                    onClick={handleLogout}
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    Logout
                  </Button>

                </Card.Body>
              </Card>
            </Col>

            {/* =================================================
                MAIN CONTENT
            ================================================== */}

            <Col xs={12} lg={9}>

              {/* WELCOME */}

              <Card
                className="border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "14px",
                }}
              >
                <Card.Body className="p-4">

                  <h3 className="mb-2">
                    Welcome back, {user.name} 👋
                  </h3>

                  <p className="text-muted mb-0">
                    Here's a quick overview of your
                    Seraphin Furniture account.
                  </p>

                </Card.Body>
              </Card>

              {/* =================================================
                  STATISTICS
              ================================================== */}

              <Row className="g-3 mb-4">

                <Col xs={12} sm={4}>
                  <Card
                    className="border-0 shadow-sm h-100"
                    style={{
                      borderRadius: "14px",
                    }}
                  >
                    <Card.Body className="p-4">

                      <div className="text-muted small mb-2">
                        TOTAL ORDERS
                      </div>

                      <h2 className="fw-bold mb-1">
                        0
                      </h2>

                      <small className="text-muted">
                        Orders placed
                      </small>

                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} sm={4}>
                  <Card
                    className="border-0 shadow-sm h-100"
                    style={{
                      borderRadius: "14px",
                    }}
                  >
                    <Card.Body className="p-4">

                      <div className="text-muted small mb-2">
                        WISHLIST
                      </div>

                      <h2 className="fw-bold mb-1">
                        0
                      </h2>

                      <small className="text-muted">
                        Saved products
                      </small>

                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} sm={4}>
                  <Card
                    className="border-0 shadow-sm h-100"
                    style={{
                      borderRadius: "14px",
                    }}
                  >
                    <Card.Body className="p-4">

                      <div className="text-muted small mb-2">
                        CART ITEMS
                      </div>

                      <h2 className="fw-bold mb-1">
                        0
                      </h2>

                      <small className="text-muted">
                        Items in your cart
                      </small>

                    </Card.Body>
                  </Card>
                </Col>

              </Row>

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================== */}

              <Card
                className="border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "14px",
                }}
              >
                <Card.Body className="p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                      <h4 className="mb-1">
                        Personal Information
                      </h4>

                      <p className="text-muted mb-0">
                        Your account information
                      </p>
                    </div>

                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={handleOpenEdit}
                      style={{
                        borderRadius: "8px",
                      }}
                    >
                      Edit Profile
                    </Button>

                  </div>

                  <Row className="g-4">

                    <Col xs={12} md={6}>
                      <div className="text-muted small mb-1">
                        FULL NAME
                      </div>

                      <div className="fw-semibold">
                        {user.name}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="text-muted small mb-1">
                        EMAIL ADDRESS
                      </div>

                      <div className="fw-semibold">
                        {user.email}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="text-muted small mb-1">
                        PHONE NUMBER
                      </div>

                      <div className="fw-semibold">
                        {user.phone || "Not added yet"}
                      </div>
                    </Col>

                    <Col xs={12} md={6}>
                      <div className="text-muted small mb-1">
                        ACCOUNT TYPE
                      </div>

                      <Badge
                        bg="dark"
                        className="px-3 py-2"
                      >
                        Customer
                      </Badge>
                    </Col>

                  </Row>

                </Card.Body>
              </Card>

              {/* =================================================
                  RECENT ORDERS
              ================================================== */}

              <Card
                className="border-0 shadow-sm mb-4"
                style={{
                  borderRadius: "14px",
                }}
              >
                <Card.Body className="p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                      <h4 className="mb-1">
                        Recent Orders
                      </h4>

                      <p className="text-muted mb-0">
                        Your latest furniture purchases
                      </p>
                    </div>

                    <Button
                      variant="link"
                      className="text-dark text-decoration-none"
                      onClick={() => navigate("/orders")}
                    >
                      View All
                    </Button>

                  </div>

                  <div
                    className="text-center py-5"
                    style={{
                      border: "1px dashed #ccc",
                      borderRadius: "10px",
                    }}
                  >

                    <div
                      style={{
                        fontSize: "35px",
                        marginBottom: "10px",
                      }}
                    >
                      📦
                    </div>

                    <h5>
                      No orders yet
                    </h5>

                    <p className="text-muted mb-3">
                      You haven't placed any orders yet.
                    </p>

                    <Button
                      variant="dark"
                      onClick={() => navigate("/products")}
                      style={{
                        borderRadius: "8px",
                      }}
                    >
                      Start Shopping
                    </Button>

                  </div>

                </Card.Body>
              </Card>

              {/* =================================================
                  SAVED ADDRESS
              ================================================== */}

              <Card
                className="border-0 shadow-sm"
                style={{
                  borderRadius: "14px",
                }}
              >
                <Card.Body className="p-4">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                      <h4 className="mb-1">
                        Saved Address
                      </h4>

                      <p className="text-muted mb-0">
                        Your delivery address
                      </p>
                    </div>

                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={handleOpenEdit}
                      style={{
                        borderRadius: "8px",
                      }}
                    >
                      {hasAddress
                        ? "Edit Address"
                        : "Add Address"}
                    </Button>

                  </div>

                  {hasAddress ? (
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: "#f8f8f8",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="d-flex justify-content-between">

                        <div>
                          <h6 className="fw-bold">
                            {user.name}
                          </h6>

                          <p className="text-muted mb-1">
                            {user.address.street}
                          </p>

                          <p className="text-muted mb-1">
                            {user.address.city},{" "}
                            {user.address.state}
                          </p>

                          <p className="text-muted mb-0">
                            {user.address.pincode},{" "}
                            {user.address.country}
                          </p>
                        </div>

                        <div
                          style={{
                            fontSize: "25px",
                          }}
                        >
                          📍
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: "#f8f8f8",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="d-flex justify-content-between">

                        <div>
                          <h6 className="fw-bold">
                            No address saved
                          </h6>

                          <p className="text-muted mb-0">
                            Add your delivery address for
                            faster checkout.
                          </p>
                        </div>

                        <div
                          style={{
                            fontSize: "25px",
                          }}
                        >
                          📍
                        </div>

                      </div>
                    </div>
                  )}

                </Card.Body>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>

      {/* =====================================================
          EDIT PROFILE MODAL
      ====================================================== */}

      <Modal
        show={showEditModal}
        onHide={() => {
          if (!saving) {
            setShowEditModal(false);
          }
        }}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Profile
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleUpdateProfile}>

          <Modal.Body>

            {saveError && (
              <Alert variant="danger">
                {saveError}
              </Alert>
            )}

            {/* PERSONAL INFORMATION */}

            <h5 className="mb-3">
              Personal Information
            </h5>

            <Row className="g-3">

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>
                    Full Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>
                    Email Address
                  </Form.Label>

                  <Form.Control
                    type="email"
                    value={user.email}
                    disabled
                  />

                  <Form.Text className="text-muted">
                    Email cannot be changed here.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>
                    Phone Number
                  </Form.Label>

                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
              </Col>

            </Row>

            <hr className="my-4" />

            {/* ADDRESS */}

            <h5 className="mb-3">
              Delivery Address
            </h5>

            <Row className="g-3">

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>
                    Street / Area
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="House number, street, area"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>
                    City
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>
                    State
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>
                    Pincode
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>
                    Country
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

            </Row>

          </Modal.Body>

          <Modal.Footer>

            <Button
              variant="light"
              onClick={() => setShowEditModal(false)}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              variant="dark"
              type="submit"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Spinner
                    size="sm"
                    animation="border"
                    className="me-2"
                  />

                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>

          </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
}

export default Profile;
