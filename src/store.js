import {createStore, combineReducers,applyMiddleware} from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk'; 
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, OrderDetailsReducer, orderReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails : OrderDetailsReducer,
    newReview : newReviewReducer,
    newProduct: newProductReducer,
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    product:productReducer,
    order: orderReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,


});

const loadCartFromStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user && user.user._id) {
      const carts = JSON.parse(localStorage.getItem("userCarts") || "{}");
      return carts[user.user._id] || { cartItems: [], shippingInfo: {} };
    }
    return { cartItems: [], shippingInfo: {} };
  } catch (error) {
    return { cartItems: [], shippingInfo: {} };
  }
};

const initialState = {
  cart: loadCartFromStorage(), // Load cart from localStorage on app start
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default  store;