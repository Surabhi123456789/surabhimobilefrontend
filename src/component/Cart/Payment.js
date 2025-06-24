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

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState("");
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

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

  // Fetch Razorpay API key when component mounts
  useEffect(() => {
    const getRazorpayKey = async () => {
      try {
        console.log('🔑 Fetching Razorpay API key...');
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const { data } = await axios.get(
          `${API_BASE_URL}/api/v1/razorpayapikey`,
          config
        );

        if (data.success && data.rzrApiKey) {
          setRazorpayKey(data.rzrApiKey);
          console.log('✅ Razorpay key fetched successfully:', data.rzrApiKey.substring(0, 10) + '...');
        } else {
          throw new Error('API key not found in response');
        }
      } catch (error) {
        console.error('❌ Error fetching Razorpay key:', error);
        toast.error('Failed to initialize payment service');
      }
    };

    if (user) {
      getRazorpayKey();
    }
  }, [user, API_BASE_URL]);

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
      setIsProcessing(true);

      if (!user || !user.email) {
        toast.error("Please login to continue with payment");
        navigate("/login");
        return;
      }

      // Check if Razorpay key is available
      if (!razorpayKey) {
        toast.error("Payment service not initialized. Please refresh the page.");
        setIsProcessing(false);
        return;
      }

      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        toast.error("Payment service not loaded. Please refresh the page.");
        setIsProcessing(false);
        return;
      }

      console.log('🚀 Starting Razorpay payment process...');
      console.log('💰 Amount:', orderInfo.totalPrice);
      console.log('🔑 Using Razorpay key:', razorpayKey.substring(0, 10) + '...');

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/payment/process`,
        { amount: Math.round(orderInfo.totalPrice * 100) },
        config
      );

      console.log('✅ Payment order created:', data);

      if (!data.success || !data.order) {
        throw new Error(data.message || 'Failed to create payment order');
      }

      const options = {
        key: razorpayKey, // Use the fetched key
        amount: data.order.amount,
        currency: data.order.currency,
        name: "SURABHI MOBILE",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            console.log('💳 Payment successful, verifying...', response);
            
            const verifyData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: verifyResponse } = await axios.post(
              `${API_BASE_URL}/api/v1/razorpay/verify`,
              verifyData,
              config
            );

            console.log('✅ Payment verified:', verifyResponse);

            if (verifyResponse.success) {
              const orderData = {
                ...order,
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  status: "succeeded",
                }
              };

              dispatch(createOrder(orderData));
              sessionStorage.removeItem("orderInfo");
              
              toast.success("Payment successful!");
              navigate("/success");
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error('❌ Payment verification error:', error);
            toast.error(error.response?.data?.message || "Payment verification failed");
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            console.log('🚫 Payment modal dismissed');
            setIsProcessing(false);
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

      console.log('🎯 Creating Razorpay instance with options:', {
        key: razorpayKey.substring(0, 10) + '...',
        amount: options.amount,
        currency: options.currency,
        order_id: options.order_id
      });

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on('payment.failed', function (response) {
        console.error('❌ Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      razorpayInstance.open();
      
    } catch (error) {
      console.error("💥 Payment error:", error);
      setIsProcessing(false);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else if (error.response?.status === 404) {
        toast.error("Payment service not available. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "Payment failed. Please try again.");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) {
      return;
    }
    
    if (paymentMethod === "card") {
      if (!validateCard()) {
        return;
      }
      toast.info("Card payment integration coming soon!");
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
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (!user) {
      toast.error("Please login to access payment page");
      navigate("/login");
    }
  }, [user, navigate]);

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
                disabled={isProcessing}
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
                disabled={isProcessing || !razorpayKey}
              />
              <label htmlFor="razorpay">
                Razorpay {!razorpayKey && "(Loading...)"}
              </label>
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
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
                  disabled={isProcessing}
                />
                {touched.cardCVC && errors.cardCVC && 
                  <p className="validationMessage">{errors.cardCVC}</p>
                }
              </div>
            </>
          )}

          <input
            type="submit"
            value={
              isProcessing 
                ? "Processing..." 
                : !razorpayKey && paymentMethod === "razorpay"
                ? "Loading payment service..."
                : `Pay - ₹${orderInfo && orderInfo.totalPrice}`
            }
            ref={payBtn}
            className="paymentFormBtn"
            disabled={isProcessing || (!razorpayKey && paymentMethod === "razorpay")}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;