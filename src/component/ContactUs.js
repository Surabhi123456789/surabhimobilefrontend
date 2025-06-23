import React from 'react';
import './ContactUs.css';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you! Connect with us using our contact information or chat with us directly about your device issues.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          
          <div className="info-item">
            <PhoneIcon className="icon" />
            <div>
              <h3>Phone</h3>
              <p>123456789</p>
            </div>
          </div>
          
          <div className="info-item">
            <EmailIcon className="icon" />
            <div>
              <h3>Email</h3>
              <p>2000surabhimobile@gmail.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <LocationOnIcon className="icon" />
            <div>
              <h3>Address</h3>
              <p>Prayagraj, Uttar Pradesh</p>
            </div>
          </div>
          
          <div className="business-hours">
            <div className="info-item">
              <AccessTimeIcon className="icon" />
              <div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="chat-section">
          <h2>Need Technical Support?</h2>
          <div className="chat-info">
            <p>If you're having issues with your device or need repairs, chat with our technicians directly.</p>
            <p>Share photos of your device problem and get immediate assistance from our experts.</p>
            <Link to="/chat" className="chat-button">
              <ChatIcon className="chat-icon" />
              Chat With Us
            </Link>
          </div>
          <div className="chat-benefits">
            <div className="benefit-item">
              <h4>Real-time Support</h4>
              <p>Connect with our technicians instantly</p>
            </div>
            <div className="benefit-item">
              <h4>Share Photos</h4>
              <p>Send images of your device problems</p>
            </div>
            <div className="benefit-item">
              <h4>Quick Diagnosis</h4>
              <p>Get expert assessment right away</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-container">
        <h2>Our Location</h2>
        <div className="map-embed">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.23982811604!2d81.72936555!3d25.4356242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acad8f36b221b%3A0x843eaaed01f03c39!2sPrayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713200456183!5m2!1sen!2sin" 
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Shop Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;