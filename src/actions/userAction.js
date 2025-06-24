// import { LOGIN_FAIL, 
//   LOGIN_REQUEST , 
//   LOGIN_SUCCESS, CLEAR_ERRORS,
//   REGISTER_USER_REQUEST, 
//   REGISTER_USER_SUCCESS,
//   REGISTER_USER_FAIL,
//   LOAD_USER_FAIL,
//   LOAD_USER_SUCCESS,
//   LOAD_USER_REQUEST ,
//   LOGOUT_FAIL,
//   LOGOUT_SUCCESS,
//   UPDATE_PROFILE_FAIL,
//   UPDATE_PROFILE_REQUEST,
//   // UPDATE_PROFILE_RESET,
//   UPDATE_PASSWORD_FAIL,
//   UPDATE_PASSWORD_REQUEST,
//   UPDATE_PASSWORD_SUCCESS,
//   UPDATE_PROFILE_SUCCESS,
//   FORGOT_PASSWORD_FAIL,
//   FORGOT_PASSWORD_REQUEST,
//   FORGOT_PASSWORD_SUCCESS,
//   RESET_PASSWORD_FAIL,
//   RESET_PASSWORD_REQUEST,
//   RESET_PASSWORD_SUCCESS,
//   ALL_USERS_FAIL,
//   ALL_USERS_REQUEST,
//   ALL_USERS_SUCCESS,
//    DELETE_USER_FAIL,
//    DELETE_USER_REQUEST,
//    DELETE_USER_SUCCESS,
//    USER_DETAILS_FAIL,
//    USER_DETAILS_REQUEST,
//    USER_DETAILS_SUCCESS,
//    UPDATE_USER_REQUEST,
//    UPDATE_USER_SUCCESS,
//    UPDATE_USER_FAIL,
//    } from "../constants/userConstants";
// import axios from "axios";

// import { loadCartFromStorageAction, clearCart } from "./cartAction";

// // login
// export const login = (email,password) => async (dispatch)=>{
//       try{

//           dispatch({type: LOGIN_REQUEST});

//           const config = {headers: {"Content-Type": "application/json"}};

//           const {data} = await axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/api/v1/login`,
//             {email,password},
//             config
//           );
//           dispatch({type:LOGIN_SUCCESS, payload: data.user});
//            // Load user's cart after successful login
//     if (data.user && data.user._id) {
//       dispatch(loadCartFromStorageAction(data.user._id));
//     }
//       }
//       catch(error)
//       {
//         dispatch({type: LOGIN_FAIL,payload: error.response.data.message});
//       }
// }

// // register
// export const register = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: REGISTER_USER_REQUEST });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/register`, userData, config);

//     dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
//   } catch (error) {
//     dispatch({
//       type: REGISTER_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // load user

// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOAD_USER_REQUEST });
   
//     const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me`, {
//       withCredentials: true,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    
//     if (data.user && data.user._id) {
//       dispatch(loadCartFromStorageAction(data.user._id));
//     }

//   } catch (error) {
//     const message = error.response?.data?.message || error.message || 'An error occurred';
//     dispatch({ type: LOAD_USER_FAIL, payload: message });
//   }
// };

// // Logout User
// export const logout = () => async (dispatch) => {
//   try {
//     await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`);

     
//     // Clear cart when user logs out
//     dispatch(clearCart());

//     dispatch({ type: LOGOUT_SUCCESS });
//   } catch (error) {
//     dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
//   }
// };


// // Update Profile
// export const updateProfile = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };

//     const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/me/update`, userData, config);

//     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Update Password
// export const updatePassword = (passwords) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/update`,
//       passwords,
//       config
//     );

//     dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// //Forgot Password
// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: FORGOT_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/password/forgot`, email, config);

//     dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: FORGOT_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Reset Password
// export const resetPassword = (token, passwords) => async (dispatch) => {
//   try {
//     dispatch({ type: RESET_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/reset/${token}`,
//       passwords,
//       config
//     );

//     dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: RESET_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// //get All Users
// export const getAllUsers = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_USERS_REQUEST });
//     const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`);

//     dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
//   } catch (error) {
//     dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
//   }
// };

// // get  User Details
// export const getUserDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_DETAILS_REQUEST });
//     const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`);

//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
//   } catch (error) {
//     dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
//   }
// };

// // // Update User
// export const updateUser = (id, userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_USER_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`,
//       userData,
//       config
//     );

//     dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// //Delete User
// export const deleteUser = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_USER_REQUEST });

//     const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`);

//     dispatch({ type: DELETE_USER_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: DELETE_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };


// // CLEARING ERROR
// export const clearErrors = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };
import { LOGIN_FAIL, 
  LOGIN_REQUEST , 
  LOGIN_SUCCESS, CLEAR_ERRORS,
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST ,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
   DELETE_USER_FAIL,
   DELETE_USER_REQUEST,
   DELETE_USER_SUCCESS,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   } from "../constants/userConstants";
import axios from "axios";
import API from '../utils/api'; // Use the API instance for axios

import { loadCartFromStorageAction, clearCart } from "./cartAction";

// login - FIXED VERSION
export const login = (email, password) => async (dispatch) => {
  try {
    console.log('🔑 Starting login process...');
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await API.post('/api/v1/login', { email, password });

    console.log('✅ Login successful:', data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    
    // Load user's cart after successful login
    if (data.user && data.user._id) {
      dispatch(loadCartFromStorageAction(data.user._id));
    }
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data);
    dispatch({ 
      type: LOGIN_FAIL, 
      payload: error.response?.data?.message || 'Login failed'
    });
  }
};

// register - ADD withCredentials
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/register`, 
      userData, 
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // Add this
      }
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// load user - Already has withCredentials ✅
export const loadUser = () => async (dispatch) => {
  try {
    console.log('👤 Loading user...');
    dispatch({ type: LOAD_USER_REQUEST });
   
    const { data } = await API.get('/api/v1/me');

    console.log('✅ User loaded:', data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    
    if (data.user && data.user._id) {
      dispatch(loadCartFromStorageAction(data.user._id));
    }

  } catch (error) {
    console.error('❌ Load user failed:', error.response?.data);
    const message = error.response?.data?.message || error.message || 'An error occurred';
    dispatch({ type: LOAD_USER_FAIL, payload: message });
  }
};

// Logout User - ADD withCredentials
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`, {
      withCredentials: true, // Add this
    });

    // Clear cart when user logs out
    dispatch(clearCart());

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile - ADD withCredentials
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/me/update`, 
      userData, 
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // Add this
      }
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password - ADD withCredentials
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/update`,
      passwords,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Add this
      }
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password - No credentials needed for this
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password - No credentials needed for this
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Users - ADD withCredentials (admin route)
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`, {
      withCredentials: true, // Add this
    });

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// Get User Details - ADD withCredentials (admin route)
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`, {
      withCredentials: true, // Add this
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User - ADD withCredentials (admin route)
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`,
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Add this
      }
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User - ADD withCredentials (admin route)
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`, {
      withCredentials: true, // Add this
    });

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CLEARING ERROR
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};