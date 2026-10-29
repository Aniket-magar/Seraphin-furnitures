import React from "react";
import { Link } from "react-router-dom";
import "./AboutSection.css";

const values = [
  {
    number: "01",
    title: "Thoughtful Design",
    description:
      "Every detail is considered to create interiors that feel elegant, practical, and timeless.",
  },
  {
    number: "02",
    title: "Quality Craftsmanship",
    description:
      "We focus on refined finishes, carefully selected materials, and attention to detail.",
  },
  {
    number: "03",
    title: "Personalized Spaces",
    description:
      "Our furniture and modular solutions are designed around your space and lifestyle.",
  },
  {
    number: "04",
    title: "Customer First",
    description:
      "We believe great design begins with understanding your needs and your vision.",
  },
];

export default function AboutSection() {
  return (
    <section className="seraphin-about">
      {/* Hero introduction */}
      <div className="about-container">
        <div className="about-hero">
          <div className="about-hero-content">
            <span className="about-eyebrow">
              THE SERAPHIN EXPERIENCE
            </span>

            <h2>
              Spaces That Speak.
              <br />
              <span>Design That Lasts.</span>
            </h2>

            <p className="about-intro">
              At SERAPHIN, we believe furniture is more than what
              fills a room. It is what makes a space feel like home.
              We bring together thoughtful design, refined aesthetics,
              and functional furniture to create spaces that reflect
              your lifestyle.
            </p>

            <div className="about-actions">
              <Link to="/about" className="about-btn">
                Discover Our Story
                <span aria-hidden="true">↗</span>
              </Link>

              <span className="about-caption">
                DESIGNED FOR YOUR WAY OF LIVING
              </span>
            </div>
          </div>

          <div className="about-hero-image">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
              alt="Elegant contemporary living room with warm neutral furniture"
              loading="lazy"
            />

            <div className="about-image-label">
              <span>01 / 04</span>
              <p>Elegance in every detail.</p>
            </div>
          </div>
        </div>

        {/* Brand story */}
        <div className="about-story">
          <div className="about-story-heading">
            <span className="about-eyebrow">OUR PHILOSOPHY</span>

            <h3>
              Beauty in simplicity.
              <br />
              <span>Purpose in every detail.</span>
            </h3>
          </div>

          <div className="about-story-content">
            <p>
              We envision homes where every element has a purpose
              and every corner feels intentional. From modern modular
              kitchens to carefully selected furniture, SERAPHIN
              celebrates the balance between aesthetics and everyday
              functionality.
            </p>

            <p>
              Our approach is simple: understand the space, respect
              the way you live, and help you create interiors that
              feel personal, comfortable, and timeless.
            </p>

            <Link to="/interior-services" className="about-text-link">
              Explore our interior services <span>→</span>
            </Link>
          </div>
        </div>

        {/* Values */}
        <div className="about-values">
          <div className="about-values-heading">
            <span className="about-eyebrow">WHAT DEFINES US</span>
            <h3>Designed with intention.</h3>
            <p>
              The principles behind every space we help create.
            </p>
          </div>

          <div className="about-values-grid">
            {values.map((value) => (
              <article className="about-value-card" key={value.number}>
                <span className="about-value-number">
                  {value.number}
                </span>

                <div className="about-value-line" />

                <h4>{value.title}</h4>

                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Benefits banner */}
        <div className="about-benefits">
          <div className="about-benefits-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
              alt="Premium interior featuring contemporary furniture and natural finishes"
              loading="lazy"
            />
          </div>

          <div className="about-benefits-content">
            <span className="about-eyebrow">WHY SERAPHIN</span>

            <h3>
              Your vision.
              <br />
              <span>Our design approach.</span>
            </h3>

            <p>
              Every home is different. Your furniture should be,
              too. We aim to make the process of creating your
              ideal space more personal, considered, and inspiring.
            </p>

            <ul className="about-benefits-list">
              <li>
                <span>✦</span>
                Designs tailored to your lifestyle
              </li>
              <li>
                <span>✦</span>
                Modern furniture and modular solutions
              </li>
              <li>
                <span>✦</span>
                A balance of style and functionality
              </li>
              <li>
                <span>✦</span>
                A customer-focused design experience
              </li>
            </ul>

            <Link to="/products" className="about-btn">
              Explore Our Collection
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="about-cta">
          <span className="about-eyebrow">LET'S CREATE SOMETHING BEAUTIFUL</span>

          <h3>
            Your space deserves
            <br />
            <span>a thoughtful touch.</span>
          </h3>

          <p>
            Discover furniture and interior solutions that bring
            your ideas to life.
          </p>

          <div className="about-cta-actions">
            <Link to="/interior-services" className="about-btn about-btn-light">
              Start Your Journey <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/products" className="about-cta-secondary">
              Browse Furniture
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}