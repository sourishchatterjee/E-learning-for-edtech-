


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (window.AOS) {
  //     window.AOS.init({ duration: 1000, once: true });
  //   }
  // }, []);

  const handleExploreClick = () => {
    navigate("/courses");
  };

  return (
    <section className="banner">
      <div className="container py-5">
        <div className="row align-items-center justify-content-between">
          {/* Right Side Image */}
          <div
            className="col-lg-6 order-1 order-lg-2 d-flex justify-content-center mb-4 mb-lg-0"
            data-aos="fade-down"
          >
            <img
              src="/imgs/Group 9.png"
              alt="Banner"
              className="banner-img img-fluid"
            />
          </div>

          {/* Left Side Content */}
          <div
            className="col-lg-6 order-2 order-lg-1 text-lg-start text-center"
            data-aos="fade-up"
          >
            <h1 className="banner-heading fw-bold mt-3 mt-lg-0">
              Start Upskilling With Our{" "}
              <span className="text-primary nowrap-span">
                <i className="fa-solid fa-less-than"></i> FOCUSED{" "}
                <i className="fa-solid fa-greater-than"></i>
              </span>{" "}
              Courses
            </h1>
            <p className="banner-subtext mt-3">
              Upgrade your skills with expert-led online courses. Learn at your own pace, anytime and anywhere. Start your journey of success today.
            </p>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 mt-3 w-auto"
              onClick={handleExploreClick}
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
