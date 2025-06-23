import './App.css';
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState , useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp.js';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from "./component/Cart/Cart.js"
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder  from './component/Cart/ConfirmOrder.js'
import axios from "axios";
import Payment from "./component/Cart/Payment.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails  from "./component/Order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js"
import ProductList  from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct.js';
import UpdateProduct from './component/admin/UpdateProduct.js'
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder.js';
import UsersList from './component/admin/UsersList.js';
import UpdateUser from'./component/admin/UpdateUser.js'
import ProductReviews from './component/admin/ProductReviews.js';
import ContactUs from './component/ContactUs.js';
import AboutUs from './component/About.js';
function App() {

  const {isAuthenticated , user} = useSelector(state => state.user)


  const [rzrApiKey, setrzrApiKey] = useState("");

  async function getRzrApiKey() {
     const {data} = await axios.get("/api/v1/rzrApiKey");
     setrzrApiKey(data.rzrApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

      store.dispatch(loadUser());
      getRzrApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Header />

      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/account" element={<ProtectedRoute element={<Profile />} />}/>
        <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />}/>
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />}/>
        <Route path="/password/forgot"  element={<ForgotPassword />} />
        <Route path="/password/reset/:token"  element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp/>}/>
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />}/>
        <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />}/>
        <Route path="/process/payment" element={<ProtectedRoute element={<Payment  rzrApiKey={rzrApiKey} />} />}/>
        <Route path="/success" element={<ProtectedRoute element={<OrderSuccess />} />}/>
        <Route path="/orders" element={<ProtectedRoute element={<MyOrders />} />}/>
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/contact" element={<ContactUs/>}/> 
        <Route path="/about" element={<AboutUs/>}/> 
        <Route  isAdmin={true} path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} />}/>
        <Route  isAdmin={true} path="/admin/products" element={<ProtectedRoute element={<ProductList />} />}/> 
        <Route  isAdmin={true} path="/admin/product" element={<ProtectedRoute element={<NewProduct />} />}/> 
        <Route  isAdmin={true} path="/admin/product/:id" element={<ProtectedRoute element={<UpdateProduct />} />}/> 
        <Route  isAdmin={true} path="/admin/orders" element={<ProtectedRoute element={<OrderList />} />}/> 
        <Route  isAdmin={true} path="/admin/order/:id" element={<ProtectedRoute element={<ProcessOrder />} />}/> 
        <Route  isAdmin={true} path="/admin/users" element={<ProtectedRoute element={<UsersList />} />}/> 
        <Route  isAdmin={true} path="/admin/user/:id" element={<ProtectedRoute element={<UpdateUser />} />}/> 
        <Route  isAdmin={true} path="/admin/reviews" element={<ProtectedRoute element={<ProductReviews />} />}/> 
      


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;