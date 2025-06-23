
import React, { Fragment } from 'react'
import "./Products.css"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../component/layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
import {getProduct } from '../../actions/productAction';
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider";
import { clearErrors } from '../../actions/productAction';
import MetaData from '../layout/MetaData';

const categories = [
  "Chargers",
  "Batteries", 
  "Charging IC",
  "Display",
  "Cameras",
  "Buttons",
  "Speakers",
  "Motherboards",
  "Sensors",
  "Antennas",
  "SIM Trays"
];


const Products = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const { keyword } = useParams();

  const [price , setPrice]= useState([0,25000])

  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

  const[ratings, setRatings] = useState(0);

  console.log(products,resultPerPage,filteredProductsCount);
  
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const categoryHandler = (category) => {
       console.log("Category clicked:", category);
    
    // If clicking the same category, clear it (toggle behavior)
    if (selectedCategory === category) {
      setSelectedCategory("");
      console.log("Clearing category filter");
    } else {
      setSelectedCategory(category);
      console.log("Setting category to:", category);
    }
    
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const priceHandler = (event , newPrice)=>{
    setPrice(newPrice);
  }

  useEffect(() => {

    console.log("useEffect triggered with:", {
      keyword,
      currentPage,
      price,
      selectedCategory,
      ratings
    });

    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }

    // Add a small delay to ensure state has been updated properly
    const timer = setTimeout(() => {
      dispatch(getProduct(keyword, currentPage, price, selectedCategory, ratings));
    }, 100);

    return () => clearTimeout(timer);


  }, [dispatch, keyword, currentPage, error,price, selectedCategory,ratings])

  let count = filteredProductsCount;

  return (
    <Fragment>
      <MetaData title ="PRODUCTS -----SURABHI MOBILE"/>
      
      {loading ? (
        <div className="loadingContainer">
          <Loader />
        </div>
      ) : (
        <div className="productsContainer">
          <h2 className='productsHeading'>Our Products</h2>
          
          <div className="productsMainContent">
            {/* Filter Section */}
            <div className='filterSection'>
              <div className="filterTitle">
                Filters
              </div>
              
              {/* Price Filter */}
              <div className="filterGroup priceFilter">
                <Typography component="h3">Price Range</Typography>
                <div className="priceSlider">
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                    min={0}
                    max={25000}
                    valueLabelFormat={(value) => `₹${value.toLocaleString('en-IN')}`}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.8rem', 
                    color: '#718096',
                    marginTop: '0.5rem'
                  }}>
                    <span>₹0</span>
                    <span>₹25,000</span>
                  </div>
                </div>
              </div>

              {/* Categories Filter */}
              <div className="filterGroup categoryFilter">
                <Typography component="h3">Categories</Typography>
                <ul className='categoryBox'>
                  {categories.map((category) => (
                    <li 
                      className={`category-link ${selectedCategory === category ? "active" : ""}`}
                      key={category}
                      onClick={() => categoryHandler(category)} 
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Ratings Filter */}
              <div className="filterGroup ratingFilter">
                <Typography component="h3">Ratings Above</Typography>
                <div className="ratingSlider">
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby='ratings-slider'
                    min={0}
                    max={5}
                    step={0.5}
                    valueLabelDisplay='auto'
                    valueLabelFormat={(value) => `${value}★`}
                  />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '0.8rem', 
                    color: '#718096',
                    marginTop: '0.5rem'
                  }}>
                    <span>0★</span>
                    <span>5★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="productsGrid">
              <div className='products'>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="noProducts">
                    No products found matching your criteria
                  </div>
                )}
              </div>

              {/* Pagination */}
              {count > resultPerPage && (
                <div className='paginationBox'>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Products