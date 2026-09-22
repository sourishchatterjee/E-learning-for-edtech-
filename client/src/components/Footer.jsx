








import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-lg-2 col-md-6 footer-col">
            <img
              src="/imgs/WhatsApp_Image_2025-04-19_at_15.47.51_35d568a4-removebg-preview.png"
              alt="Logo"
              className="footer-logo"
            />
          </div>

          <div className="col-lg-3 col-md-6 footer-col">
            <img src="/imgs/Frame 1.png" alt="Frame" className="mb-2" />
            <a href="mailto:support@pwskills.com">
              <i className="fa-solid fa-envelope"></i> support@pwskills.com
            </a>
            <a href="tel:+7349578953">
              <i className="fa-solid fa-phone-volume"></i> +7349578953
            </a>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </div>

          </div>

          <div className="col-lg-2 col-md-6 footer-col">
            <h5>Quick Links</h5>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="#">Pricing</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="col-lg-2 col-md-6 footer-col">
            <h5>Featured</h5>
            <a href="#">Data Records</a>
            <a href="#">Ethical Hacking</a>
            <a href="#">Marketing</a>
            <a href="#">Application</a>
          </div>

          <div className="col-lg-2 col-md-6 footer-col">
            <h5>Training</h5>
            <a href="#">Become An Instructor</a>
            <a href="#">Become A Student</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;





