import React from 'react';
import './AdminFooter.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="admin-footer">
      <p>
        © {new Date().getFullYear()} E-Learning Admin Panel. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
