import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { getProducts } from "../api/productService";
import { useLocation } from "react-router-dom";

// ✅ Product categories data
const productCategories = {
  "Home Furniture": [
    "Modular Kitchen",
    "Wardrobe",
    "Bed",
    "Sofa Set",
    "TV Unit",
    "Bookshelf",
    "Study Table",
    "Computer Table",
    "Gaming Setup",
  ],
  "Commercial Furniture": [
    "Office Furniture",
    "Bank Furniture",
    "Modular Workstation",
    "Office Tables",
    "Seating",
    "Storage Solutions",
    "Display Racks",
    "Partitions",
  ],
  "Doors & Windows": [
    "Flush Door",
    "PVC Door",
    "HDHMR Door",
    "WPC Door",
    "Wooden Door",
    "uPVC Window",
  ],
  "Glass": ["Toughened Glass"],
};

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = products.filter((p) => p.available !== false);
  const categories = ["All", ...Object.keys(productCategories)];
  const subcategories =
    selectedCategory !== "All" ? productCategories[selectedCategory] : [];

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory("All"); // reset subcategory whenever category changes
  };

  // ✅ COMBINED FILTER (search + category + subcategory)
  const filteredProducts = visibleProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSubcategory =
      selectedSubcategory === "All" || p.subcategory === selectedSubcategory;

    return matchSearch && matchCategory && matchSubcategory;
  });

  // ✅ RELATED PRODUCTS
  const relatedProducts = visibleProducts.filter(
    (p) =>
      p.category === filteredProducts[0]?.category &&
      !p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sr-products">
      <style>{`
        .sr-products {
          background: #F6F3EE;
          min-height: 100vh;
          padding-bottom: 4rem;
          color: #232019;
        }
        .sr-products .sr-header {
          padding: 2.75rem 0 1.75rem;
          border-bottom: 1px solid #E4DED2;
          margin-bottom: 2rem;
        }
        .sr-products .sr-header h4 {
          font-size: 1.9rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 0.35rem;
        }
        .sr-products .sr-header p {
          color: #7A7166;
          font-size: 0.95rem;
          margin: 0;
        }
        .sr-products .cat-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .sr-products .cat-pill {
          border: 1px solid #D8D0C0;
          background: #FFFFFF;
          color: #4A443B;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .sr-products .cat-pill:hover {
          border-color: #A8763E;
          color: #232019;
        }
        .sr-products .cat-pill.active {
          background: #232019;
          border-color: #232019;
          color: #F6F3EE;
        }
        .sr-products .sub-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0.9rem 0 0.4rem;
          margin-bottom: 1.25rem;
          border-top: 1px dashed #E4DED2;
        }
        .sr-products .sub-chip {
          border: 1px solid transparent;
          background: #EFEAE1;
          color: #4A443B;
          padding: 0.3rem 0.85rem;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .sr-products .sub-chip:hover {
          background: #E4DBC8;
        }
        .sr-products .sub-chip.active {
          background: #A8763E;
          color: #FFFFFF;
        }
        .sr-products .sr-empty {
          padding: 3rem 1rem;
          text-align: center;
          color: #7A7166;
          background: #FFFFFF;
          border: 1px dashed #D8D0C0;
          border-radius: 10px;
        }
        .sr-products .sr-card-col {
          margin-bottom: 1.75rem;
        }
        .sr-products .sr-related {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #E4DED2;
        }
        .sr-products .sr-related h5 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
      `}</style>

      <Container className="pt-1">
        {/* HEADING */}
        <div className="sr-header">
          <h4>{search ? `Results for "${search}"` : "All Products"}</h4>
          <p>
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
            {selectedSubcategory !== "All" ? ` — ${selectedSubcategory}` : ""}
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="cat-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SUBCATEGORY FILTER */}
        {subcategories.length > 0 && (
          <div className="sub-row">
            <button
              className={`sub-chip ${selectedSubcategory === "All" ? "active" : ""}`}
              onClick={() => setSelectedSubcategory("All")}
            >
              All {selectedCategory}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                className={`sub-chip ${selectedSubcategory === sub ? "active" : ""}`}
                onClick={() => setSelectedSubcategory(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* MAIN RESULTS */}
        <Row>
          {filteredProducts.length === 0 ? (
            <Col xs={12}>
              <div className="sr-empty">No products found. Try a different category or search.</div>
            </Col>
          ) : (
            filteredProducts.map((item) => (
              <Col key={item._id} md={4} className="sr-card-col">
                <ProductCard product={item} />
              </Col>
            ))
          )}
        </Row>

        {/* RELATED PRODUCTS SECTION */}
        {filteredProducts.length > 0 && relatedProducts.length > 0 && (
          <div className="sr-related">
            <h5>Related Products</h5>
            <Row>
              {relatedProducts.slice(0, 6).map((item) => (
                <Col key={item._id} md={4} className="sr-card-col">
                  <ProductCard product={item} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Products;