import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
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

  // Create separate wishlist key for each user
  const getWishlistKey = (userId) => {
    if (!userId) {
      return "wishlist_guest";
    }

    return `wishlist_${userId}`;
  };

  // Load wishlist from localStorage
  const loadWishlist = useCallback((userId) => {
    try {
      const savedWishlist = localStorage.getItem(
        getWishlistKey(userId)
      );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return [];
    }
  }, []);

  // Current logged-in user
  const [currentUserId, setCurrentUserId] = useState(
    getCurrentUserId
  );

  // Current user's wishlist
  const [wishlist, setWishlist] = useState(() =>
    loadWishlist(getCurrentUserId())
  );

  // Load correct wishlist when login/logout happens
  const loadUserWishlist = useCallback(
    (userId) => {
      setCurrentUserId(userId);
      setWishlist(loadWishlist(userId));
    },
    [loadWishlist]
  );

  // Listen for authentication changes
  useEffect(() => {
    const handleAuthChange = () => {
      const userId = getCurrentUserId();

      loadUserWishlist(userId);
    };

    window.addEventListener(
      "authChanged",
      handleAuthChange
    );

    return () => {
      window.removeEventListener(
        "authChanged",
        handleAuthChange
      );
    };
  }, [loadUserWishlist]);

  // Save wishlist for current user
  useEffect(() => {
    const wishlistKey = getWishlistKey(currentUserId);

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(wishlist)
    );
  }, [wishlist, currentUserId]);

  // Add product to wishlist
  const addToWishlist = (product) => {
    if (!product) return;

    const productId = product._id || product.id;

    if (!productId) {
      console.error("Product ID is missing:", product);
      return;
    }

    setWishlist((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) =>
          (item._id || item.id) === productId
      );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) =>
          (item._id || item.id) !== id
      )
    );
  };

  // Check whether product is in wishlist
  const isInWishlist = (id) => {
    return wishlist.some(
      (item) =>
        (item._id || item.id) === id
    );
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}