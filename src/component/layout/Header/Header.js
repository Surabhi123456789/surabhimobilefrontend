
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
// import logo from "../../../images/logo1.png";
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Logo Section */}
<div className="navbar-logo">
  <Link to="/" className="logo-text">
    <span className="brand-name">Surabhi</span><span className="brand-subtitle">Mobile</span>
  </Link>
</div>



        {/* Center Navigation */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right Icons */}
        <div className="navbar-icons">
          <Link to="/search" className="icon-link">
            <SearchIcon />
          </Link>
          <Link to="/cart" className="icon-link">
            <ShoppingCartIcon />
          </Link>
          <Link to="/login" className="icon-link">
            <AccountCircleIcon />
          </Link>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
      </div>
    </nav>
  );
};

export default Header;