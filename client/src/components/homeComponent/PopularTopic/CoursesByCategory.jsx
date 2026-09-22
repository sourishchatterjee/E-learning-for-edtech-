import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { toast } from 'react-toastify';
import './CoursesByCategory.css';
import Layout from '../../../layout/Layout';
import { toggleCourseInCart } from '../../../api/userApiFunctions/homeApi/homeApi';
import { PacmanLoader } from 'react-spinners';
import { fallbackCourses } from '../../../data/fallbackData';

const CoursesByCategory = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';
  const { categoryName } = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  const coursesPerPage = 6;
  const decodedCategory = categoryName ? decodeURIComponent(categoryName).trim() : '';

  const getCourseImage = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return `${API_BASE_URL}/${img}`;
  };

  const getMatchingFallbackCourses = (cat) => {
    if (!cat) return fallbackCourses;
    const catLower = cat.toLowerCase().replace(/[-_]/g, ' ');
    
    // Exact or partial category match
    const matched = fallbackCourses.filter((course) => {
      const courseCat = course.category.toLowerCase().replace(/[-_]/g, ' ');
      return (
        courseCat.includes(catLower) ||
        catLower.includes(courseCat) ||
        course.title.toLowerCase().includes(catLower)
      );
    });

    return matched.length > 0 ? matched : fallbackCourses;
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const config = auth?.token
        ? { headers: { 'x-access-token': auth.token } }
        : {};

      const res = await axiosInstance.get(`/category/${encodeURIComponent(decodedCategory)}`, config);
      if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setAllCourses(res.data.data);
        setIsFallbackMode(false);
      } else {
        const fallbacks = getMatchingFallbackCourses(decodedCategory);
        setAllCourses(fallbacks);
        setIsFallbackMode(true);
      }
    } catch (error) {
      console.warn('Backend unavailable, showing category preview courses:', error.message);
      const fallbacks = getMatchingFallbackCourses(decodedCategory);
      setAllCourses(fallbacks);
      setIsFallbackMode(true);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [auth?.token, categoryName]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredCourses = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description?.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleEnrollClick = async (courseId) => {
    if (!auth?.token) {
      toast.info('Please log in to enroll.');
      return navigate('/login');
    }

    if (isFallbackMode || courseId.startsWith('demo-')) {
      toast.success('Successfully enrolled in demo course!');
      setAllCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? { ...course, isEnrolled: true } : course
        )
      );
      return;
    }

    try {
      setLoadingCourseId(courseId);
      const response = await axiosInstance.post(
        '/user/enrolledCourse',
        { courseId },
        {
          headers: { 'x-access-token': auth.token },
        }
      );
      toast.success(response.data?.message || 'Successfully enrolled!');
      setAllCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? { ...course, isEnrolled: true } : course
        )
      );
    } catch (error) {
      console.error('Enrollment failed:', error);
      toast.error('Enrollment failed. Try again.');
    } finally {
      setLoadingCourseId(null);
    }
  };

  const handleLoveClick = async (courseId) => {
    if (!auth?.token) {
      toast.info('Please log in to manage your wishlist.');
      setAllCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? { ...course, isInCart: !course.isInCart } : course
        )
      );
      return;
    }

    if (isFallbackMode || courseId.startsWith('demo-')) {
      setAllCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? { ...course, isInCart: !course.isInCart } : course
        )
      );
      toast.success('Wishlist updated!');
      return;
    }

    try {
      const response = await toggleCourseInCart(auth.token, courseId);
      if (response.status === 200) {
        toast.success(response.data.message || 'Course added to cart!');
        setAllCourses((prev) =>
          prev.map((course) =>
            course._id === courseId ? { ...course, isInCart: !course.isInCart } : course
          )
        );
      } else {
        toast.error('Something went wrong while updating cart!');
      }
    } catch (error) {
      console.error('Toggle cart error:', error);
      setAllCourses((prev) =>
        prev.map((course) =>
          course._id === courseId ? { ...course, isInCart: !course.isInCart } : course
        )
      );
      toast.info('Wishlist saved locally.');
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        {/* Header and Search */}
        <div className="row mb-4 align-items-center">
          <div className="col-12 col-md-7">
            <h2 className="fw-bold text-dark mb-1">
              Topic: <span className="text-primary">{decodedCategory}</span>
            </h2>
            <p className="text-secondary small mb-0">
              Browse recommended and top-rated courses in {decodedCategory}.
            </p>
          </div>
          <div className="col-12 col-md-5 mt-3 mt-md-0 text-md-end">
            <input
              type="text"
              placeholder="Search in this topic..."
              className="form-control shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Fallback indicator */}
        {isFallbackMode && (
          <div className="alert alert-info d-flex align-items-center justify-content-between shadow-sm rounded-3 py-2 px-3 mb-4" role="alert">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-info-circle-fill fs-5 text-primary"></i>
              <div>
                <strong>Curated Topic Preview:</strong> Showing featured courses matching <strong>{decodedCategory}</strong>.
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => fetchCourses()}
            >
              <i className="bi bi-arrow-clockwise me-1"></i> Refresh
            </button>
          </div>
        )}

        {loadingCourses ? (
          <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '250px' }}>
            <PacmanLoader size={35} color="#0d6efd" />
          </div>
        ) : currentCourses.length > 0 ? (
          <div className="row g-4">
            {currentCourses.map((course) => (
              <div className="col-12 col-sm-6 col-lg-4" key={course._id}>
                <div className="card course-card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-head position-relative">
                    <span
                      className="heart-button position-absolute top-0 end-0 m-2"
                      onClick={() => handleLoveClick(course._id)}
                      style={{
                        color: course.isInCart ? 'red' : 'white',
                        fontSize: '1.4rem',
                        cursor: 'pointer',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        zIndex: 2,
                      }}
                      title={course.isInCart ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </span>

                    <img
                      src={getCourseImage(course.image)}
                      className="card-img-top"
                      alt={course.title}
                      style={{ height: '190px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title fw-bold text-dark mb-2" title={course.title}>
                      {course.title}
                    </h5>
                    <p className="card-text text-secondary small mb-2">
                      {course.description && course.description.length > 75
                        ? course.description.slice(0, 75) + '...'
                        : course.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle py-1 px-2">
                        {course.category}
                      </span>
                      <span className="fw-bold text-success fs-6">₹{course.price}</span>
                    </div>

                    <div className="rating mb-3">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <i
                          key={starIndex}
                          className="fas fa-star"
                          style={{
                            color: starIndex < (course.rating || 5) ? '#ffc107' : '#e4e5e9',
                          }}
                        ></i>
                      ))}
                    </div>

                    <div className="mt-auto d-flex justify-content-between gap-2">
                      {course.isEnrolled ? (
                        <>
                          <Link
                            to={`/course-lectures/${course._id}`}
                            className="btn btn-sm btn-success w-50"
                          >
                            Start
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary w-50"
                            onClick={() => navigate(`/course-details/${course._id}`)}
                          >
                            Explore
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-primary w-50"
                            onClick={() => handleEnrollClick(course._id)}
                            disabled={loadingCourseId === course._id}
                          >
                            {loadingCourseId === course._id ? 'Enrolling...' : 'Enroll'}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary w-50"
                            onClick={() => navigate(`/course-details/${course._id}`)}
                          >
                            Explore
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-12 text-center py-5">
            <i className="bi bi-folder-x fs-1 text-muted mb-2 d-block"></i>
            <h4 className="text-secondary">No courses found matching your search.</h4>
            <button className="btn btn-outline-primary mt-3" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          </div>
        )}

        {totalPages > 1 && !loadingCourses && (
          <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CoursesByCategory;
