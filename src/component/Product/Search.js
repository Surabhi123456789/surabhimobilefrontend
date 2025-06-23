

import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const handleHintClick = (hint) => {
    setKeyword(hint);
    navigate(`/products/${hint}`);
  };

  const searchHints = [
    "Charger", "Battery", "Display", "Camera", "Speaker", "Motherboard"
  ];

  return (
    <Fragment>
      <MetaData title="SEARCH A PRODUCT" />
      <div className="searchContainer">
        {/* Floating Background Elements */}
        <div className="floatingElement"></div>
        <div className="floatingElement"></div>
        <div className="floatingElement"></div>
        <div className="floatingElement"></div>
        
        {/* Search Icon */}
        <div className="searchIcon">
          <svg viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        <div className="searchContent">
          <h1 className="searchTitle">Find Your Product</h1>
          <p className="searchSubtitle">
            Search through thousands of mobile parts and accessories
          </p>
          
          <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search for chargers, batteries, displays..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>

          <div className="searchHints">
            {searchHints.map((hint, index) => (
              <span
                key={index}
                className="searchHint"
                onClick={() => handleHintClick(hint)}
              >
                {hint}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Search;