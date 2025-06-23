
import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              
              {/* Header Section */}
              <div className="order-header-section">
                <div className="order-header-content">
                  <h1>Order #{order && order._id && order._id.slice(-8).toUpperCase()}</h1>
                  <div className={`order-status-badge ${order && order.orderStatus && order.orderStatus.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {order && order.orderStatus}
                  </div>
                </div>
                
                <div className="order-meta">
                  <div className="meta-item">
                    <span className="meta-label">Order Date</span>
                    <span className="meta-value">
                      {order && order.createdAt && new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Total Items</span>
                    <span className="meta-value">
                      {order && order.orderItems && order.orderItems.length} items
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Total Amount</span>
                    <span className="meta-value amount">₹{order && order.totalPrice && order.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="order-details-content">
                <div className="details-grid">
                  
                  {/* Shipping Information */}
                  <div className="detail-section">
                    <h3 className="section-title">
                      <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <circle cx="12" cy="8" r="3" />
                      </svg>
                      Shipping Information
                    </h3>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="detail-section">
                    <h3 className="section-title">
                      <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      Payment Information
                    </h3>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Status:</p>
                        <span
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </span>
                      </div>
                      <div>
                        <p>Amount:</p>
                        <span>₹{order.totalPrice && order.totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <p>Payment ID:</p>
                        <span>{order.paymentInfo && order.paymentInfo.id ? order.paymentInfo.id.slice(-10) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="orderDetailsCartItems">
                <p>
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Order Items
                </p>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} × ₹{item.price.toLocaleString('en-IN')} ={" "}
                          <b>₹{(item.price * item.quantity).toLocaleString('en-IN')}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-label">Payment Status</div>
                    <div className="summary-value">
                      {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Pending"}
                    </div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Order Status</div>
                    <div className="summary-value">{order.orderStatus}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Total Amount</div>
                    <div className="summary-value">₹{order.totalPrice && order.totalPrice.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;