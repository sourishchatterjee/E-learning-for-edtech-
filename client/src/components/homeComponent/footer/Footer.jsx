// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css'; // Make sure you have Footer.css

// const Footer = () => {
//   return (
//     <footer className="footer section_padding">
//       <div className="container">
//         <div className="row">

//           {/* Logo */}
//           <div className="col-lg-2 col-md-6 mb-4">
//             <img
//               src="/imgs/WhatsApp_Image_2025-04-19_at_15.47.51_35d568a4-removebg-preview.png"
//               alt="Logo"
//             />
//           </div>

//           {/* Contact Info */}
//           <div className="col-lg-3 col-md-6 mb-4">
//             <img src="/imgs/Frame 1.png" alt="Frame" />
//             <div className="left mt-1">
//               <a href="mailto:support@pwskills.com">
//                 <i className="fa-solid fa-envelope"></i> support@pwskills.com
//               </a>
//               <a href="tel:+7349578953">
//                 <i className="fa-solid fa-phone-volume"></i> +7349578953
//               </a>
//             </div>
//             <div className="social-icons mt-3">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                 <i className="fa-brands fa-facebook"></i>
//               </a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                 <i className="fa-brands fa-instagram"></i>
//               </a>
//               <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
//                 <i className="fa-brands fa-google-plus-g"></i>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="col-lg-2 col-md-6 mb-4">
//             <h5>Quick Links</h5>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/courses">Courses</Link>
//               </li>
//               <li>
//                 <Link to="#">Pricing</Link>
//               </li>
//               <li>
//                 <Link to="/about">About Us</Link>
//               </li>
//               <li>
//                 <Link to="/contact">Contact Us</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Featured Courses */}
//           <div className="col-lg-2 col-md-6 mb-4">
//             <h5>Featured Courses</h5>
//             <ul>
//               <li>
//                 <Link to="#data-records">Data Records</Link>
//               </li>
//               <li>
//                 <Link to="#ethical-hacking">Ethical Hacking</Link>
//               </li>
//               <li>
//                 <Link to="#marketing">Marketing</Link>
//               </li>
//               <li>
//                 <Link to="#application">Application</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Training Session */}
//           <div className="col-lg-2 col-md-6 mb-4">
//             <h5>Training</h5>
//             <ul>
//               <li>
//                 <Link to="#instructor">Become An Instructor</Link>
//               </li>
//               <li>
//                 <Link to="#student">Become A Student</Link>
//               </li>
//             </ul>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;












import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

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
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://support.google.com/answer/2451065?hl=en" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 footer-col">
            <h5>Quick Links</h5>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="col-lg-2 col-md-6 footer-col">
            <h5>Featured</h5>
            <Link to="/courses/data-records">Data Records</Link>
            <Link to="/courses/ethical-hacking">Ethical Hacking</Link>
            <Link to="/courses/marketing">Marketing</Link>
            <Link to="/courses/application">Application</Link>
          </div>

          <div className="col-lg-2 col-md-6 footer-col">
            <h5>Training</h5>
            <Link to="/instructor">Become An Instructor</Link>
            <Link to="/student">Become A Student</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;









