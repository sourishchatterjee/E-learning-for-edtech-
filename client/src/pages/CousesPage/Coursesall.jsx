import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { getPaginatedCourses, searchCourses, toggleCourseInCart } from '../../api/userApiFunctions/homeApi/homeApi';
import './Coursesall.css';
import Search from './Search/Search';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';
import axiosInstance from '../../api/axiosInstance';
import { fallbackCourses } from '../../data/fallbackData';

const Coursesall = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  const [auth] = useAuth();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 6;

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await getPaginatedCourses(page, limit, auth?.token);

      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        const filteredCourses = res.data.filter((course) => !course.isDeleted);
        if (filteredCourses.length > 0) {
          setCourses(filteredCourses);
          setTotalPages(res.pagination?.totalPages || 1);
          setIsFallbackMode(false);
          return;
        }
      }
      // Fallback if empty
      setCourses(fallbackCourses);
      setTotalPages(1);
      setIsFallbackMode(true);
    } catch (err) {
      console.warn('Backend unavailable or error loading courses, showing fallback preview:', err.message);
      setCourses(fallbackCourses);
      setTotalPages(1);
      setIsFallbackMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      fetchCourses();
    }
  }, [page, query]);

  useEffect(() => {
    if (auth?.token && !query) {
      fetchCourses();
    }
  }, [auth?.token, page, query]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        if (isFallbackMode) {
          const filtered = fallbackCourses.filter(
            (c) =>
              c.title.toLowerCase().includes(query.toLowerCase()) ||
              c.category.toLowerCase().includes(query.toLowerCase()) ||
              c.description.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filtered);
        } else {
          searchCourses(query, auth.token)
            .then((res) => {
              if (Array.isArray(res) && res.length > 0) {
                setSearchResults(res);
              } else {
                const filtered = fallbackCourses.filter((c) =>
                  c.title.toLowerCase().includes(query.toLowerCase())
                );
                setSearchResults(filtered);
              }
            })
            .catch((err) => {
              console.warn('Search API error, searching fallback courses:', err);
              const filtered = fallbackCourses.filter((c) =>
                c.title.toLowerCase().includes(query.toLowerCase())
              );
              setSearchResults(filtered);
            });
        }
      } else {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query, isFallbackMode, auth?.token]);

  const displayedCourses = query ? searchResults : courses;

  // Helper function to update course enrollment in both courses and searchResults
  const updateCourseEnrollment = (courseId) => {
    const update = (list) =>
      list.map((c) => (c._id === courseId ? { ...c, isEnrolled: true } : c));
    setCourses(update);
    setSearchResults(update);
  };

  // Helper function to toggle course in cart in both courses and searchResults
  const updateCourseCartToggle = (courseId) => {
    const update = (list) =>
      list.map((c) =>
        c._id === courseId ? { ...c, isInCart: !c.isInCart } : c
      );
    setCourses(update);
    setSearchResults(update);
  };

  const handleEnrollClick = async (courseId) => {
    if (!auth?.token) {
      toast.error('You must be logged in to enroll.');
      return navigate('/login');
    }

    if (isFallbackMode || courseId.startsWith('demo-')) {
      toast.success('Successfully enrolled in demo course!');
      updateCourseEnrollment(courseId);
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(
        '/user/enrolledCourse',
        { courseId },
        {
          headers: {
            'x-access-token': auth.token,
          },
        }
      );

      toast.success('Successfully enrolled!');
      updateCourseEnrollment(courseId);
    } catch (error) {
      console.error('Enrollment failed:', error);
      toast.error('Enrollment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoveClick = async (courseId) => {
    if (!auth?.token) {
      toast.info('Please log in to manage your wishlist/cart.');
      updateCourseCartToggle(courseId);
      return;
    }

    if (isFallbackMode || courseId.startsWith('demo-')) {
      updateCourseCartToggle(courseId);
      toast.success('Course wishlist updated!');
      return;
    }

    try {
      const response = await toggleCourseInCart(auth.token, courseId);

      if (response.status === 200) {
        toast.success(response.data.message || 'Course added to cart!');
        updateCourseCartToggle(courseId);
      } else {
        toast.error('Something went wrong while updating cart.');
      }
    } catch (error) {
      console.error(error);
      updateCourseCartToggle(courseId);
      toast.info('Course saved locally in cart.');
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const getCourseImage = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `${API_BASE_URL}/${image}`;
  };

  return (
    <Layout>
      <Search query={query} setQuery={setQuery} />
      
      {isFallbackMode && (
        <div className="container mt-3">
          <div className="alert alert-info d-flex align-items-center justify-content-between shadow-sm rounded-3 py-2 px-3 mb-0" role="alert">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-info-circle-fill fs-5 text-primary"></i>
              <div>
                <strong>Catalog Preview Mode:</strong> Showing featured courses catalog. When backend is live, database courses will appear automatically.
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => fetchCourses()}
            >
              <i className="bi bi-arrow-clockwise me-1"></i> Retry Live Fetch
            </button>
          </div>
        </div>
      )}

      <section className="my-4">
        <div className="container">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '300px' }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : displayedCourses.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
              <h4 className="text-secondary">No courses found matching "{query}"</h4>
              <p className="text-muted">Try searching with different keywords or explore our full catalog.</p>
              <button className="btn btn-primary" onClick={() => setQuery('')}>
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="row course-list">
                {displayedCourses.map((course) => (
                  <div
                    className="col-12 col-md-6 col-lg-4 mb-4"
                    key={course._id}
                  >
                    <div className="custom-course-card position-relative h-100 shadow-sm border-0 rounded-3">
                      <Link
                        to="#"
                        className="course-tag position-absolute top-0 start-0 m-2"
                      >
                        Featured
                      </Link>
                      <div>
                        <div className="position-relative card-img">
                          <img
                            src={getCourseImage(course.image)}
                            className="course-image"
                            alt={course.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                            }}
                          />
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
                        </div>
                      </div>

                      <div className="course-details d-flex flex-column text-center p-3">
                        <h5 className="course-title fw-bold text-dark mb-2" title={course.title}>
                          {course.title}
                        </h5>
                        <p className="card-text my-2 text-secondary description-clamp small">
                          {course.description && course.description.length > 70
                            ? `${course.description.slice(0, 70)}...`
                            : course.description}
                        </p>

                        <div className="d-flex justify-content-between align-items-center my-2 px-1">
                          <span className="badge bg-light text-primary border border-primary-subtle py-1 px-2">
                            {course.category}
                          </span>
                          <span className="course-price fw-bold text-success fs-6">
                            ₹{course.price}
                          </span>
                        </div>

                        <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
                          {!auth?.token ? (
                            <button
                              onClick={() => {
                                toast.info('Please login to enroll in this course.');
                                navigate('/login');
                              }}
                              className="course-action-btn course-action-btn-outline-warning"
                            >
                              Enroll Now
                            </button>
                          ) : course?.isEnrolled ? (
                            <Link
                              to={`/course-lectures/${course._id}`}
                              className="course-action-btn course-action-btn-warning"
                            >
                              Start Now
                            </Link>
                          ) : (
                            <button
                              onClick={() => handleEnrollClick(course._id)}
                              className="course-action-btn course-action-btn-outline-warning"
                              disabled={loading}
                            >
                              {loading ? 'Enrolling...' : 'Enroll Now'}
                            </button>
                          )}

                          <button
                            className="explore-btn btn-outline-secondary w-48"
                            onClick={() => navigate(`/course-details/${course._id}`)}
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!query && totalPages > 1 && (
                <div className="pagination-container text-center mt-4">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`pagination-btn ${page === i + 1 ? 'btn-primary' : ''}`}
                      onClick={() => handlePageChange(i + 1)}
                      disabled={loading}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages || loading}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Coursesall;

