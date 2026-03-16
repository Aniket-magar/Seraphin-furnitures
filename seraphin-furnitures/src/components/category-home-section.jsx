import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ─────────────────────────────────────────────────────────────────
//  FALLBACK DATA
//  Used when the API is unavailable or during development.
//  Replace `image` values with your own product photo paths.
// ─────────────────────────────────────────────────────────────────
const FALLBACK_CATEGORIES = [
  {
    id: 1,
    name: "Living Room",
    tag: "Most Popular",
    productCount: 124,
    filter: "Indoor",
    featured: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    slug: "living-room",
  },
  {
    id: 2,
    name: "Bedroom",
    tag: "Bestseller",
    productCount: 86,
    filter: "Indoor",
    featured: false,
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    slug: "bedroom",
  },
  {
    id: 3,
    name: "Dining Room",
    tag: "Custom Orders",
    productCount: 63,
    filter: "Indoor",
    featured: false,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    slug: "dining-room",
  },
  {
    id: 4,
    name: "Home Office",
    tag: "New Arrivals",
    productCount: 48,
    filter: "Indoor",
    featured: false,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    slug: "home-office",
  },
  {
    id: 5,
    name: "Outdoor",
    tag: "Seasonal",
    productCount: 35,
    filter: "Outdoor",
    featured: false,
    image: "https://images.unsplash.com/photo-1600210491892-03d54730d505?w=800&q=80",
    slug: "outdoor",
  },
  {
    id: 6,
    name: "Storage",
    tag: "Space Savers",
    productCount: 57,
    filter: "Indoor",
    featured: false,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    slug: "storage",
  },
];

const FILTERS = ["All", "Indoor", "Outdoor"];

// ─────────────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

  .sc-section {
    background: #f7f3ee;
    padding: 90px 60px;
    font-family: 'Jost', sans-serif;
  }

  /* ── Header ── */
  .sc-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .sc-label {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #c8a97e;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sc-label::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: #c8a97e;
  }

  .sc-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 46px;
    font-weight: 300;
    color: #1a1208;
    line-height: 1.1;
    margin: 0;
  }

  .sc-heading em {
    font-weight: 600;
    font-style: italic;
  }

  .sc-view-all {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8a7060;
    text-decoration: none;
    border-bottom: 1px solid #d4c4b0;
    padding-bottom: 3px;
    transition: color 0.2s, border-color 0.2s;
    white-space: nowrap;
    align-self: flex-end;
    margin-bottom: 4px;
  }

  .sc-view-all:hover {
    color: #1a1208;
    border-color: #1a1208;
  }

  /* ── Filter Pills ── */
  .sc-filter-row {
    display: flex;
    gap: 8px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  .sc-filter-btn {
    background: none;
    border: 1px solid #d4c4b0;
    color: #8a7060;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 9px 20px;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 0;
  }

  .sc-filter-btn:hover,
  .sc-filter-btn.active {
    background: #1a1208;
    border-color: #1a1208;
    color: #e8d5b7;
  }

  /* ── Grid ── */
  .sc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* ── Card ── */
  .sc-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #1a1208;
    display: block;
    text-decoration: none;
  }

  .sc-card-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
    transition: transform 0.7s ease, opacity 0.4s ease;
    opacity: 0.84;
  }

  .sc-card:hover .sc-card-img {
    transform: scale(1.06);
    opacity: 0.6;
  }

  .sc-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(26,18,8,0.85) 35%, transparent 100%);
    transition: background 0.4s;
  }

  .sc-card:hover .sc-card-overlay {
    background: linear-gradient(to top, rgba(26,18,8,0.95) 50%, rgba(26,18,8,0.1) 100%);
  }

  .sc-card-body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 22px;
    z-index: 2;
  }

  .sc-card-tag {
    display: block;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c8a97e;
    margin-bottom: 6px;
  }

  .sc-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 400;
    color: #f0e6d3;
    line-height: 1.2;
    margin-bottom: 6px;
  }

  .sc-card-count {
    font-size: 11px;
    color: #9a8878;
    letter-spacing: 1px;
  }

  .sc-card-arrow {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    border: 1px solid rgba(200, 169, 126, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c8a97e;
    font-size: 16px;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 3;
  }

  .sc-card:hover .sc-card-arrow {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Featured card (first item spans 2 cols + 2 rows) ── */
  .sc-card-featured {
    grid-column: span 2;
    grid-row: span 2;
  }

  .sc-card-featured .sc-card-img {
    height: 100%;
    min-height: 620px;
  }

  .sc-card-featured .sc-card-name {
    font-size: 34px;
  }

  /* ── Skeleton Loader ── */
  .sc-skeleton {
    background: #e8e0d8;
    animation: sc-pulse 1.4s ease-in-out infinite;
  }

  .sc-skeleton-card {
    height: 300px;
  }

  .sc-skeleton-featured {
    height: 620px;
    grid-column: span 2;
    grid-row: span 2;
  }

  @keyframes sc-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }

  /* ── Error state ── */
  .sc-error {
    text-align: center;
    padding: 60px 20px;
    color: #9a8878;
    font-size: 14px;
    grid-column: 1 / -1;
  }

  .sc-error-retry {
    display: inline-block;
    margin-top: 14px;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c8a97e;
    border: 1px solid #c8a97e;
    padding: 9px 20px;
    background: none;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    transition: all 0.2s;
  }

  .sc-error-retry:hover {
    background: #1a1208;
    border-color: #1a1208;
    color: #e8d5b7;
  }

  /* ── Responsive ── */
  @media (max-width: 991px) {
    .sc-section { padding: 60px 30px; }
    .sc-heading { font-size: 36px; }
    .sc-grid { grid-template-columns: repeat(2, 1fr); }
    .sc-card-featured { grid-column: span 2; grid-row: span 1; }
    .sc-card-featured .sc-card-img { min-height: 320px; }
    .sc-card-featured .sc-card-name { font-size: 26px; }
    .sc-skeleton-featured { height: 320px; }
  }

  @media (max-width: 576px) {
    .sc-section { padding: 48px 20px; }
    .sc-heading { font-size: 30px; }
    .sc-grid { grid-template-columns: 1fr; }
    .sc-card-featured { grid-column: span 1; grid-row: span 1; }
    .sc-card-featured .sc-card-img { min-height: 280px; }
    .sc-skeleton-featured { height: 280px; grid-column: span 1; grid-row: span 1; }
  }
`;

// ─────────────────────────────────────────────────────────────────
//  SKELETON LOADER
// ─────────────────────────────────────────────────────────────────
const SkeletonGrid = () => (
  <div className="sc-grid">
    <div className="sc-skeleton sc-skeleton-featured" />
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="sc-skeleton sc-skeleton-card" />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────
//  SINGLE CATEGORY CARD
// ─────────────────────────────────────────────────────────────────
const CategoryCard = ({ category, index, isFeatured }) => (
  <a
    href={`/collections/${category.slug}`}
    className={`sc-card${isFeatured ? " sc-card-featured" : ""}`}
  >
    <img
      className="sc-card-img"
      src={category.image}
      alt={category.name}
      loading={index < 2 ? "eager" : "lazy"}
    />
    <div className="sc-card-overlay" />
    <div className="sc-card-arrow">&#8599;</div>
    <div className="sc-card-body">
      <span className="sc-card-tag">{category.tag}</span>
      <div className="sc-card-name">{category.name}</div>
      <div className="sc-card-count">{category.productCount} products</div>
    </div>
  </a>
);

// ─────────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
const CategoriesSection = ({
  // ← Pass your real API endpoint here, e.g. "/api/categories"
  apiUrl = null,
  // ← Override heading text if needed
  heading = "Shop by",
  headingHighlight = "Category",
  // ← Filters shown above the grid — derive from your data if needed
  filters = FILTERS,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // ── Fetch categories ──────────────────────────────────────────
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      if (apiUrl) {
        // Real API call — your backend should return an array matching the shape below:
        // [{ id, name, tag, productCount, filter, featured, image, slug }]
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCategories(data);
      } else {
        // Development fallback — simulates a 600ms network delay
        await new Promise((r) => setTimeout(r, 600));
        setCategories(FALLBACK_CATEGORIES);
      }
    } catch (err) {
      console.error("CategoriesSection fetch error:", err);
      setError("Could not load categories. Please try again.");
      setCategories(FALLBACK_CATEGORIES); // graceful fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [apiUrl]);

  // ── Filter categories ────────────────────────────────────────
  const filtered =
    activeFilter === "All"
      ? categories
      : categories.filter((c) => c.filter === activeFilter);

  return (
    <>
      <style>{styles}</style>

      <section className="sc-section">
        {/* ── Header ── */}
        <div className="sc-header">
          <div>
            <div className="sc-label">Our Collections</div>
            <h2 className="sc-heading">
              {heading} <em>{headingHighlight}</em>
            </h2>
          </div>
          <a href="/collections" className="sc-view-all">
            View all collections &#8594;
          </a>
        </div>

        {/* ── Filter Pills ── */}
        <div className="sc-filter-row">
          {filters.map((f) => (
            <button
              key={f}
              className={`sc-filter-btn${f === activeFilter ? " active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Grid / Loader / Error ── */}
        {loading ? (
          <SkeletonGrid />
        ) : error && filtered.length === 0 ? (
          <div className="sc-grid">
            <div className="sc-error">
              <p>{error}</p>
              <button className="sc-error-retry" onClick={fetchCategories}>
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="sc-grid">
            {filtered.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                // First card is featured (spans 2 cols) only when showing "All"
                isFeatured={index === 0 && activeFilter === "All"}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CategoriesSection;