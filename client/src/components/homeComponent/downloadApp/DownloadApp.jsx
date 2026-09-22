import React from 'react';
import './DownloadApp.css';

const DownloadApp = () => {
  return (
    <section className="download-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left: Mobile Image */}
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <img
              src="./imgs/Group 1000002344.png"
              alt="Mobile App"
              className="img-fluid mobile-image"
            />
          </div>

          {/* Right: Text & QR & Buttons */}
          <div className="col-lg-6">
            <h5 className="mb-2">Download the app today</h5>
            <h3 className="mb-3 fw-bold">Start Your Journey</h3>
            <p className="mb-4">
              Download our app today and unlock unlimited learning anytime, anywhere. Start your journey toward new skills and exciting career opportunities with easy access to courses, expert instructors, and interactive content.
            </p>

            <div className="d-flex align-items-center mb-4">
              {/* QR Code */}
              <img
                src="./imgs/Group (4).png"
                alt="QR Code"
                className="img-fluid qr-code"
              />
            </div>

            {/* Store Buttons */}
            <div className="d-flex gap-3 flex-wrap">
              <img
                src="./imgs/Frame 3.png"
                alt="Play Store"
                className="img-fluid store-btn"
              />
              <img
                src="./imgs/Frame 3 (1).png"
                alt="App Store"
                className="img-fluid store-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
