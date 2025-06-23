// import React, { Fragment,useEffect } from 'react';
// import { CgMouse } from "react-icons/cg";
// import "./Home.css"
// import ProductCard from './ProductCard.js';
// import MetaData from '../layout/MetaData.js';
// import {getProduct} from "../../actions/productAction.js"
// // to import getproduct function we use react redux
// import {useSelector, useDispatch} from "react-redux"
// import Loader from '../layout/Loader/Loader.js';
// import { toast } from 'react-toastify';
// import { clearErrors } from '../../actions/productAction.js';

// const Home = () => {
   
//   const dispatch = useDispatch();
//   const {loading,error,products} = useSelector((state)=>state.products)
  

//   useEffect(()=>{
//        if(error){
//              toast.error(error);
//              dispatch(clearErrors);
//       }

//      dispatch(getProduct());
//   },[dispatch,error])

//   return (
//    <Fragment>
//      {loading ? (<Loader/>) : ( <Fragment>

// <MetaData title="SURABHI MOBILE"/>

// <div className='banner'>
// <p>Welcome to Surabhi Mobile</p>
// <h1>FIND AMAZING PRODUCTS BELOW</h1>

// <a href="#container">
//  <button>
//    Scroll <CgMouse />
//  </button>
// </a>
// </div>

// <h2 className='homeHeading'>Featured Product</h2>

// <div className='container' id='container'>
// {products && products.map((product)=>
//  <ProductCard  key={product._id} product={product}/>
// )} 


// </div>

// </Fragment>)
// }
//    </Fragment>
//   );
// }

// export default Home;

import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import ProductCard from './ProductCard.js';
import MetaData from '../layout/MetaData.js';
import { getProduct } from "../../actions/productAction.js"
import { useSelector, useDispatch } from "react-redux"
import Loader from '../layout/Loader/Loader.js';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/productAction.js';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }

    dispatch(getProduct());
  }, [dispatch, error])

  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>
          <MetaData title="SURABHI MOBILE" />

          <div className='banner'>
            <p>Welcome to <strong>Surabhi Mobile</strong></p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className='homeHeading'>Featured Products</h2>

          <div className='container' id='container'>
            {products && products.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              />
            ))}
          </div>

        </Fragment>)
      }
    </Fragment>
  );
}

export default Home;