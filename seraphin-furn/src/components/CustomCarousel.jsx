import { Carousel } from "react-bootstrap";
import demo1 from "../assets/demo1.avif";
import demo2 from "../assets/demo2.avif";
import demo3 from "../assets/demo3.avif";

function CustomCarousel() {
  const slides = [
    {
      img: demo1,
      title: "Modern Luxury Sofa",
      desc: "Experience premium comfort crafted for modern living spaces.",
      tag: "Living Room",
    },
    {
      img: demo2,
      title: "Elegant Designer Chair",
      desc: "Minimal design meets maximum comfort and durability.",
      tag: "Office Collection",
    },
    {
      img: demo3,
      title: "Premium Wooden Table",
      desc: "Handcrafted wood finish for timeless dining aesthetics.",
      tag: "Dining Series",
    },
  ];

  return (
    <Carousel interval={3000} pause={false} wrap={true}>
      {slides.map((item, index) => (
        <Carousel.Item key={index}>
          
          {/* FULL HERO CONTAINER */}
          <div
            style={{
              height: "550px",
              margin: "30px",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
            }}
          >
            
            {/* IMAGE SIDE */}
            <div style={{ flex: 1, position: "relative" }}>
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scale(1.05)",
                  transition: "transform 0.6s ease",
                }}
              />

              {/* DARK OVERLAY FOR DEPTH */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.2), transparent)",
                }}
              />
            </div>

            {/* GLASS INFO PANEL */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "50px",
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.75)",
              }}
            >
              
              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                {item.tag}
              </span>

              <h1
                style={{
                  fontSize: "38px",
                  fontWeight: "700",
                  marginTop: "10px",
                  color: "#111",
                }}
              >
                {item.title}
              </h1>

              <p
                style={{
                  marginTop: "15px",
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                {item.desc}
              </p>

              <div style={{ marginTop: "25px", display: "flex", gap: "12px" }}>
                
                <button
                  style={{
                    padding: "12px 22px",
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  Explore Collection
                </button>

                <button
                  style={{
                    padding: "12px 22px",
                    border: "1px solid #111",
                    background: "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>

              </div>
            </div>
          </div>

        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel;