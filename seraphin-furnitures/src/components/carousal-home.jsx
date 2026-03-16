import React, { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ─────────────────────────────────────────────
//  SLIDE DATA ARRAY  ← map this to your needs
// ─────────────────────────────────────────────
const slideData = [
  {
    id: 1,
    tag: "New Collection 2025",
    title: "Living Room",
    titleHighlight: "Elegance",
    description:
      "Handcrafted teak wood sofas with premium Italian leather upholstery. Timeless design meets modern comfort for your living space.",
    priceLabel: "Starting from",
    price: "₹1,20,000",
    btnPrimary: "Shop Now",
    btnOutline: "View Collection",
    // 🔁 Replace with your own product image path e.g. "/images/living-room.jpg"
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    imageAlt: "Luxury living room sofa set",
  },
  {
    id: 2,
    tag: "Bestseller",
    title: "Bedroom",
    titleHighlight: "Sanctuary",
    description:
      "Solid sheesham wood beds with hand-carved headboards. Create a personal sanctuary with our bespoke bedroom collection.",
    priceLabel: "Starting from",
    price: "₹85,000",
    btnPrimary: "Explore Beds",
    btnOutline: "Customise",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80",
    imageAlt: "Sheesham wood bedroom bed",
  },
  {
    id: 3,
    tag: "Custom Orders",
    title: "Dining Room",
    titleHighlight: "Stories",
    description:
      "Gather around our solid wood dining tables. Each piece tells a story of craftsmanship passed down through generations of artisans.",
    priceLabel: "Starting from",
    price: "₹95,000",
    btnPrimary: "See Dining Sets",
    btnOutline: "Book Consultation",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80",
    imageAlt: "Solid wood dining table set",
  },
  {
    id: 4,
    tag: "Home Office",
    title: "Work with",
    titleHighlight: "Purpose",
    description:
      "Ergonomic and elegant home office furniture. Boost your productivity without compromising on the warmth of natural wood aesthetics.",
    priceLabel: "Starting from",
    price: "₹45,000",
    btnPrimary: "Shop Desks",
    btnOutline: "View Range",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80",
    imageAlt: "Wooden home office desk",
  },
  {
    id: 5,
    tag: "Outdoor Living",
    title: "Outdoor",
    titleHighlight: "Retreat",
    description:
      "Weather-resistant teak and eucalyptus outdoor sets. Transform your terrace, balcony or garden into a luxurious outdoor retreat.",
    priceLabel: "Starting from",
    price: "₹65,000",
    btnPrimary: "Outdoor Sets",
    btnOutline: "Get Quote",
    image: "https://images.unsplash.com/photo-1600210491892-03d54730d505?w=900&q=80",
    imageAlt: "Teak outdoor garden furniture",
  },
];

// ─────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');

  .sf-carousel-wrapper {
    background: #1a1208;
    overflow: hidden;
    position: relative;
    font-family: 'Jost', sans-serif;
  }

  .sf-track {
    display: flex;
    transition: transform 0.75s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .sf-slide {
    min-width: 100%;
    height: 540px;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  /* ── Right-side product image ── */
  .sf-img-panel {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 48%;
    overflow: hidden;
  }

  .sf-img-panel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.88;
    transition: transform 8s ease;
  }

  .sf-slide:hover .sf-img-panel img {
    transform: scale(1.04);
  }

  .sf-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #1a1208 0%, #1a120870 45%, transparent 100%);
  }

  .sf-img-frame {
    position: absolute;
    inset: 24px 24px 24px 8px;
    border: 1px solid rgba(200,169,126,0.2);
    pointer-events: none;
  }

  .sf-bg-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #c8a97e 1px, transparent 1px);
    background-size: 44px 46px;
    opacity: 0.05;
    pointer-events: none;
  }

  .sf-slide-content {
    position: relative;
    z-index: 2;
    padding: 0 72px;
    max-width: 620px;
  }

  .sf-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #c8a97e;
    margin-bottom: 20px;
  }

  .sf-tag::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: #c8a97e;
  }

  .sf-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 54px;
    font-weight: 300;
    color: #f0e6d3;
    line-height: 1.05;
    margin-bottom: 14px;
  }

  .sf-title-highlight {
    font-weight: 600;
    font-style: italic;
    color: #e8d5b7;
  }

  .sf-desc {
    font-size: 13.5px;
    color: #9a8870;
    line-height: 1.85;
    margin-bottom: 22px;
    max-width: 400px;
  }

  .sf-price-wrap {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 28px;
  }

  .sf-price-label {
    font-size: 11px;
    color: #7a6a5a;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .sf-price-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 600;
    color: #e8d5b7;
  }

  .sf-btn-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .sf-btn-primary {
    background: #c8a97e;
    color: #1a1208;
    border: none;
    padding: 12px 30px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 0;
  }

  .sf-btn-primary:hover {
    background: #e8d5b7;
  }

  .sf-btn-outline {
    background: none;
    color: #c8b89a;
    border: 1px solid #4a3520;
    padding: 12px 30px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 0;
  }

  .sf-btn-outline:hover {
    border-color: #c8a97e;
    color: #e8d5b7;
  }

  .sf-slide-number {
    position: absolute;
    right: 52%;
    bottom: 36px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 80px;
    font-weight: 300;
    color: rgba(255,255,255,0.04);
    z-index: 1;
    line-height: 1;
    user-select: none;
  }

  .sf-controls {
    position: absolute;
    bottom: 28px;
    left: 72px;
    right: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  }

  .sf-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sf-dot {
    height: 2px;
    width: 22px;
    background: #3a2910;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s;
  }

  .sf-dot.active {
    background: #c8a97e;
    width: 44px;
  }

  .sf-right-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sf-counter {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    color: #4a3a2a;
    letter-spacing: 2px;
    margin-right: 6px;
  }

  .sf-arrows {
    display: flex;
    gap: 8px;
  }

  .sf-arrow {
    width: 42px;
    height: 42px;
    background: none;
    border: 1px solid #3a2910;
    color: #c8b89a;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 0;
  }

  .sf-arrow:hover {
    border-color: #c8a97e;
    color: #e8d5b7;
  }

  .sf-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #c8a97e;
    transition: width 0.1s linear;
    z-index: 10;
  }

  @media (max-width: 991px) {
    .sf-slide { height: auto; min-height: 480px; padding: 50px 0 90px; }
    .sf-slide-content { padding: 0 30px; max-width: 100%; }
    .sf-title { font-size: 38px; }
    .sf-img-panel { width: 100%; opacity: 0.18; }
    .sf-img-overlay { background: linear-gradient(to bottom, #1a1208 0%, transparent 40%, #1a1208 100%); }
    .sf-slide-number { display: none; }
    .sf-controls { left: 30px; right: 30px; }
  }

  @media (max-width: 576px) {
    .sf-title { font-size: 30px; }
    .sf-slide-content { padding: 0 20px; }
    .sf-controls { left: 20px; right: 20px; }
    .sf-btn-primary, .sf-btn-outline { padding: 10px 20px; font-size: 10px; }
  }
`;

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
const INTERVAL = 4000;

const SeraphimCarousel = ({ slides = slideData }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const resetProgress = useCallback(() => {
    clearInterval(progressRef.current);
    setProgress(0);
    let val = 0;
    progressRef.current = setInterval(() => {
      val += 100 / (INTERVAL / 100);
      setProgress(Math.min(val, 100));
    }, 100);
  }, []);

  const goTo = useCallback(
    (n) => {
      setCurrent((n + slides.length) % slides.length);
      resetProgress();
    },
    [slides.length, resetProgress]
  );

  const startAutoPlay = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      resetProgress();
    }, INTERVAL);
  }, [slides.length, resetProgress]);

  useEffect(() => {
    resetProgress();
    startAutoPlay();
    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [resetProgress, startAutoPlay]);

  const handlePrev = () => {
    goTo(current - 1);
    startAutoPlay();
  };

  const handleNext = () => {
    goTo(current + 1);
    startAutoPlay();
  };

  return (
    <>
      <style>{styles}</style>

      <div className="sf-carousel-wrapper">

        {/* Slide Track — rendered by mapping slideData */}
        <div
          className="sf-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="sf-slide" key={slide.id}>

              {/* Background dot pattern */}
              <div className="sf-bg-dots" />

              {/* ── Right-side product image panel ── */}
              <div className="sf-img-panel">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="sf-img-overlay" />
                <div className="sf-img-frame" />
              </div>

              {/* Large decorative slide number */}
              <span className="sf-slide-number">0{index + 1}</span>

              {/* Main content */}
              <div className="sf-slide-content">
                <span className="sf-tag">{slide.tag}</span>

                <h2 className="sf-title">
                  {slide.title}{" "}
                  <span className="sf-title-highlight">
                    {slide.titleHighlight}
                  </span>
                </h2>

                <p className="sf-desc">{slide.description}</p>

                <div className="sf-price-wrap">
                  <span className="sf-price-label">{slide.priceLabel}</span>
                  <span className="sf-price-amount">{slide.price}</span>
                </div>

                <div className="sf-btn-group">
                  <button className="sf-btn-primary">{slide.btnPrimary}</button>
                  <button className="sf-btn-outline">{slide.btnOutline}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="sf-controls">

          {/* Dot indicators — mapped from slides */}
          <div className="sf-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`sf-dot${i === current ? " active" : ""}`}
                onClick={() => { goTo(i); startAutoPlay(); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter + Prev / Next arrows */}
          <div className="sf-right-controls">
            <span className="sf-counter">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <div className="sf-arrows">
              <button className="sf-arrow" onClick={handlePrev} aria-label="Previous">
                &#8592;
              </button>
              <button className="sf-arrow" onClick={handleNext} aria-label="Next">
                &#8594;
              </button>
            </div>
          </div>
        </div>

        {/* Auto-scroll progress bar */}
        <div
          className="sf-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default SeraphimCarousel;