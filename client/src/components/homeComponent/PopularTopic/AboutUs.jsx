import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import { useEffect } from 'react';

const AboutUs = () => {
  //  useEffect(() => {
  //     if (window.AOS) {
  //       window.AOS.init({ duration: 1000, once: true });
  //     }
  //   }, []);
  return (
    <section className="section_padding upskill">
      <div className="container">
        <div className="fabout_Us">
          <div className="fabout_picture" data-aos="zoom-in">
            <img
              src="imgs/our-achievements-bootstrap-html-admin-dashboard-template-adminuiux-com 1.png"
              alt="Person"
              className="img-fluid"
            />
          </div>
          <div className="fabout_text">
            <h2 className="text-primary">
              Welcome to our <span>Upskilling</span> Education Center
            </h2>
            <h4>
              <span>Choose from top industry instructors</span>
            </h4>
            <p className="mb-4">
              We empower learners with expert-designed courses, interactive tools, and personalized guidance to grow skills, build confidence, and achieve career success.
            </p>
            <div className="btn_group">
              <Link to="/about" className="btn-about">Read More</Link>
              <div className="pic">
                <img src="imgs/Frame (7).png" alt="Education Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
