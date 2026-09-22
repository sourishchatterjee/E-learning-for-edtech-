import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useAuth } from '../../../context/AuthProvider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './PopularCouses.css';
import { toggleCourseInCart } from '../../../api/userApiFunctions/homeApi/homeApi';
import { Circles } from 'react-loader-spinner';
import { fallbackCourses } from '../../../data/fallbackData';

const PopularCourses = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const getCourseImage = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `${API_BASE_URL}/${image}`;
  };

  useEffect(() => {
    const fetchPopularCourses = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/popularCourse', {
          headers: {
            'x-access-token': auth?.token || '',
          },
        });
        if (res.data?.success && Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setPopularCourses(res.data.data);
          setIsFallbackMode(false);
        } else {
          // Fallback to sample courses
          const formatted = fallbackCourses.slice(0, 3).map((course, idx) => ({
            course,
            commentCount: 15 + idx * 8,
          }));
          setPopularCourses(formatted);
          setIsFallbackMode(true);
        }
      } catch (error) {
        console.warn('Backend unavailable, showing curated popular courses:', error.message);
        const formatted = fallbackCourses.slice(0, 3).map((course, idx) => ({
          course,
          commentCount: 15 + idx * 8,
        }));
        setPopularCourses(formatted);
        setIsFallbackMode(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCourses();
  }, [auth]);

  const handleEnrollClick = async (courseId) => {
    if (!auth.token) {
      toast.info('Please log in to enroll.');
      return navigate('/login');
    }

    if (isFallbackMode || courseId.startsWith('demo-')) {
      toast.success('Successfully enrolled in demo course!');
      setPopularCourses((prev) =>
        prev.map((item) =>
          item.course._id === courseId
            ? { ...item, course: { ...item.course, isEnrolled: true } }
            : item
        )
      );
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        '/user/enrolledCourse',
        { courseId },
        {
          headers: {
            'x-access-token': auth.token,
          },
        }
      );

      toast.success('Successfully enrolled!');
      setPopularCourses((prev) =>
        prev.map((item) =>
          item.course._id === courseId
            ? { ...item, course: { ...item.course, isEnrolled: true } }
            : item
        )
      );
    } catch (error) {
      console.error('Enrollment failed:', error);
      toast.error(error.response?.data?.message || 'Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoveClick = async (courseId) => {
    if (!auth?.token) {
      toast.info('Please log in to manage your cart.');
      setPopularCourses((prevCourses) =>
        prevCourses.map((item) =>
          item.course._id === courseId
            ? { ...item, course: { ...item.course, isInCart: !item.course.isInCart } }
            : item
        )
      );
      return;
    }

    if (isFallbackMode || courseId.startsWith('demo-')) {
      setPopularCourses((prevCourses) =>
        prevCourses.map((item) =>
          item.course._id === courseId
            ? { ...item, course: { ...item.course, isInCart: !item.course.isInCart } }
            : item
        )
      );
      toast.success('Wishlist updated!');
      return;
    }

    try {
      const response = await toggleCourseInCart(auth.token, courseId);

      if (response.status === 200) {
        toast.success(response.data.message || 'Course added to cart!');
        setPopularCourses((prevCourses) =>
          prevCourses.map((item) =>
            item.course._id === courseId
              ? {
                  ...item,
                  course: {
                    ...item.course,
                    isInCart: !item.course.isInCart,
                  },
                }
              : item
          )
        );
      } else {
        toast.error('Something went wrong while updating cart.');
      }
    } catch (error) {
      console.error('Toggle cart error:', error);
      toast.info('Wishlist saved locally.');
      setPopularCourses((prevCourses) =>
        prevCourses.map((item) =>
          item.course._id === courseId
            ? { ...item, course: { ...item.course, isInCart: !item.course.isInCart } }
            : item
        )
      );
    }
  };

  return (
    <div className="container popular-courses-container my-5">
      <h2
        className="popular-courses-title text-primary text-center mb-4"
        data-aos="fade-down"
      >
        Popular Courses
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <Circles height="80" width="80" color="#0d6efd" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : (
        <div className="row">
          {popularCourses.map(({ course, commentCount }, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
              key={course._id || index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="card course-card h-100 shadow-sm border-0 rounded-3">
                <div className="card-head position-relative">
                  <span
                    className="heart-button position-absolute top-0 end-0 m-2"
                    onClick={() => handleLoveClick(course._id)}
                    style={{
                      color: course.isInCart ? 'red' : 'white',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }}
                    title={course.isInCart ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </span>
                  <img
                    src={getCourseImage(course.image)}
                    className="card-img-top course-img"
                    alt={course.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <div className="card-body p-3">
                  <h5 className="card-title fw-bold">{course.title}</h5>
                  <p className="card-text text-secondary small">
                    {course.description && course.description.length > 60
                      ? `${course.description.slice(0, 60)}...`
                      : course.description}
                  </p>
                  <p className="text-muted fw-bold mb-1" style={{ fontSize: '13px' }}>
                    Category: <span className="badge bg-primary-subtle text-primary">{course.category}</span>
                  </p>
                  <p className="fw-bold text-success mb-1">
                    Price: ₹{course.price}
                  </p>
                  <p className="text-muted" style={{ fontSize: '13px' }}>
                    Comments: {commentCount}
                  </p>
                  <div className="rating mb-2">
                    {Array.from({ length: 5 }, (_, starIdx) => {
                      const ratingValue = course.rating || 5;
                      return (
                        <span key={starIdx}>
                          <i
                            className="fas fa-star"
                            style={{
                              color: starIdx < ratingValue ? '#ffc107' : '#ddd',
                            }}
                          ></i>
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 d-flex justify-content-between p-3 pt-0">
                  {!auth.token ? (
                    <>
                      <button
                        className="btn btn-primary w-50 me-2"
                        onClick={() => handleEnrollClick(course._id)}
                      >
                        Enroll
                      </button>
                      <button
                        className="btn btn-outline-secondary w-50"
                        onClick={() => navigate(`/course-details/${course._id}`)}
                      >
                        Explore
                      </button>
                    </>
                  ) : course.isEnrolled ? (
                    <>
                      <button
                        className="btn btn-success w-50 me-2"
                        onClick={() => navigate(`/course-lectures/${course._id}`)}
                      >
                        Start
                      </button>
                      <button
                        className="btn btn-outline-secondary w-50"
                        onClick={() => navigate(`/course-details/${course._id}`)}
                      >
                        Explore
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary w-50 me-2"
                        onClick={() => handleEnrollClick(course._id)}
                      >
                        Enroll
                      </button>
                      <button
                        className="btn btn-outline-secondary w-50"
                        onClick={() => navigate(`/course-details/${course._id}`)}
                      >
                        Explore
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularCourses;













