import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

const CartContext = createContext();

const BASE_URL = "http://localhost:8000/api";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // array of { product, quantity }
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // ── Helper: attach token to every request ──────────────────
  const authHeader = () => {
    const token = Cookies.get("token");

    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ── Reusable fetch wrapper ────────────────────────────────
  const apiFetch = async (url, options = {}) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    // handle empty responses safely
    if (res.status === 204) return null;

    return res.json();
  };

  // ── Normalize DB cart → UI cart ───────────────────────────
  const normalizeDBCart = (dbCart) => {
    return dbCart.items
      .filter((item) => item.productId)
      .map((item) => ({
        id: item.productId._id,
        title: item.productId.title,
        price: item.productId.price,
        thumbnail: item.productId.thumbnail,
        quantity: item.quantity,
        rating: item.productId.rating,
        brand: item.productId.brand,
      }));
  };

  // ── Load cart on login/logout ─────────────────────────────
  useEffect(() => {
    if (user) {
      fetchCartFromDB();
    } else {
      setCart([]);
    }
  }, [user]);

  // ── Fetch Cart ────────────────────────────────────────────
  const fetchCartFromDB = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/cart");
      setCart(normalizeDBCart(data));
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Add to Cart ───────────────────────────────────────────
  const addToCart = async (product) => {
    // optimistic UI
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (user) {
      try {
        await apiFetch("/cart/add", {
          method: "POST",
          body: JSON.stringify({
            productId: product.id,
            quantity: 1,
          }),
        });
      } catch (err) {
        console.error("Failed to sync cart with DB:", err);
        fetchCartFromDB();
      }
    }
  };

  // ── Remove / Decrease Quantity ────────────────────────────
  const removeFromCart = async (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(Boolean)
    );

    if (user) {
      try {
        await apiFetch(`/cart/remove/${productId}`, {
          method: "PATCH",
        });
      } catch (err) {
        console.error("Failed to sync remove with DB:", err);
        fetchCartFromDB();
      }
    }
  };

  // ── Delete Item Completely ────────────────────────────────
  const deleteFromCart = async (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));

    if (user) {
      try {
        await apiFetch(`/cart/item/${productId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete item from DB:", err);
        fetchCartFromDB();
      }
    }
  };

  // ── Clear Cart ────────────────────────────────────────────
  const clearCart = async () => {
    setCart([]);

    if (user) {
      try {
        await apiFetch("/cart/clear", {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to clear cart in DB:", err);
      }
    }
  };

  // ── Helpers ───────────────────────────────────────────────
  const getCartCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        getCartCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);