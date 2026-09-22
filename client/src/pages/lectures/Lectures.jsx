


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import './Lectures.css';
import {
  getCourseById,
  getLessonById,
  lessonMarkedUnmarked,
  userAddcomment,
} from '../../api/userApiFunctions/lecturesApi/LecturesApi';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Rating from '@mui/material/Rating';
import ClipLoader from 'react-spinners/ClipLoader';

const Lectures = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [auth] = useAuth();

  const [courseData, setCourseData] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quizId, setQuizId] = useState('');
  const [lessonsCompleted, setLessonsCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourseById(auth.token, courseId);
        if (res?.data?.success) {
          const course = res.data.data;
          setCourseData(course);
          setProgress(course.progressPercentage || 0);
          setLessonsCompleted(course.lessons.filter(lesson => lesson.isCompleted).map(lesson => lesson._id));
          setQuizId(course?.quizzes[0] || '');

          if (course.lessons.length > 0) {
            const firstLesson = course.lessons[0];
            setSelectedLessonId(firstLesson._id);
            const lessonRes = await getLessonById(auth.token, firstLesson._id, courseId);
            if (lessonRes?.data?.success) {
              setSelectedLesson(lessonRes.data.lesson);
              setComments(lessonRes.data.comments || []);
            }
          }
        } else {
          toast.error(res?.data?.message || 'Failed to fetch course details');
        }
      } catch (error) {
        toast.error('An error occurred while fetching course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [auth.token, courseId]);

  const handleLessonClick = async (lessonId) => {
    setSelectedLessonId(lessonId);
    try {
      const res = await getLessonById(auth.token, lessonId, courseId);
      if (res?.data?.success) {
        setSelectedLesson(res.data.lesson);
        setComments(res.data.comments || []);
        setShowAllComments(false);
        setUserRating(0);
        setUserComment('');
      } else {
        toast.error(res?.data?.message || 'Failed to fetch lesson details');
      }
    } catch (error) {
      toast.error('An error occurred while fetching lesson details');
    }
  };

  const handleCheckboxChange = async (lessonId, isChecked) => {
    try {
      const res = await lessonMarkedUnmarked(auth.token, {
        courseId,
        lessonId,
        isCompleted: isChecked,
      });
      if (res?.data?.success) {
        toast.success(res.data.message);
        setProgress(res.data.progressPercentage || 0);
        setLessonsCompleted(res.data.lessonsCompleted || []);
      } else {
        toast.error(res?.data?.message || 'Failed to update lesson status');
      }
    } catch (error) {
      toast.error('An error occurred while updating lesson status');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userRating || !userComment.trim()) {
      toast.error('Please provide both rating and comment');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await userAddcomment(auth.token, {
        refId: selectedLessonId,
        refType: 'lesson',
        comment: userComment.trim(),
        rating: userRating,
      });
      if (res?.data?.message) {
        toast.success(res.data.message);
        const lessonRes = await getLessonById(auth.token, selectedLessonId, courseId);
        if (lessonRes?.data?.success) {
          setComments(lessonRes.data.comments || []);
          setUserRating(0);
          setUserComment('');
          setSelectedLesson(lessonRes.data.lesson);
        }
      } else {
        toast.error(res?.data?.message || 'Failed to submit comment');
      }
    } catch (error) {
      toast.error('An error occurred while submitting comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAssessmentEnabled = courseData?.lessons?.length === lessonsCompleted.length;

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <ClipLoader color="#00BFFF" size={50} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-5 col-12 pe-5">
            <h3 style={{ color: '#2C3E50' }}>{courseData?.title}</h3>
          </div>
          <div className="col-md-7 col-12 d-flex justify-content-end align-items-center pb-2">
            <h5 className="me-3" style={{ color: '#2C3E50' }}>Course Progress</h5>
            <div className="course-progress">
              <CircularProgressbar
                className="circular-bar"
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: 'linear-gradient(90deg, #43B7FE, #00C896)',
                  textColor: '#333',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-4 col-md-5 pt-3 pb-3 mb-md-0 mb-3" style={{ backgroundColor: "#1B2A41" }}>
            <div className="lectures p-3 shadow-sm rounded " style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <h5 className="mb-3" style={{ color: "#10b981" }}>Lecture List</h5>
              {courseData?.lessons?.length === 0 ? (
                <p className="text-muted">No lectures yet.</p>
              ) : (
                courseData?.lessons?.map((lesson) => (
                  // <div key={lesson._id} className="form-check mb-2 d-flex align-items-start">
                  //   <input
                  //     type="checkbox"
                  //     className="form-check-input me-2"
                  //     checked={lessonsCompleted.includes(lesson._id)}
                  //     onChange={(e) => handleCheckboxChange(lesson._id, e.target.checked)}
                  //   />
                  //   <span
                  //     className={`form-check-label lecture-title ${selectedLessonId === lesson._id ? 'active' : ''}`}
                  //     onClick={() => handleLessonClick(lesson._id)}
                  //     style={{ color: '#fb923c' }}
                  //   >
                  //     {lesson.title}
                  //   </span>

                  // </div>

                  <div key={lesson._id} className="lecture-item mb-3">
                    <button
                      className={`completion-btn ${lessonsCompleted.includes(lesson._id) ? 'completed' : 'incomplete'
                        }`}
                      onClick={() =>
                        handleCheckboxChange(
                          lesson._id,
                          !lessonsCompleted.includes(lesson._id)
                        )
                      }
                    >
                      <i
                        className={`${lessonsCompleted.includes(lesson._id)
                            ? 'bi bi-check-lg'
                            : 'bi bi-circle'
                          }`}
                      ></i>
                    </button>
                    <span
                      className={`lecture-title ${selectedLessonId === lesson._id ? 'active' : ''
                        }`}
                      onClick={() => handleLessonClick(lesson._id)}
                    >
                      {lesson.title}
                    </span>
                  </div>





                ))
              )}
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-light w-100"
                  disabled={!isAssessmentEnabled}
                  onClick={() => navigate(`/course-quizzes/${quizId}`)}
                >
                  Assessment: Quiz
                </button>
              </div>
            </div>
          </div>




          {/* Main Content */}
          <div className="col-lg-8 col-md-7">
            <div className="course-content px-3 pb-3 shadow-sm rounded bg-white">
              <div className="ratio ratio-16x9 mb-3">
                {selectedLesson?.video ? (
                  <video
                    className="video-part"
                    controls
                    src={`${API_BASE_URL}/${selectedLesson.video}`}
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center bg-light text-muted rounded" style={{ height: '300px' }}>
                    <p>No video available for this lesson</p>
                  </div>

                )}
              </div>

              <h3 className="lesson-title mb-5 mb-md-0">
                {selectedLesson?.title || 'Select a lesson'}
              </h3>

              <div className="lesson-rating mb-3">
                <strong>Rating: </strong>
                <Rating
                  name="read-only"
                  value={selectedLesson?.rating || 0}
                  precision={0.5}
                  readOnly
                />
              </div>

              <div className="lesson-comment mb-3">
                <strong>Comments:</strong>
                {comments.length === 0 ? (
                  <p className="text-muted">No comments yet.</p>
                ) : (
                  <>
                    {(showAllComments ? comments : comments.slice(0, 1)).map((comment) => (
                      <div key={comment._id} className="mb-2">
                        <strong>{comment.user?.name || 'Anonymous'}</strong>
                        <p className="mb-1">{comment.comment}</p>
                      </div>
                    ))}
                    {comments.length > 1 && (
                      <button
                        className="btn btn-link p-0"
                        onClick={() => setShowAllComments(!showAllComments)}
                      >
                        {showAllComments ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </>
                )}
              </div>

              <form onSubmit={handleCommentSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <p className="mb-1">Rate Your Class</p>
                    <Rating
                      name="user-rating"
                      value={userRating}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setUserRating(newValue);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <textarea
                      className="form-control box"
                      placeholder="Write your comment..."
                      rows="2"
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                    ></textarea>
                    <div className="text-end mt-2">
                      <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Commenting...' : 'Comment'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lectures;


