
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { enrollCourse, findCommentByCourseId, getCourseById, userAddcomment } from '../../api/userApiFunctions/courseDetailsApi/courseDetailsApi';
import { useAuth } from '../../context/AuthProvider';
import './CourseDetails.css';
import { toast } from 'react-toastify';
import StarRatings from "react-star-ratings";
import { ClipLoader } from 'react-spinners';



import { fallbackCourses, fallbackReviews } from '../../data/fallbackData';

const CourseDetails = () => {
    const { id } = useParams();
    const [auth] = useAuth();
    const [courseData, setCourseData] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';
    const carouselRef = useRef(null);
    const [enrolling,setEnrolling]=useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [postingReview, setPostingReview] = useState(false);

    const getCourseImage = (img) => {
        if (!img) return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
        if (img.startsWith('http://') || img.startsWith('https://')) return img;
        return `${API_BASE_URL}/${img}`;
    };

    const fetchCourseDetails = async () => {
        try {
            const token = auth?.token || "";
            const res = await getCourseById(token, id);
            if (res?.status === 200 && res.data?.data) {
                setCourseData(res.data.data);
            } else {
                const found = fallbackCourses.find((c) => c._id === id) || fallbackCourses[0];
                setCourseData(found);
            }
        } catch (error) {
            console.warn("Backend unavailable for course details, loading fallback:", error.message);
            const found = fallbackCourses.find((c) => c._id === id) || fallbackCourses[0];
            setCourseData(found);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await findCommentByCourseId(id);
            if (res?.data?.success && Array.isArray(res.data.comment) && res.data.comment.length > 0) {
                setComments(res.data.comment);
            } else {
                setComments(fallbackReviews);
            }
        } catch (err) {
            setComments(fallbackReviews);
        }
    };





    useEffect(() => {
        fetchCourseDetails();
    }, [id, auth]);



    useEffect(() => {
        fetchComments();
    }, [id]);


    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            const bsCarousel = new window.bootstrap.Carousel(carousel, {
                interval: 3000,
                ride: 'carousel',
                pause: 'hover',
                wrap: true,
            });
        }
    }, [comments]);



    const handleImageError = (e) => {
        e.target.src = '/review.jpg'; // fallback image
    };




      const handleEnrollClick = async (courseId) => {
        setEnrolling(true);
          try {
            const response=await enrollCourse(auth.token,courseId);
            if (response?.status === 200) {
                toast.success(response?.data?.message || "Course enrolled successfully!");
                // fetchCourseDetails();
            } else {
                toast.error(response?.data?.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Failed to post review.");
        } finally {
             setEnrolling(false);
        }
            
    }

 





    // ***************for review section *******************
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        const val = e.target.value;
        setComment(val);
        setCharCount(val.length);
    };

    const handleSubmit = async () => {
        if (!auth?.token) {
            toast.warning("Please log in to submit a review.");
            return;
        }

        if (rating === 0 || comment.trim().length === 0) {
            toast.error("Please provide both rating and comment.");
            return;
        }

        setPostingReview(true);



        const data = {
            refId: id,
            refType: "course",
            comment: comment.trim(),
            rating,
        };
        console.log('Data', data);

        try {
            const response = await userAddcomment(auth.token, data);
            if (response?.status === 200) {
                toast.success(response?.data?.message || "Review submitted successfully!");
                setRating(0);
                setComment("");
                setCharCount(0);
                // Optionally trigger a refresh of reviews here
                fetchComments();
            } else {
                toast.error(response?.data?.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Failed to post review.");
        } finally {
            setPostingReview(false);
        }
    };





    if (loading) {
        return (
            // <Layout>
            //     <div className="text-center my-5">
            //         <h3>Loading course details...</h3>
            //     </div>
            // </Layout>
             <div className="spinner-container">
        <ClipLoader color="#000" size={50} />
      </div>
        );
    }

    if (!courseData) {
        return (
            <Layout>
                <div className="text-center my-5">
                    <h3>Course not found</h3>
                </div>
            </Layout>
        );
    }


    return (
        <Layout>


            {/* banner */}
            <section className="banner ai-course">
                <div className="container">
                    <div className="cartprt">
                        <div className="text-heading-prt">
                            <h1 className="ai-gen">{courseData?.title}</h1>
                            <p className="ipsum">{courseData?.description}</p>
                            {
                                (!auth?.token) ? <button onClick={() => { toast.warning('You have to login first to enroll the course'); navigate('/login'); }} className="btn3">Enroll Now</button>
                                    : ((courseData?.isEnrolled) ? <Link to={`/course-lectures/${id}`} className="btn3">Start Now</Link> 
                                    : <button onClick={() => {handleEnrollClick(id) }} className="btn3">{enrolling ? "Enrolling" : "Enroll Now"}</button>)
                            }
                        </div>

                        <div className="row mainprt py-5 px-2">
                            <div className="col cart-1 text-center me-3">
                                <h3>Job Assistanse</h3>
                                <p>For Pro Plan</p>
                            </div>
                            <div className="col cart-1 text-center">
                                <h3>25 April 2025</h3>
                                <p>Date of Commencement</p>
                            </div>
                            <div className="col cart-1 text-center">
                                <h3>6 Months</h3>
                                <p>Duration</p>
                            </div>
                            <div className="col cart-1 text-center">
                                <h3>Live + Recorded</h3>
                                <p>Delivery Mode</p>
                            </div>
                            <div className="col cart-1 text-center">
                                <h3>English</h3>
                                <p>Language</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* banner */}






            {/* about */}
            <section className="about ab-1">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-12 col-lg-6 mb-md-0 p-md-4 d-flex justify-content-center align-items-center">
                            <img 
                                src={getCourseImage(courseData.image)} 
                                className="w-100 rounded-3 shadow-sm" 
                                alt={courseData.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                                }}
                            />
                        </div>
                        <div className="col-lg-6 col-12 p-4 ps-md-0">
                            <h5 className="course-heading mt-0 py-2">{courseData.title}</h5>
                            <p className="lorem-text py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus tortor at diam gravida posuere. Curabitur et malesuada mi.</p>
                            <div className="row">
                                <div className="col">
                                    <h3 className="head-part1">Industry Professional Led Sessions</h3>
                                    <p className="part-2 pb-3">Get guidance from qualified industry professionals.</p>
                                    <div>
                                        <h3 className="head-part1">Career Assistance</h3>
                                        <p className="part-2 prt-3 pb-3">Prepare for interviews with guidance <br />and opportunities to showcase skills.</p>
                                    </div>
                                    <div>
                                        <h3 className="head-part1">Learn Industry Skills</h3>
                                        <p className="part-2 prt-4">Fast-track your upskilling journey<br /> with industry skills and personalized <br />guidance.</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <h3 className="head-part1">Project Portfolio</h3>
                                        <p className="part-2 prt-5 pb-3">Start building a job-ready profile <br />with a dynamic project portfolio</p>
                                    </div>
                                    <div>
                                        <h3 className="head-part1">Dedicated Peer Network</h3>
                                        <p className="part-2 pb-3">Build connections with like-minded<br /> learners to exchange ideas and <br />experiences.</p>
                                    </div>
                                    <div>
                                        <h3 className="head-part1">Certification</h3>
                                        <p className="part-2">Attain your certificate upon <br />course completion to <br />showcase your capabilities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* about */}





            {/* curriculam */}
            <section className="carriculam">
                <div className="container">
                    <h3 className="heading-1 py-5">Comprehensive <span className="curri">Curriculum</span> for Career-Driven Growth</h3>
                    <div className="container-t mt-4">
                        {
                            courseData?.lessons.map((lesson, index) =>
                                <div key={lesson._id}>
                                    <div className="row d-flex">
                                        <div className="col-md-8">
                                            <p className="lecture">Lecture {index + 1} : {lesson.title}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }

                    </div>
                </div>
            </section>
            {/* curriculam */}




            {/* exclusive learning */}
            <section className="exclusive-learning">
                <div className="container">
                    <div className="mainpart-ex">
                        <h4 className="pb-4 ms-3 achive-more">Achieve More: Skills with Our<span className="ex">Exclusive Learning<br /></span><span className="ms-2">Programs</span></h4>
                        <div className="box-sec row pt-5">
                            <div className="col part-one">
                                <img src="/courseDetails/picture1.png" />
                                <span className="under">Industry-Oriented Curriculum</span>
                            </div>
                            <div className="col part-one">
                                <img src="/courseDetails/picture2.png" />
                                <span className="under text-center">Comprehensive Learning Content</span>
                            </div>
                            <div className="col part-one">
                                <img src="/courseDetails/picture3.png" />
                                <span className="under">Weekend Live Sessions</span>
                            </div>
                        </div>
                        <div className="box-sec row">
                            <div className="col part-one">
                                <img src="/courseDetails/picture4.png" />
                                <span className="under">Practice Exercises</span>
                            </div>
                            <div className="col part-one">
                                <img src="/courseDetails/picture5.png" />
                                <span className="under">Assignments and Projects</span>
                            </div>
                            <div className="col part-one">
                                <img src="/courseDetails/picture6.png" />
                                <span className="under">Certification of Completion</span>
                            </div>
                        </div>
                        <div className="box-sec row">
                            <div className="col part-one">
                                <img src="/courseDetails/65688ca950c244a13d743c39 1.png" />
                                <span className="under">Peer to Peer Networking</span>
                            </div>
                            <div className="col part-one">
                                <img src="/courseDetails/picutre7.png" />
                                <span className="under">SME Support Session</span>
                            </div>
                            <div className="col part-one">
                                <img src="/courseDetails/65687af850c24428a7741e50 1.png" />
                                <span className="under ">Career Guidance & Interview Preparation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* exclusive learning */}






            {/* counsellor */}
            <section className="counsellor">
                <div className="container">
                    <div className="row g-0 position-relative">
                        <div className="counsell col-md-6 mb-md-0 p-md-4 leftprt-1">
                            <h5 className="mt-0 talk">Talk to Our <span className="blue">Counsellor</span></h5>
                            <p className="get pb-3">Get Expert Advice our Counsellor will reach within <br />24 hour.</p>
                            <div className="curl">
                                <Link to="/contact" className="stretched-link go-btn">Get Connected Now</Link>
                                <img src="/courseDetails/Frame (16).png" />
                            </div>
                        </div>
                        <div className="col-md-6 p-4 ps-md-0 black-man">
                            <img src="/courseDetails/businessman-black-suit-holding-his-tasklist-smiling 1.png" className="w-100" alt="..." />
                        </div>
                    </div>
                </div>
            </section>
            {/* counsellor */}






            {/* stories */}
            <section className="stories">
                <div className="container">
                    <h4 className="voice">
                        Voices of Transformation: Alumni <span className="stories-1">Stories</span>
                    </h4>

                    <div
                        id="carouselExample"
                        className="carousel slide"
                        data-bs-ride="carousel"
                        ref={carouselRef}
                    >
                        <div className="carousel-inner">
                            {comments?.map((item, index) => (
                                <div
                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                    key={item._id}
                                >
                                    <div className="mainpart-cm row g-0 position-relative align-items-center">
                                        {/* Left: Image */}
                                        <div className="col-md-6 text-center">

                                            <div
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '250px',
                                                    aspectRatio: '1', // Ensures 1:1 circle
                                                    borderRadius: '50%',
                                                    overflow: 'hidden',
                                                    border: '5px solid #f4c150',
                                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                                    margin: '0 auto',
                                                }}
                                            >
                                                <img
                                                    src={`${API_BASE_URL}/${item.userDetails.image}`}
                                                    alt={item.userDetails.name}
                                                    onError={handleImageError}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        animation: 'pulse 2s infinite',
                                                    }}
                                                />
                                            </div>

                                        </div>

                                        {/* Right: Comment Content */}
                                        <div className="lorem-cm col-md-6 p-4 ps-md-0 lorem-2">
                                            <img src="/courseDetails/Frame (15).png" alt="quote" />
                                            <div className="lorem-3">
                                                <p>{item.comment}</p>
                                                <p className="varsa fw-bold">{item.userDetails.name}</p>
                                                <div className="icon-5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Link to="#" key={i}>
                                                            <i
                                                                className={`fa-solid fa-star`}
                                                                style={{
                                                                    color:
                                                                        item.rating >= i + 1
                                                                            ? '#f4c150'
                                                                            : item.rating > i
                                                                                ? '#f4c15099'
                                                                                : '#ccc',
                                                                }}
                                                            ></i>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {comments.length === 0 && (
                                <div className="text-center py-4">No comments available.</div>
                            )}
                        </div>

                        {/* Carousel Controls */}
                        {comments.length > 1 && (
                            <>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExample"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExample"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>


            {/* stories */}





            {/* review */}

            <section className="review">
                <div className="container">
                    <h4 className="post">Post your <span className="review-1">Review</span></h4>
                    <div className="comment-sec text-center pt-5 pb-2">
                        <div className="star-group d-flex justify-content-center align-items-center">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#FFD700"
                                starHoverColor="#FFD700"
                                changeRating={handleRatingChange}
                                numberOfStars={5}
                                starDimension="30px"
                                starSpacing="3px"
                                name="rating"
                            />
                            <div className="mt-2 text-muted">
                                Rating: <strong>{rating}</strong> / 5
                            </div>
                        </div>
                        <form>
                            <textarea
                                name="msg"
                                className="from control mt-3 area w-50"
                                placeholder="Write your comment..."
                                cols="40"
                                rows="3"
                                value={comment}
                                onChange={handleCommentChange}
                            ></textarea>
                            <div className="text-end mt-1 pe-2 text-muted">{charCount}/500</div>
                        </form>
                    </div>
                    <div className="p-btn text-center mb-3">
                        <button
                            className="post-btn"
                            onClick={handleSubmit}
                            disabled={postingReview}
                        >
                            {postingReview ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>
            </section>






            {/* review */}

        </Layout>
    )
}

export default CourseDetails
