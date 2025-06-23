import React from 'react';
import './About.css';
import PeopleIcon from '@material-ui/icons/People';
import BuildIcon from '@material-ui/icons/Build';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>We are dedicated to providing the best service for our customers. Learn more about who we are and what we stand for.</p>
      </div>

      <div className="about-content">
        <div className="about-info">
          <h2>Our Story</h2>
          <p>
            Founded in 2000, we started with a mission to provide top-notch technical support and device repairs. Over the years, our dedication to quality and customer satisfaction has helped us build a strong community of loyal customers.
          </p>
          <p>
            Our team consists of certified professionals with years of experience in diagnosing and repairing all kinds of mobiles. We stay updated with the latest technology to serve you better every day.
          </p>
        </div>

        <div className="about-highlights">
          <h2>Why Choose Us?</h2>
          <div className="highlights-grid">
            <div className="highlight-item">
              <PeopleIcon className="highlight-icon" />
              <h4>Expert Team</h4>
              <p>Our technicians are highly trained and experienced to handle all your needs.</p>
            </div>
            <div className="highlight-item">
              <BuildIcon className="highlight-icon" />
              <h4>Advanced Tools</h4>
              <p>We use the latest diagnostic and repair tools for accurate results.</p>
            </div>
            <div className="highlight-item">
              <StarIcon className="highlight-icon" />
              <h4>Quality Assurance</h4>
              <p>Every repair undergoes thorough testing to ensure complete satisfaction.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Want to Know More?</h2>
        <p>Contact us today to learn more about our services or get your device repaired.</p>
        <Link to="/contact" className="about-button">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
