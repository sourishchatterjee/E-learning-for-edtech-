

import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const logos = [
    'e7259775-13f6-4527-a7a0-cb72f47611b7 1.png',
    '7aa2407d-3a92-4ab6-8ef2-a94f666778e4 1.png',
    '72d3e449-6c4f-4cc1-b950-f40f4a37c190 1.png',
    '17e3a8ff-d25e-4845-a099-fd7189f99e32 1.png',
    '30bdc06d-ced0-4694-920e-c89f15a18fdd 1.png',
    '35cba985-a68b-4ae5-8236-e0902a69879b 1.png',
  ];

  return (
    <section className="topics bg-body-tertiary py-5">
      <div className="container">
        <h3 className="fs-3 text-center fw-semibold mb-4">
          Our <span className="text-primary">Achievers</span> Work With
        </h3>
        <div className="row justify-content-center align-items-center g-3">
          {logos.map((img, index) => (
            <div key={index} className="col-4 col-sm-3 col-md-2 d-flex justify-content-center align-items-center">
              <img src={`./imgs/${img}`} alt={`Company ${index + 1}`} className="partner-logo img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

