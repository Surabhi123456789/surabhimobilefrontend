import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
} from "../constants/orderConstants.js"

import axios from "axios";

// create order
export const createOrder = (order) => async(dispatch) => {
    try {
        console.log("DISPATCHING createOrder");
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Added authentication
        };

        const baseURL = process.env.REACT_APP_BACKEND_URL;

        // POST new order
        const { data } = await axios.post(
            `${baseURL}/api/v1/order/new`,
            order,
            config
        );

        console.log("Order created successfully:", data);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        console.error("Create order error:", error);
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response?.data?.message || "Failed to create order",
        });
    }
}

// my orders
export const myOrders = () => async(dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const baseURL = process.env.REACT_APP_BACKEND_URL;

        const { data } = await axios.get(`${baseURL}/api/v1/orders/me`, {
            withCredentials: true, // Added authentication
        });

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });

    } catch (error) {
        console.error("My orders error:", error);
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response?.data?.message || "Failed to fetch orders",
        });
    }
}

// order details
export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const baseURL = process.env.REACT_APP_BACKEND_URL;

        const { data } = await axios.get(`${baseURL}/api/v1/order/${id}`, {
            withCredentials: true, // Added authentication
        });

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

    } catch (error) {
        console.error("Order details error:", error);
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response?.data?.message || "Failed to fetch order details",
        });
    }
}

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const baseURL = process.env.REACT_APP_BACKEND_URL;

        const { data } = await axios.get(`${baseURL}/api/v1/admin/orders`, {
            withCredentials: true, // Added authentication
        });

        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        console.error("Get all orders error:", error);
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response?.data?.message || "Failed to fetch all orders",
        });
    }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Added authentication
        };

        const baseURL = process.env.REACT_APP_BACKEND_URL;

        const { data } = await axios.put(
            `${baseURL}/api/v1/admin/order/${id}`,
            order,
            config
        );

        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        console.error("Update order error:", error);
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response?.data?.message || "Failed to update order",
        });
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const baseURL = process.env.REACT_APP_BACKEND_URL;

        const { data } = await axios.delete(`${baseURL}/api/v1/admin/order/${id}`, {
            withCredentials: true, // Added authentication
        });

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        console.error("Delete order error:", error);
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response?.data?.message || "Failed to delete order",
        });
    }
};

// CLEARING ERROR
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};