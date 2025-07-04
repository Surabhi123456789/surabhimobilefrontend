import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Get All Products


export const getProduct =
 (keyword="", currentPage = 1, price=[0,25000], category, ratings=0) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      
    const baseURL = process.env.REACT_APP_BACKEND_URL;

let link = `${baseURL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;


      // Only add category to URL if it exists and is not empty
      if (category && category.trim() !== "") {
        // Don't encode the category - let the backend handle it as-is
        link += `&category=${category}`;
      }

      console.log("API Call to:", link);
      console.log("Category being sent:", category);

      const { data } = await axios.get(link, { withCredentials: true });

      
      console.log("API Response:", data);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("API Error:", error);
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response?.data?.message || "Error fetching products",
      });
    }
  };
// Get Products Details

export const getProductDetails = (id) => async (dispatch) => {
  try {

    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    

  const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.get(`${baseURL}/api/v1/product/${id}`, {
  withCredentials: true,
});


   console.log('API response:', data);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message || "Error fetching products",
    });
  }
};


//Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.get(`${baseURL}/api/v1/admin/products`,{
      withCredentials: true, // Add this line
    });


    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.post(
  `${baseURL}/api/v1/admin/product/new`,{
      withCredentials: true, // Add this line
    },
  productData,
  config
);


    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.put(
  `${baseURL}/api/v1/admin/product/${id}`,{
      withCredentials: true, // Add this line
    },
  productData,
  config
);


    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id, public_id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

   const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.delete(
  `${baseURL}/api/v1/admin/product/${id}`,
  {
    data: { public_id }, // send public_id in request body
    ...config,
  },{
      withCredentials: true, // Add this line
    }
);


    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};




// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

   const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.put(
  `${baseURL}/api/v1/review`,
  reviewData,
  config
);


    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

   const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.get(`${baseURL}/api/v1/reviews?id=${id}`);


    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

   const baseURL = process.env.REACT_APP_BACKEND_URL;

const { data } = await axios.delete(
  `${baseURL}/api/v1/reviews?id=${reviewId}&productId=${productId}`
);


    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};