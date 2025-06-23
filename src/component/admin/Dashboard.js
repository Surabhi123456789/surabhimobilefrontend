
// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar.js";
// import "./dashboard.css";
// import { Typography } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
// import MetaData from "../layout/MetaData";

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state) => state.products);

//   const { orders } = useSelector((state) => state.allOrders);

//   const { users } = useSelector((state) => state.allUsers);

//   let outOfStock = 0;

//   products &&
//     products.forEach((item) => {
//       if (item.Stock === 0) {
//         outOfStock += 1;
//       }
//     });

//   useEffect(() => {
//    dispatch(getAdminProduct());
//    dispatch(getAllOrders());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   let totalAmount = 0;
//   orders &&
//     orders.forEach((item) => {
//       totalAmount += item.totalPrice;
//     });

//   const lineState = {
//     labels: ["Initial Amount", "Amount Earned"],
//     datasets: [
//       {
//         label: "TOTAL AMOUNT",
//         backgroundColor: ["tomato"],
//         hoverBackgroundColor: ["rgb(197, 72, 49)"],
//         data: [0, totalAmount],
//       },
//     ],
//   };

//   const doughnutState = {
//     labels: ["Out of Stock", "InStock"],
//     datasets: [
//       {
//         backgroundColor: ["#00A6B4", "#6800B4"],
//         hoverBackgroundColor: ["#4B5000", "#35014F"],
//         data: [outOfStock, products.length - outOfStock],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <MetaData title="Dashboard - Admin Panel" />
//       <Sidebar />

//       <div className="dashboardContainer">
//         <Typography component="h1">Dashboard</Typography>

//         <div className="dashboardSummary">
//           <div>
//             <p>
//               Total Amount <br /> ₹{totalAmount}
//             </p>
//           </div>
//           <div className="dashboardSummaryBox2">
//             <Link to="/admin/products">
//               <p>Product</p>
//               <p>{products && products.length}</p>
//             </Link>
//             <Link to="/admin/orders">
//               <p>Orders</p>
//               <p>{orders && orders.length}</p>
//             </Link>
//             <Link to="/admin/users">
//               <p>Users</p>
//               <p>{users && users.length}</p>
//             </Link>
//           </div>
//         </div>

//         <div className="lineChart">
//           <Line data={lineState} />
//         </div>

//         <div className="doughnutChart">
//           <Doughnut data={doughnutState} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#4f46e5"],
        borderColor: "#4f46e5",
        hoverBackgroundColor: ["#3730a3"],
        data: [0, totalAmount],
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#ef4444", "#10b981"],
        hoverBackgroundColor: ["#dc2626", "#059669"],
        data: [outOfStock, products.length - outOfStock],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <div className="dashboardHeader">
          <Typography component="h1" className="dashboardTitle">
            Admin Dashboard
          </Typography>
          <p className="dashboardSubtitle">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        <div className="dashboardSummary">
          <div className="totalAmountCard">
            <div className="cardIcon totalAmountIcon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V11H19V19H5V3H13V9H21Z"/>
              </svg>
            </div>
            <div className="cardContent">
              <h3>Total Revenue</h3>
              <p className="amount">₹{totalAmount.toLocaleString()}</p>
              <span className="growth">+12.5% from last month</span>
            </div>
          </div>
          
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products" className="statsCard productsCard">
              <div className="cardIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,7H16V6A4,4 0 0,0 12,2A4,4 0 0,0 8,6V7H5A1,1 0 0,0 4,8V19A3,3 0 0,0 7,22H17A3,3 0 0,0 20,19V8A1,1 0 0,0 19,7M10,6A2,2 0 0,1 12,4A2,2 0 0,1 14,6V7H10V6M18,19A1,1 0 0,1 17,20H7A1,1 0 0,1 6,19V9H8V10A1,1 0 0,0 9,11A1,1 0 0,0 10,10V9H14V10A1,1 0 0,0 15,11A1,1 0 0,0 16,10V9H18V19Z"/>
                </svg>
              </div>
              <div className="cardContent">
                <h3>Products</h3>
                <p className="number">{products && products.length}</p>
                <span className="subtitle">Total items</span>
              </div>
            </Link>
            
            <Link to="/admin/orders" className="statsCard ordersCard">
              <div className="cardIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,18C17.56,18 18,18.44 18,19A1,1 0 0,1 17,20H5A1,1 0 0,1 4,19C4,18.44 4.44,18 5,18H17M3,17A2,2 0 0,0 5,19H17A2,2 0 0,0 19,17V12H16.5L15.42,10.5C15.25,10.19 14.96,10 14.64,10H9.36C9.04,10 8.75,10.19 8.58,10.5L7.5,12H5A2,2 0 0,0 3,14V17M20.5,10V6A2,2 0 0,0 18.5,4H5.5A2,2 0 0,0 3.5,6V10H5A1,1 0 0,1 6,9H18A1,1 0 0,1 19,10H20.5Z"/>
                </svg>
              </div>
              <div className="cardContent">
                <h3>Orders</h3>
                <p className="number">{orders && orders.length}</p>
                <span className="subtitle">Total orders</span>
              </div>
            </Link>
            
            <Link to="/admin/users" className="statsCard usersCard">
              <div className="cardIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
              </div>
              <div className="cardContent">
                <h3>Users</h3>
                <p className="number">{users && users.length}</p>
                <span className="subtitle">Registered users</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="chartsContainer">
          <div className="chartCard lineChartCard">
            <div className="chartHeader">
              <h3>Revenue Trend</h3>
              <p>Track your earning progress</p>
            </div>
            <div className="lineChart">
              <Line data={lineState} options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#f1f5f9'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} />
            </div>
          </div>

          <div className="chartCard doughnutChartCard">
            <div className="chartHeader">
              <h3>Stock Status</h3>
              <p>Inventory overview</p>
            </div>
            <div className="doughnutChart">
              <Doughnut data={doughnutState} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20,
                      usePointStyle: true
                    }
                  }
                }
              }} />
            </div>
            <div className="stockStats">
              <div className="stockStat">
                <div className="stockIndicator outOfStock"></div>
                <span>Out of Stock: {outOfStock}</span>
              </div>
              <div className="stockStat">
                <div className="stockIndicator inStock"></div>
                <span>In Stock: {products ? products.length - outOfStock : 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;