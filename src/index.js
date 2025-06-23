
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
    />
    <App />
  </Provider>,
  document.getElementById('root')
);