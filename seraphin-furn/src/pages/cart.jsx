import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, getTotal } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: "15px" }}>
          <h3>{item.title}</h3>
          <p>₹{item.price} × {item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹{getTotal()}</h2>
    </div>
  );
}

export default Cart;