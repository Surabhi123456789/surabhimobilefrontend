import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
  LOAD_CART_FROM_STORAGE,
} from "../constants/cartConstants";
import axios from "axios";

// Helper function to save cart data to localStorage with user ID
const saveCartToStorage = (userId, cartData) => {
  if (!userId) return;

  try {
    const existingCarts = JSON.parse(localStorage.getItem("userCarts") || "{}");
    existingCarts[userId] = cartData;
    localStorage.setItem("userCarts", JSON.stringify(existingCarts));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Helper function to load cart data from localStorage for specific user
const loadCartFromStorage = (userId) => {
  if (!userId) return { cartItems: [], shippingInfo: {} };

  try {
    const carts = JSON.parse(localStorage.getItem("userCarts") || "{}");
    return carts[userId] || { cartItems: [], shippingInfo: {} };
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return { cartItems: [], shippingInfo: {} };
  }
};

// Load cart from storage when user logs in
export const loadCartFromStorageAction = (userId) => (dispatch) => {
  const cartData = loadCartFromStorage(userId);
  dispatch({
    type: LOAD_CART_FROM_STORAGE,
    payload: cartData,
  });
};

// Add to Cart - FIXED VERSION
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
   const baseURL = process.env.REACT_APP_BACKEND_URL;   // 👈 pulled from .env
    const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`);

    // Get current user from state - FIXED: accessing user directly
    const { user } = getState().user;

    // Check if user is authenticated - FIXED: checking user directly
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    // Prevent admins from adding to cart - FIXED: accessing role directly
    if (user.role === "admin") {
      alert("Admin cannot add items to cart");
      return;
    }

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    // Save to localStorage with user ID - FIXED: accessing _id directly
    const cartState = getState().cart;
    saveCartToStorage(user._id, {
      cartItems: cartState.cartItems,
      shippingInfo: cartState.shippingInfo,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

// Remove from Cart - FIXED VERSION
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    const { user } = getState().user;

    // FIXED: checking user directly
    if (!user) {
      return;
    }

    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    // Save to localStorage with user ID - FIXED: accessing _id directly
    const cartState = getState().cart;
    saveCartToStorage(user._id, {
      cartItems: cartState.cartItems,
      shippingInfo: cartState.shippingInfo,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// Save Shipping Info - FIXED VERSION
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  try {
    const { user } = getState().user;

    // FIXED: checking user directly
    if (!user) {
      return;
    }

    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    // Save to localStorage with user ID - FIXED: accessing _id directly
    const cartState = getState().cart;
    saveCartToStorage(user._id, {
      cartItems: cartState.cartItems,
      shippingInfo: cartState.shippingInfo,
    });
  } catch (error) {
    console.error("Error saving shipping info:", error);
  }
};

// Clear cart - FIXED VERSION
export const clearCart = () => async (dispatch, getState) => {
  try {
    const { user } = getState().user;

    dispatch({
      type: CLEAR_CART,
    });

    // Clear from localStorage - FIXED: accessing _id directly
    if (user) {
      saveCartToStorage(user._id, {
        cartItems: [],
        shippingInfo: {},
      });
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};