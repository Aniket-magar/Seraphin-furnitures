import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const {
    cart = [],
    removeFromCart,
    updateQuantity,
    getTotal,
  } = useContext(CartContext);

  const hasQuantityControl = typeof updateQuantity === "function";

  const handleDecrease = (item) => {
    const id = item._id || item.id;
    const current = item.quantity || 1;
    if (current <= 1) return;
    updateQuantity(id, current - 1);
  };

  const handleIncrease = (item) => {
    const id = item._id || item.id;
    const current = item.quantity || 1;
    updateQuantity(id, current + 1);
  };

  return (
    <div className="sr-cart">
      <style>{`
        .sr-cart {
          background: #F6F3EE;
          min-height: 100vh;
          color: #232019;
          padding-bottom: 4rem;
        }
        .sr-cart .sr-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 0;
        }
        .sr-cart h1 {
          font-size: 1.9rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin-bottom: 0.3rem;
        }
        .sr-cart .sr-subhead {
          color: #7A7166;
          font-size: 0.92rem;
          margin-bottom: 2rem;
        }

        .sr-cart .sr-empty {
          background: #FFFFFF;
          border: 1px dashed #D8D0C0;
          border-radius: 12px;
          padding: 3.5rem 2rem;
          text-align: center;
        }
        .sr-cart .sr-empty-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #F0E6D6;
          color: #A8763E;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .sr-cart .sr-empty h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }
        .sr-cart .sr-empty p {
          color: #7A7166;
          font-size: 0.92rem;
          margin-bottom: 1.5rem;
        }

        .sr-cart .sr-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 860px) {
          .sr-cart .sr-layout {
            grid-template-columns: 1fr;
          }
        }

        .sr-cart .sr-item-list {
          background: #FFFFFF;
          border: 1px solid #E4DED2;
          border-radius: 12px;
          overflow: hidden;
        }
        .sr-cart .sr-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.25rem;
        }
        .sr-cart .sr-item:not(:last-child) {
          border-bottom: 1px solid #E4DED2;
        }
        .sr-cart .sr-item-img {
          width: 76px;
          height: 76px;
          object-fit: cover;
          border-radius: 8px;
          background: #EFEAE1;
          flex-shrink: 0;
        }
        .sr-cart .sr-item-info {
          flex: 1;
          min-width: 0;
        }
        .sr-cart .sr-item-info h3 {
          font-size: 0.98rem;
          font-weight: 600;
          margin: 0 0 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sr-cart .sr-item-price {
          color: #7A7166;
          font-size: 0.85rem;
        }
        .sr-cart .sr-qty {
          display: inline-flex;
          align-items: center;
          border: 1px solid #D8D0C0;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .sr-cart .sr-qty button {
          background: #FFFFFF;
          border: none;
          width: 32px;
          height: 34px;
          font-size: 1rem;
          color: #232019;
          cursor: pointer;
        }
        .sr-cart .sr-qty button:disabled {
          color: #C9C2B4;
          cursor: not-allowed;
        }
        .sr-cart .sr-qty button:hover:not(:disabled) {
          background: #EFEAE1;
        }
        .sr-cart .sr-qty span {
          width: 32px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .sr-cart .sr-line-total {
          font-weight: 600;
          font-size: 0.95rem;
          min-width: 80px;
          text-align: right;
          flex-shrink: 0;
        }
        .sr-cart .sr-remove {
          background: none;
          border: none;
          color: #7A7166;
          font-size: 0.8rem;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0.3rem 0.4rem;
        }
        .sr-cart .sr-remove:hover {
          color: #B3413A;
        }

        .sr-cart .sr-summary {
          background: #FFFFFF;
          border: 1px solid #E4DED2;
          border-radius: 12px;
          padding: 1.5rem;
          position: sticky;
          top: 1.5rem;
        }
        .sr-cart .sr-summary h5 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 1.1rem;
        }
        .sr-cart .sr-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #4A443B;
          margin-bottom: 0.7rem;
        }
        .sr-cart .sr-summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.15rem;
          font-weight: 600;
          padding-top: 0.9rem;
          margin-top: 0.4rem;
          border-top: 1px solid #E4DED2;
        }
        .sr-cart .sr-btn-primary {
          width: 100%;
          background: #232019;
          border: 1px solid #232019;
          color: #F6F3EE;
          font-weight: 500;
          border-radius: 8px;
          padding: 0.7rem;
          margin-top: 1.25rem;
          transition: background 0.15s ease;
        }
        .sr-cart .sr-btn-primary:hover {
          background: #A8763E;
          border-color: #A8763E;
          color: #FFFFFF;
        }
        .sr-cart .sr-btn-outline {
          width: 100%;
          background: transparent;
          border: 1px solid #D8D0C0;
          color: #4A443B;
          font-weight: 500;
          border-radius: 8px;
          padding: 0.65rem;
          margin-top: 0.6rem;
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .sr-cart .sr-btn-outline:hover {
          border-color: #232019;
          color: #232019;
        }
      `}</style>

      <div className="sr-container">
        <h1>My cart</h1>
        <p className="sr-subhead">
          {cart.length === 0
            ? "Review your items before checkout."
            : `${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`}
        </p>

        {cart.length === 0 ? (
          <div className="sr-empty">
            <div className="sr-empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h3>Your cart is empty</h3>
            <p>Browse our furniture, doors and interior products to get started.</p>
            <button className="sr-btn-primary" style={{ width: "auto", padding: "0.7rem 1.8rem" }} onClick={() => navigate("/products")}>
              Shop now
            </button>
          </div>
        ) : (
          <div className="sr-layout">
            {/* ITEM LIST */}
            <div className="sr-item-list">
              {cart.map((item) => {
                const id = item._id || item.id;
                const qty = item.quantity || 1;
                const price = item.price || 0;

                return (
                  <div key={id} className="sr-item">
                    <img
                      className="sr-item-img"
                      src={item.images?.[0] || item.image || "/images/demo1.avif"}
                      alt={item.name || item.title}
                    />

                    <div className="sr-item-info">
                      <h3>{item.name || item.title}</h3>
                      <div className="sr-item-price">₹{price.toLocaleString("en-IN")} each</div>
                    </div>

                    {hasQuantityControl ? (
                      <div className="sr-qty">
                        <button onClick={() => handleDecrease(item)} disabled={qty <= 1}>
                          −
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => handleIncrease(item)}>+</button>
                      </div>
                    ) : (
                      <div className="sr-item-price">Qty: {qty}</div>
                    )}

                    <div className="sr-line-total">
                      ₹{(price * qty).toLocaleString("en-IN")}
                    </div>

                    <button className="sr-remove" onClick={() => removeFromCart(id)}>
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <div className="sr-summary">
              <h5>Order summary</h5>

              <div className="sr-summary-row">
                <span>Subtotal</span>
                <span>₹{getTotal().toLocaleString("en-IN")}</span>
              </div>
              <div className="sr-summary-row">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="sr-summary-total">
                <span>Total</span>
                <span>₹{getTotal().toLocaleString("en-IN")}</span>
              </div>

              <button className="sr-btn-primary" onClick={() => navigate("/checkout")}>
                Proceed to checkout
              </button>
              <button className="sr-btn-outline" onClick={() => navigate("/products")}>
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;