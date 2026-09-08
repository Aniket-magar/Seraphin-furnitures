import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // ✅ FIXED: useEffect INSIDE component
  useEffect(() => {
    console.log("Cart updated:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log("Adding:", product);

    const productId = product._id || product.id;
    const existing = cart.find((item) => (item._id || item.id) === productId);

    if (existing) {
      setCart(
        cart.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => (item._id || item.id) !== id));
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
