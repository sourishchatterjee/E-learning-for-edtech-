

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { toast } from 'react-toastify';
import './CoursesByCategory.css';
import Layout from '../../../layout/Layout';
import { toggleCourseInCart } from '../../../api/userApiFunctions/homeApi/homeApi';
import { PacmanLoader } from 'react-spinners';

const CoursesByCategory = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { categoryName } = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCourseId, setLoadingCourseId] = useState(null);

  const coursesPerPage = 4;

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const config = auth?.token
        ? { headers: { 'x-access-token': auth.token } }
        : {};

      const res = await axiosInstance.get(`/category/${categoryName}`, config);
      setAllCourses(res.data.data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
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

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleEnrollClick = async (courseId) => {
    if (!auth.token) {
      toast.error('You must be logged in to enroll.');
      return navigate('/login');
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
      toast.success('Successfully enrolled!');
      setAllCourses(prev =>
        prev.map(course =>
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
      toast.error('You must be logged in to add to cart a course.');
      return navigate('/login');
    }

    try {
      const response = await toggleCourseInCart(auth.token, courseId);
      if (response.status === 200) {
        toast.success(response.data.message || 'Course added to cart!');
        setAllCourses(prev =>
          prev.map(course =>
            course._id === courseId
              ? { ...course, isInCart: !course.isInCart }
              : course
          )
        );
      } else {
        toast.error(response.data.message || 'Something went wrong while updating cart!');
      }
    } catch (error) {
      console.error('Toggle cart error:', error);
      toast.error('Error toggling course in cart.');
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row mb-4 align-items-center">
          <div className="col-12 col-md-6">
            <h3 className="fw-bold text-dark mb-2 mb-md-0">
              Courses in "{categoryName}"
            </h3>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <input
              type="text"
              placeholder="Search courses..."
              className="form-control w-100 w-md-50 ms-md-auto"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {loadingCourses ? (
          <div className="d-flex justify-content-center py-5">
            <PacmanLoader size={45} color="#007bff" />
          </div>
        ) : currentCourses.length > 0 ? (
          <div className="row g-4">
            {currentCourses.map(course => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={course._id}>
                <div className="card course-card h-100 shadow-sm rounded-3">
                  <div className="card-head position-relative">
                    <span
                      className="heart-button position-absolute top-0 end-0 m-2"
                      onClick={() => handleLoveClick(course._id)}
                      style={{
                        color: course.isInCart ? 'red' : 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                      }}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </span>

                    <img
                      src={`${API_BASE_URL}/${course.image}`}
                      className="card-img-top"
                      alt={course.title}
                      style={{ height: '180px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = '/fallback.jpg')}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text small text-muted">
                      {course.description.length > 80
                        ? course.description.slice(0, 80) + '...'
                        : course.description}
                    </p>
                    <p className="mb-1 small text-secondary">Category: {course.category}</p>
                    <p className="fw-bold text-primary">₹{course.price}</p>

                    <div className="rating mb-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className="fas fa-star"
                          style={{
                            color: index < course.rating ? '#ffc107' : '#e4e5e9',
                            textShadow: '0 0 1px black',
                          }}
                        ></i>
                      ))}
                    </div>

                    <div className="mt-auto d-flex justify-content-between gap-2">
                      {course.isEnrolled ? (
                        <>
                          <Link
                            to={`/course-lectures/${course._id}`}
                            className="btn btn-sm btn-warning w-50"
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
                            className="btn btn-sm btn-outline-primary w-50"
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
            <h5 className="text-muted">No courses found in "{categoryName}".</h5>
            <button className="btn btn-outline-primary mt-3 w-auto" onClick={() => navigate(-1)}>
              Go Back
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

