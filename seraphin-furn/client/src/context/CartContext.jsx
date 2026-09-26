import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Get currently logged-in user's ID
  const getCurrentUserId = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      const user = JSON.parse(storedUser);

      return user?.id || user?._id || null;
    } catch (error) {
      console.error("Error reading current user:", error);
      return null;
    }
  };

  // Create separate cart key for each user
  const getCartKey = (userId) => {
    if (!userId) {
      return "cart_guest";
    }

    return `cart_${userId}`;
  };

  // Load cart from localStorage
  const loadCart = useCallback((userId) => {
    try {
      const savedCart = localStorage.getItem(getCartKey(userId));

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  }, []);

  const [currentUserId, setCurrentUserId] = useState(
    getCurrentUserId
  );

  const [cart, setCart] = useState(() =>
    loadCart(getCurrentUserId())
  );

  /*
   * Load the correct cart whenever the logged-in
   * customer changes.
   */
  const loadUserCart = useCallback(
    (userId) => {
      setCurrentUserId(userId);
      setCart(loadCart(userId));
    },
    [loadCart]
  );

  /*
   * Listen for login/logout events from other parts
   * of the application.
   */
  useEffect(() => {
    const handleAuthChange = () => {
      const userId = getCurrentUserId();

      loadUserCart(userId);
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener(
        "authChanged",
        handleAuthChange
      );
    };
  }, [loadUserCart]);

  /*
   * Save the cart belonging to the CURRENT user.
   */
  useEffect(() => {
    const cartKey = getCartKey(currentUserId);

    localStorage.setItem(
      cartKey,
      JSON.stringify(cart)
    );

    console.log(
      `Cart saved for ${
        currentUserId ? currentUserId : "guest"
      }:`,
      cart
    );
  }, [cart, currentUserId]);

  // Add product to cart
  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) =>
          (item._id || item.id) === productId
      );

      if (existing) {
        return currentCart.map((item) =>
          (item._id || item.id) === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          (item._id || item.id) !== id
      )
    );
  };

  // Update product quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        (item._id || item.id) === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // Clear current user's cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const getTotal = () => {
    return cart.reduce(
      (total, item) =>
        total +
        (item.price || 0) *
          (item.quantity || 1),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
