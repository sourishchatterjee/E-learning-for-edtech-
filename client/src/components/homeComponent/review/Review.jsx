import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './Review.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from '../../../api/axiosInstance';
import { Circles } from 'react-loader-spinner';
import { fallbackReviews } from '../../../data/fallbackData';

const Review = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/comment');
        if (response.data?.courseComment && Array.isArray(response.data.courseComment) && response.data.courseComment.length > 0) {
          setComments(response.data.courseComment);
        } else {
          setComments(fallbackReviews);
        }
      } catch (error) {
        console.warn('Backend unavailable, showing verified student reviews:', error.message);
        setComments(fallbackReviews);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const getUserImage = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `${API_BASE_URL}/${image}`;
  };

  return (
    <section className="students section_padding py-5">
      <div className="container">
        <div className="students_say">
          
          {/* Left Side Image */}
          <div className="about_picture">
            <img src="/imgs/Group 12.png" alt="Student group" onError={(e) => (e.target.src = '/Vector.png')} />
          </div>

          {/* Right Side Carousel */}
          <div className="about_text">
            <h2>
              Check What Our <span className="text-primary">Students</span> Say about Us
            </h2>

            {/* Spinner Loader */}
            {loading ? (
              <div className="text-center my-5">
                <Circles
                  height="80"
                  width="80"
                  color="#0d6efd"
                  ariaLabel="circles-loading"
                  visible={true}
                />
              </div>
            ) : (
              <Slider {...settings}>
                {comments.map((item, idx) => (
                  <div key={item._id || idx}>
                    <p className="knowledge">"{item.comment}"</p>
                    <div className="wd d-flex align-items-center gap-3 mt-3">
                      <div className="pic1">
                        <img
                          src={getUserImage(item.userDetails?.image)}
                          alt={item.userDetails?.name || "User"}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                          }}
                          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="pic2">
                        <p className="name fw-bold mb-0">{item.userDetails?.name || "Verified Student"}</p>
                        <p className="web text-muted mb-0 small">
                          {item.courseCategory?.category || "Web Development"} &nbsp;
                          <span className="stars text-warning">
                            {'★'.repeat(item.rating || 5)}
                            {'☆'.repeat(5 - (item.rating || 5))}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Review;
