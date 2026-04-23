import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; // ✅ ADD THIS

function Cart() {
  const navigate = useNavigate();
  const { cart = [], removeFromCart, getTotal } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <>
          <p>No items in cart</p>

          <Button onClick={() => navigate("/products")}>
            Shop Now
          </Button>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px" }}>
              <h3>{item.title}</h3>
              <p>
                ₹{item.price} × {item.quantity}
              </p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{getTotal()}</h2>

          <Button onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;