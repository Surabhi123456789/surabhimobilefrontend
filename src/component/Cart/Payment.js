import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import axios from "axios";
import "./payment.css";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({rzrApiKey}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCVC: false
  });

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardNumber.match(/^\d{16}$/)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.cardExpiry = "Please enter a valid expiry date (MM/YY)";
    }

    if (!cardCVC.match(/^\d{3}$/)) {
      newErrors.cardCVC = "Please enter a valid 3-digit CVC";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateCard();
  };

  const handleInputFocus = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value);
    if (touched.cardNumber) validateCard();
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardExpiry(value);
    if (touched.cardExpiry) validateCard();
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCVC(value);
    if (touched.cardCVC) validateCard();
  };

  const handleRazorpayPayment = async () => {
    try {

        if (!user || !user.email) {
        toast.error("Please login to continue with payment");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
          withCredentials: true,
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        { amount: Math.round(orderInfo.totalPrice * 100) },
        config
      );

      const options = {
        key: rzrApiKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "SURABHI MOBILE",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verifyData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: verifyResponse } = await axios.post(
              "/api/v1/razorpay/verify",
              verifyData,
              config
            );

            if (verifyResponse.success) {
              dispatch(createOrder({
                ...order,
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  status: "succeeded",
                }
              }));
              navigate("/success");
            }
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Payment failed");
      }
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (paymentMethod === "card") {
      if (!validateCard()) {
        return;
      }
    }
  
    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
    }
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
   
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Payment Method</Typography>
          
          <div className="paymentMethods">
            <div className="paymentMethodOption">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="card">Card Payment</label>
            </div>
            <div className="paymentMethodOption">
              <input
                type="radio"
                id="razorpay"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="razorpay">Razorpay</label>
            </div>
          </div>

          {paymentMethod === "card" && (
            <>
              <Typography>Card Info</Typography>
              <div className="inputContainer">
                <CreditCardIcon />
                <input 
                  type="text"
                  className={`paymentInput ${touched.cardNumber && errors.cardNumber ? 'error' : ''}`}
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onFocus={handleInputFocus}
                  onClick={handleInputFocus}
                  onBlur={() => handleBlur('cardNumber')}
                />
                {touched.cardNumber && errors.cardNumber && 
                  <p className="validationMessage">{errors.cardNumber}</p>
                }
              </div>
              <div className="inputContainer">
                <EventIcon />
                <input
                  type="text"
                  className={`paymentInput ${touched.cardExpiry && errors.cardExpiry ? 'error' : ''}`}
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  onFocus={handleInputFocus}
                  onClick={handleInputFocus}
                  onBlur={() => handleBlur('cardExpiry')}
                />
                {touched.cardExpiry && errors.cardExpiry && 
                  <p className="validationMessage">{errors.cardExpiry}</p>
                }
              </div>
              <div className="inputContainer">
                <VpnKeyIcon />
                <input
                  type="text"
                  className={`paymentInput ${touched.cardCVC && errors.cardCVC ? 'error' : ''}`}
                  placeholder="CVC"
                  value={cardCVC}
                  onChange={handleCVCChange}
                  onFocus={handleInputFocus}
                  onClick={handleInputFocus}
                  onBlur={() => handleBlur('cardCVC')}
                />
                {touched.cardCVC && errors.cardCVC && 
                  <p className="validationMessage">{errors.cardCVC}</p>
                }
              </div>
            </>
          )}

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;