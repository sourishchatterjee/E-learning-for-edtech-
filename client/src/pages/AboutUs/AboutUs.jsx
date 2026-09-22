




import React, { useEffect } from 'react';
import './AboutUs.css';
import Layout from '../../layout/Layout';

const AboutUs = () => {


  return (
    <Layout>
      {/* Banner Section */}
      <section className="banner_section" data-aos="fade-down">
        <div className="container">
          <div className="banner_text text-center">
            <h1 className="banner_heading">About Us</h1>
            <p className="banner_para">"Empowering minds, one lesson at a time"</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about_section section_padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6 col-md-6" data-aos="fade-right">
              <h2 className="about_heading pb-4">About Us</h2>
              <p className="about_text pb-4">The Largest E-Learning Website Across The Globe</p>
              <p className="about_content pb-4">
                Upskilling's mission is to permeate through every student/professional's outlook towards jobs and change their attitude and perspective from "How Can I Do It?" to "Of Course I Can Do It".
              </p>
              <span className="about_contenttwo">
                Upskilling is the result of a continual effort to exponentially increase the employability of every Indian.
              </span>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-left">
              <div className="d-flex align-items-center justify-content-center mt-5">
                <img src="/About/smiling-showing-thumbs-up-young-female-teacher-sitting-desk-with-school-tools-classroom 1.png" alt="Happy Student" />
                <div className="d-flex flex-column">
                  <div className="about_text_left text-white p-3 rounded text-center shadow-sm pb-3 ms-2 mb-3" data-aos="zoom-in">
                    <h3 className="fw-bold">10+ Years</h3>
                    <p className="mb-0">Experience</p>
                  </div>
                  <img src="/About/happy-young-indian-businessman-teacher-sitting-work-classroom-portrait_562687-3295 1.png" alt="Instructor" className="ms-2" data-aos="zoom-in" data-aos-delay="200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="company_section">
        <div className="container logo-container rounded shadow mt-5">
          <div className="row justify-content-center align-items-center g-3">
            {[5, 3, 7, 6, 1, 2].map((n, i) => (
              <div className="col-6 col-sm-4 col-md-2" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <img src={`/About/1630229421650-removebg-preview ${n}.png`} className="img-fluid logo-img" alt={`Company ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="our_mission section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6" data-aos="fade-right">
              <h2 className="our_mission_heading">Our Mission</h2>
              <h3>"Empowering minds, one lesson at a time."</h3>
              <span>
                Upskilling is the result of a continual effort to increase employability.
              </span>
              <div className="our-mission-left mb-5">
                <div className="left mb-4" data-aos="fade-up" data-aos-delay="100">
                  <h4 className="mb-4"><i className="fa-solid fa-circle-check pe-1"></i>24/7 Accessibility</h4>
                  <span>Access anytime, anywhere, on any device.</span>
                </div>
                <div className="right" data-aos="fade-up" data-aos-delay="200">
                  <h4 className="mb-4"><i className="fa-solid fa-circle-check pe-1"></i>Self-Paced Learning</h4>
                  <span>Learn at your own speed, start/pause/review lessons freely.</span>
                </div>
              </div>
              <div className="ongoing text-center me-5" data-aos="fade-up" data-aos-delay="300">
                <h4 className="mb-4"><i className="fa-solid fa-circle-check pe-1"></i>Ongoing Support</h4>
                <span>Live chat, forums, email, or automated support available anytime.</span>
              </div>
            </div>
            <div className="col-12 col-lg-6" data-aos="fade-left">
              <div className="d-flex align-items-center justify-content-center our-mission-right mt-5">
                <img src="/About/student-class-taking-notes 1 (1).png" alt="class notes" className="img-fluid me-3" style={{ width: '55%' }} />
                <div className="d-flex flex-column">
                  <div className="text-white p-3 rounded text-center shadow-sm" data-aos="zoom-in" data-aos-delay="200">
                    <img src="/About/virtual-classroom-study-space 1 (1).png" className="left-top img-fluid" alt="classroom study" />
                  </div>
                  <img src="/About/woman-attending-online-class 1 (1).png" className="left-bottom img-fluid" alt="woman online class" data-aos="zoom-in" data-aos-delay="400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities_section">
        <div className="container facilities">
          <div className="row justify-content-center align-items-center g-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div className="col-6 col-sm-4 col-md-2" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <img src={`/About/Group 100000237${i}.png`} className="img-fluid facilities-logo-img" alt={`Facility Logo ${i}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="our_service_section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <ServiceItem img="service-1 1.png" title="Affordable online courses" desc="Affordable online courses along with learning communities." delay={100} />
              <ServiceItem img="service-3 1.png" title="Experience Portal" desc="A revolutionary self-paced experience portal." delay={200} />
              <ServiceItem img="service-6 1.png" title="Innovation Lab for Tech products" desc="Product development at R&D lab for robotics, AI, drones, and more." delay={300} />
            </div>
            <div className="col-12 col-lg-6">
              <ServiceItem img="service-2 1.png" title="Best in Class/Industry Mentors" desc="Mentors include YouTubers, digital entrepreneurs, and creators." delay={100} />
              <ServiceItem img="service-5 1.png" title="On-Demand Courses" desc="Courses in data science, machine learning, AI, and more." delay={200} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ServiceItem = ({ img, title, desc, delay = 0 }) => (
  <div className="d-flex gap-2 mb-3" data-aos="fade-up" data-aos-delay={delay}>
    <img src={`/About/${img}`} alt={title} />
    <div className="affordable-text my-3">
      <h5>{title}</h5>
      <span>{desc}</span>
    </div>
  </div>
);

export default AboutUs;
