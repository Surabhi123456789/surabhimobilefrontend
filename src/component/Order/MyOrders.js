

import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

const MyOrders = () => {
    const dispatch = useDispatch();
  
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(myOrders());
    }, [dispatch, error]);

    const getStatusIcon = (status) => {
      switch (status.toLowerCase()) {
        case 'delivered':
          return (
            <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          );
        case 'processing':
          return (
            <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
          );
        case 'shipped':
          return (
            <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          );
        default:
          return (
            <svg className="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          );
      }
    };
  
    return (
      <Fragment>
        <MetaData title={`${user.name} - Orders`} />
  
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <div className="page-container">
              <div className="orders-header">
                <div className="header-content">
                  <h1 className="orders-title">My Orders</h1>
                  <p className="orders-subtitle">
                    Manage and track your order history
                  </p>
                </div>
                <div className="orders-stats">
                  <div className="stat-item">
                    <span className="stat-number">{orders && orders.length > 0 ? orders.length : 0}</span>
                    <span className="stat-label">Total Orders</span>
                  </div>
                  {orders && orders.length > 0 && (
                    <div className="stat-item">
                      <span className="stat-number">
                        ₹{orders.reduce((total, order) => total + order.totalPrice, 0).toLocaleString()}
                      </span>
                      <span className="stat-label">Total Spent</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="orders-content">
                {orders && orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order._id} className="order-card">
                        <div className="order-card-header">
                          <div className="order-info-primary">
                            <div className="order-id-section">
                              <span className="order-id-label">Order</span>
                              <span className="order-id-value">
                                #{order._id.slice(-8).toUpperCase()}
                              </span>
                            </div>
                            <div className="order-date">
                              <span className="date-label">Placed on</span>
                              <span className="date-value">
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          <div className={`order-status status-${order.orderStatus.toLowerCase()}`}>
                            {getStatusIcon(order.orderStatus)}
                            <span className="status-text">{order.orderStatus}</span>
                          </div>
                        </div>
                        
                        <div className="order-card-body">
                          <div className="order-summary">
                            <div className="summary-item">
                              <div className="summary-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                              </div>
                              <div className="summary-details">
                                <span className="summary-value">{order.orderItems.length}</span>
                                <span className="summary-label">Items</span>
                              </div>
                            </div>
                            
                            <div className="summary-item">
                              <div className="summary-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                  <line x1="12" y1="1" x2="12" y2="23"></line>
                                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                              </div>
                              <div className="summary-details">
                                <span className="summary-value amount">
                                  ₹{order.totalPrice.toLocaleString()}
                                </span>
                                <span className="summary-label">Total</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="order-items-section">
                            <h4 className="items-title">Order Items</h4>
                            <div className="items-preview">
                              {order.orderItems.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="item-chip">
                                  <span className="item-name">{item.name}</span>
                                  <span className="item-quantity">×{item.quantity}</span>
                                </div>
                              ))}
                              {order.orderItems.length > 3 && (
                                <div className="item-chip more-items">
                                  <span>+{order.orderItems.length - 3} more</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="order-card-footer">
                          <Link to={`/order/${order._id}`} className="view-details-btn">
                            <span>View Details</span>
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M9 18l6-6-6-6"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </div>
                    <div className="empty-state-content">
                      <h3 className="empty-title">No orders yet</h3>
                      <p className="empty-description">
                        When you place your first order, it will appear here
                      </p>
                      <Link to="/products" className="start-shopping-btn">
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
};
  
export default MyOrders;