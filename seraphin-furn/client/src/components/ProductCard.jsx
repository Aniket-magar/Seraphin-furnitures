import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Hook must be called before any return
  const [liked, setLiked] = useState(() => {
    if (!product) {
      return false;
    }

    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const productId = product._id || product.id;

      return savedWishlist.some(
        (item) =>
          (item._id || item.id) === productId
      );
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return false;
    }
  });

  if (!product) return null;

  const productId = product._id || product.id;
  const productName = product.name || product.title;

  const productImage =
    product.images?.[0] ||
    product.image ||
    "/images/demo1.avif";

  const handleLike = (e) => {
    e.stopPropagation();

    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      if (liked) {
        // Remove product
        const updatedWishlist = savedWishlist.filter(
          (item) =>
            (item._id || item.id) !== productId
        );

        localStorage.setItem(
          "wishlist",
          JSON.stringify(updatedWishlist)
        );

        setLiked(false);
      } else {
        // Add product
        const alreadyExists = savedWishlist.some(
          (item) =>
            (item._id || item.id) === productId
        );

        if (!alreadyExists) {
          savedWishlist.push(product);

          localStorage.setItem(
            "wishlist",
            JSON.stringify(savedWishlist)
          );
        }

        setLiked(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        margin: "10px",
        cursor: "pointer",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        position: "relative",
      }}
      onClick={() =>
        navigate(`/product/${productId}`)
      }
    >
      {/* LIKE BUTTON */}
      <button
        type="button"
        onClick={handleLike}
        title={
          liked
            ? "Remove from Wishlist"
            : "Add to Wishlist"
        }
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 20,
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "25px",
          lineHeight: "1",
          cursor: "pointer",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
          padding: 0,
        }}
      >
        {liked ? "♥" : "♡"}
      </button>

      {/* IMAGE */}
      <div
        style={{
          height: "200px",
          overflow: "hidden",
        }}
      >
        <Card.Img
          variant="top"
          src={productImage}
          alt={productName}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* CONTENT */}
      <Card.Body>
        <Card.Title>
          {productName}
        </Card.Title>

        <Card.Text>
          ₹{product.price}
        </Card.Text>

        <Button
          variant="dark"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${productId}`);
          }}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default React.memo(ProductCard);