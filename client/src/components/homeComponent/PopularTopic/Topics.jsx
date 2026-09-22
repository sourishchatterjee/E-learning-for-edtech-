


import React from 'react';
import { Link } from 'react-router-dom';

const Topics = ({ categories, setSelectedCategory }) => {
  if (!Array.isArray(categories)) {
    return <p>Loading...</p>;
  }

  return (
    <section className="topics bg-body-tertiary py-5" data-aos="fade-up">
      <div className="container">
        <h3 className="text-center" data-aos="fade-down" data-aos-duration="800">
          Popular <span className="text-primary">Topics</span>
        </h3>
        <p className="text-center text-secondary" data-aos="fade-down" data-aos-duration="800" data-aos-delay="100">
          Explore a variety of topics and courses.
        </p>

        <div className="row gx-3 gy-4 my-4 justify-content-center">
          {categories.length > 0 ? (
            categories.map((category, idx) => (
              <div
                className="col-sm-12 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center"
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                data-aos-duration="800"
              >
                <Link
                  to={`/category/${category}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{ textDecoration: 'none' }}
                  className="w-100"
                >
                  <div
                    className="card1 p-3 text-center shadow-lg w-100"
                    style={{ cursor: 'pointer', borderRadius: '10px' }}
                  >
                    <strong>{category}</strong>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No topics available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topics;
