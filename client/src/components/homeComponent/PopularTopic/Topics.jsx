import React from 'react';
import { Link } from 'react-router-dom';
import './Topics.css';

const Topics = ({ categories, setSelectedCategory }) => {
  if (!Array.isArray(categories)) {
    return <p>Loading...</p>;
  }

  return (
    <section className="topics py-5" data-aos="fade-up">
      <div className="container">
        <h3 className="text-center fw-bold" data-aos="fade-down" data-aos-duration="800">
          Popular <span className="text-primary">Topics</span>
        </h3>
        <p className="text-center text-secondary mb-4" data-aos="fade-down" data-aos-duration="800" data-aos-delay="100">
          Explore a variety of topics and courses.
        </p>

        <div className="topics-grid my-4">
          {categories.length > 0 ? (
            categories.map((category, idx) => (
              <Link
                key={idx}
                to={`/category/${encodeURIComponent(category)}`}
                onClick={() => setSelectedCategory && setSelectedCategory(category)}
                style={{ textDecoration: 'none' }}
                className="w-100"
              >
                <div className="card1 w-100">
                  <strong>{category}</strong>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted col-12">No topics available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Topics;
