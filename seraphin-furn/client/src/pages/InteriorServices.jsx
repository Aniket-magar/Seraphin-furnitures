import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getInteriorServices } from "../api/interiorService";
import { getInteriorWishlistKey } from "../utils/wishlistStorage";

// Interior service categories data
const interiorServiceCategories = {
  "Residential Interior": [
    "Complete Home Interior",
    "Gaming Room",
    "Spiritual & Wellness Room",
    "Home Theatre",
    "Wall Panelling",
    "PVC False Ceiling",
    "Flooring",
    "Elevation",
  ],

  "Commercial Interior": [
    "Office Interior",
    "Bank Interior",
    "Retail Store Interior",
    "Cafe & Restaurant Interior",
    "Hospital & Clinic Interior",
    "Co-living Interior",
    "Hostel / PG Interior",
    "Hotel Interior",
  ],
};

function InteriorServices() {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("All");
  const [loading, setLoading] = useState(true);

  // Store IDs of services currently in wishlist
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  // ==========================================
  // LOAD INTERIOR SERVICES
  // ==========================================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getInteriorServices();
        setServices(data);
      } catch (error) {
        console.error(
          "Error fetching interior services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ==========================================
  // LOAD USER-SPECIFIC WISHLIST
  // ==========================================
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlistKey =
          getInteriorWishlistKey();

        console.log(
          "Interior wishlist key:",
          wishlistKey
        );

        // No logged-in user
        if (!wishlistKey) {
          setWishlist([]);
          return;
        }

        const savedWishlist = JSON.parse(
          localStorage.getItem(wishlistKey) || "[]"
        );

        const normalizedWishlist =
          Array.isArray(savedWishlist)
            ? savedWishlist.map((id) => String(id))
            : [];

        console.log(
          "Interior wishlist data:",
          normalizedWishlist
        );

        setWishlist(normalizedWishlist);
      } catch (error) {
        console.error(
          "Error loading interior service wishlist:",
          error
        );

        setWishlist([]);
      }
    };

    // Load initially
    loadWishlist();

    // Update when wishlist changes
    window.addEventListener(
      "wishlistChanged",
      loadWishlist
    );

    // Update when user logs in/out
    window.addEventListener(
      "authChanged",
      loadWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistChanged",
        loadWishlist
      );

      window.removeEventListener(
        "authChanged",
        loadWishlist
      );
    };
  }, []);

  // ==========================================
  // AVAILABLE SERVICES
  // ==========================================
  const visibleServices = services.filter(
    (service) => service.available !== false
  );

  // ==========================================
  // CATEGORIES
  // ==========================================
  const categories = [
    "All",
    ...Object.keys(interiorServiceCategories),
  ];

  const subcategories =
    selectedCategory !== "All"
      ? interiorServiceCategories[selectedCategory]
      : [];

  // ==========================================
  // CATEGORY CLICK
  // ==========================================
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory("All");
  };

  // ==========================================
  // FILTER SERVICES
  // ==========================================
  const filteredServices = visibleServices.filter(
    (service) => {
      const matchCategory =
        selectedCategory === "All" ||
        service.category === selectedCategory;

      const matchSubcategory =
        selectedSubcategory === "All" ||
        service.subcategory === selectedSubcategory;

      return (
        matchCategory && matchSubcategory
      );
    }
  );

  // ==========================================
  // VIEW DETAILS
  // ==========================================
  const handleViewDetails = (service) => {
    navigate(
      `/interior-services/${service._id}`
    );
  };

  // ==========================================
  // ADD / REMOVE WISHLIST
  // ==========================================
  const handleWishlist = (e, service) => {
    e.stopPropagation();

    try {
      // Get current user's wishlist key
      const wishlistKey =
        getInteriorWishlistKey();

      // User is not logged in
      if (!wishlistKey) {
        navigate("/login");
        return;
      }

      // Always store ID as string
      const serviceId = String(service._id);

      // Get existing wishlist
      const savedWishlist = JSON.parse(
        localStorage.getItem(wishlistKey) || "[]"
      );

      // Make sure wishlist is an array
      const normalizedWishlist =
        Array.isArray(savedWishlist)
          ? savedWishlist.map((id) => String(id))
          : [];

      // Check whether service already exists
      const alreadyExists =
        normalizedWishlist.includes(serviceId);

      let updatedWishlist;

      if (alreadyExists) {
        // Remove
        updatedWishlist =
          normalizedWishlist.filter(
            (id) => id !== serviceId
          );
      } else {
        // Add
        updatedWishlist = [
          ...normalizedWishlist,
          serviceId,
        ];
      }

      // Save to user-specific localStorage
      localStorage.setItem(
        wishlistKey,
        JSON.stringify(updatedWishlist)
      );

      console.log(
        "Wishlist saved:",
        wishlistKey,
        updatedWishlist
      );

      // Update UI immediately
      setWishlist(updatedWishlist);

      // Notify other components such as Profile
      window.dispatchEvent(
        new Event("wishlistChanged")
      );
    } catch (error) {
      console.error(
        "Interior service wishlist error:",
        error
      );
    }
  };

  return (
    <div className="sr-services">
      <style>{`
        .sr-services {
          background: #F6F3EE;
          min-height: 100vh;
          padding-bottom: 4rem;
          color: #232019;
        }

        .sr-services .sr-header {
          padding: 2.75rem 0 1.75rem;
          border-bottom: 1px solid #E4DED2;
          margin-bottom: 2rem;
        }

        .sr-services .sr-header h2 {
          font-size: 1.9rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 0.35rem;
        }

        .sr-services .sr-header p {
          color: #7A7166;
          font-size: 0.95rem;
          margin: 0;
        }

        .sr-services .cat-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .sr-services .cat-pill {
          border: 1px solid #D8D0C0;
          background: #FFFFFF;
          color: #4A443B;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition:
            background 0.15s ease,
            color 0.15s ease,
            border-color 0.15s ease;
        }

        .sr-services .cat-pill:hover {
          border-color: #A8763E;
          color: #232019;
        }

        .sr-services .cat-pill.active {
          background: #232019;
          border-color: #232019;
          color: #F6F3EE;
        }

        .sr-services .sub-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0.9rem 0 0.4rem;
          margin-bottom: 1.5rem;
          border-top: 1px dashed #E4DED2;
        }

        .sr-services .sub-chip {
          border: 1px solid transparent;
          background: #EFEAE1;
          color: #4A443B;
          padding: 0.3rem 0.85rem;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition:
            background 0.15s ease,
            color 0.15s ease;
        }

        .sr-services .sub-chip:hover {
          background: #E4DBC8;
        }

        .sr-services .sub-chip.active {
          background: #A8763E;
          color: #FFFFFF;
        }

        .sr-services .sr-empty {
          padding: 3rem 1rem;
          text-align: center;
          color: #7A7166;
          background: #FFFFFF;
          border: 1px dashed #D8D0C0;
          border-radius: 10px;
        }

        .sr-services .sr-card {
          border: 1px solid #E4DED2;
          border-radius: 10px;
          overflow: hidden;
          background: #FFFFFF;
          transition:
            box-shadow 0.15s ease,
            transform 0.15s ease;
          position: relative;
        }

        .sr-services .sr-card:hover {
          box-shadow: 0 8px 20px rgba(35, 32, 25, 0.08);
          transform: translateY(-2px);
        }

        .sr-services .sr-card .card-title {
          font-weight: 600;
          font-size: 1.05rem;
        }

        .sr-services .sr-card .card-subtitle {
          color: #7A7166 !important;
          font-size: 0.85rem;
        }

        .sr-services .sr-btn {
          background: #232019;
          border: 1px solid #232019;
          color: #F6F3EE;
          font-weight: 500;
          border-radius: 6px;
          transition: background 0.15s ease;
        }

        .sr-services .sr-btn:hover {
          background: #A8763E;
          border-color: #A8763E;
          color: #FFFFFF;
        }

        .sr-services .sr-wishlist {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          padding: 0;
        }
      `}</style>

      <Container className="pt-1">

        {/* PAGE HEADER */}
        <div className="sr-header">
          <h2>Interior Services</h2>

          <p>
            Residential and commercial interior
            solutions by Seraphim.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="cat-row">
          {categories.map((category) => (
            <button
              key={category}
              className={`cat-pill ${
                selectedCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleCategoryClick(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* SUBCATEGORY FILTER */}
        {subcategories.length > 0 && (
          <div className="sub-row">

            <button
              className={`sub-chip ${
                selectedSubcategory === "All"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedSubcategory("All")
              }
            >
              All {selectedCategory}
            </button>

            {subcategories.map((sub) => (
              <button
                key={sub}
                className={`sub-chip ${
                  selectedSubcategory === sub
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedSubcategory(sub)
                }
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* SERVICES */}
        {loading ? (
          <p className="text-muted">
            Loading services...
          </p>
        ) : (
          <Row className="g-4">

            {filteredServices.length === 0 ? (
              <Col xs={12}>
                <div className="sr-empty">
                  No interior services found. Try a
                  different category.
                </div>
              </Col>
            ) : (
              filteredServices.map((service) => {

                const isWishlisted =
                  wishlist.includes(
                    String(service._id)
                  );

                return (
                  <Col
                    key={service._id}
                    md={4}
                  >
                    <Card className="h-100 sr-card border-0">

                      {/* WISHLIST BUTTON */}
                      <button
                        type="button"
                        className="sr-wishlist"
                        title={
                          isWishlisted
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"
                        }
                        onClick={(e) =>
                          handleWishlist(
                            e,
                            service
                          )
                        }
                      >
                        <span
                          style={{
                            color: isWishlisted
                              ? "#e63946"
                              : "#4A443B",
                          }}
                        >
                          {isWishlisted
                            ? "♥"
                            : "♡"}
                        </span>
                      </button>

                      {/* IMAGE */}
                      {service.images?.[0] && (
                        <Card.Img
                          variant="top"
                          src={service.images[0]}
                          alt={service.name}
                          style={{
                            height: "220px",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      {/* CONTENT */}
                      <Card.Body className="d-flex flex-column">

                        <Card.Title>
                          {service.name}
                        </Card.Title>

                        <Card.Subtitle className="mb-3">
                          {service.category}
                        </Card.Subtitle>

                        <button
                          className="sr-btn mt-auto py-2"
                          onClick={() =>
                            handleViewDetails(
                              service
                            )
                          }
                        >
                          View Details
                        </button>

                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}

          </Row>
        )}
      </Container>
    </div>
  );
}

export default InteriorServices;