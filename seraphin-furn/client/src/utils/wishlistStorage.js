// Get the currently logged-in user's unique identifier
export const getCurrentUserKey = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      return null;
    }

    // Prefer MongoDB _id
    if (user._id) {
      return String(user._id);
    }

    // Fallback if backend uses id
    if (user.id) {
      return String(user.id);
    }

    // Final fallback
    if (user.email) {
      return user.email.toLowerCase().trim();
    }

    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Product wishlist key
export const getProductWishlistKey = () => {
  const userKey = getCurrentUserKey();

  if (!userKey) {
    return null;
  }

  return `wishlist_${userKey}`;
};

// Interior service wishlist key
export const getInteriorWishlistKey = () => {
  const userKey = getCurrentUserKey();

  if (!userKey) {
    return null;
  }

  return `interiorWishlist_${userKey}`;
};