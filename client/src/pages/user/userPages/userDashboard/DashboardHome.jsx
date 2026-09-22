

// import { PacmanLoader } from 'react-spinners';
// import React, { useEffect, useState, useRef } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';
// import { dashboardOverview, enrolledCoursesDashboard } from '../../../../api/userApiFunctions/dashboardApis/dashboardHome';
// import FemaleDesigner from './../../../../assets/dashBoard/FemaleDesigner.png';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const DashboardHome = () => {
//     const [overviewData, setOverviewData] = useState(null);
//     const [enrolledCourses, setEnrolledCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const chartContainerRef = useRef(null);

//     const token = localStorage.getItem('token');

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const overviewResponse = await dashboardOverview(token);
//             const coursesResponse = await enrolledCoursesDashboard(token);

//             setOverviewData(overviewResponse?.data || {});
//             setEnrolledCourses(coursesResponse?.data?.findEnrolledCoursesDetails || []);
//         } catch (err) {
//             console.error('Failed to fetch dashboard data:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchData();
//         }
//     }, [token]);

//     if (loading) {
//         return (
//             <div className='content-wrapper col-8 col-lg-10' style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 paddingTop: '25vh',
//                 backgroundColor: '#fefefe',
//             }}>
//                 <PacmanLoader color="#36d7b7" size={40} />
//             </div>
//         );
//     }

//     const courseLabels = enrolledCourses.map((_, i) => `Course ${i + 1}`);
//     const progressData = enrolledCourses.map((course) => course.progressPercentage);

//     const chartData = {
//         labels: courseLabels,
//         datasets: [
//             {
//                 label: 'Progress (%)',
//                 data: progressData,
//                 fill: true,
//                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 borderColor: '#36a2eb',
//                 pointBackgroundColor: '#007bff',
//                 tension: 0.4,
//                 borderWidth: 2,
//             }
//         ]
//     };

//     const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: { display: false },
//             title: {
//                 display: true,
//                 text: 'Course Progress Overview',
//                 font: { size: 20 },
//                 color: '#333',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (context) => `Progress: ${context.raw}%`,
//                 },
//             },
//         },
//         scales: {
//             x: {
//                 ticks: { color: '#333' },
//                 title: {
//                     display: true,
//                     text: 'Courses',
//                     color: '#333',
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 max: 100,
//                 ticks: {
//                     color: '#333',
//                     stepSize: 10,
//                 },
//                 title: {
//                     display: true,
//                     text: 'Progress (%)',
//                     color: '#333',
//                 },
//             },
//         },
//     };

//     const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progressPercentage, 0);
//     const averageProgress = enrolledCourses.length > 0
//         ? Math.round(totalProgress / enrolledCourses.length)
//         : 0;

//     return (
//         <div className="content-wrapper col-8 col-lg-10">
//             <div className="d_header">
//                 <div className="row align-items-center">
//                     <div className="col-md-7">
//                         <p className="mb-0 overall-progress">
//                             You've learned <span className="text-warning fw-bold">{averageProgress}% of your</span> goal this week!<br />
//                             Keep it up and improve your results!
//                         </p>
//                     </div>
//                     <div className="col-md-5 d-banner-image">
//                         <img src={FemaleDesigner} alt="Student studying" />
//                     </div>
//                 </div>
//             </div>

//             <div className="container-fluid py-4">
//                 <h5 className="section-title">Overview</h5>
//                 <div className="row">
//                     <div className="col-md-3 col-sm-6 col-12">
//                         <div className="stat-card purple">
//                             <div className="stat-title">Enrolled courses</div>
//                             <div className="number">{overviewData?.totalEnrolledCourse || 0}</div>
//                         </div>
//                     </div>
//                     <div className="col-md-3 col-sm-6 col-12">
//                         <div className="stat-card orange">
//                             <div className="stat-title">Wishlist</div>
//                             <div className="number">{overviewData?.totalCartCourses || 0}</div>
//                         </div>
//                     </div>
//                     <div className="col-md-3 col-sm-6 col-12">
//                         <div className="stat-card green">
//                             <div className="stat-title">Overall quiz score</div>
//                             <div className="number">{overviewData?.overallQuizPercentage || '0'}</div>
//                         </div>
//                     </div>
//                     <div className="col-md-3 col-sm-6 col-12">
//                         <div className="stat-card orange">
//                             <div className="stat-title">Certificate earned</div>
//                             <div className="number">0</div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Responsive Line Chart Section */}
//                 <div className="row graph mt-5">
//                     <div
//                         className="col-12"
//                         style={{ overflowX: 'auto' }}
//                     >
//                         <div
//                             style={{
//                                 width: '100%',
//                                 height: '400px',
//                             }}
//                             ref={chartContainerRef}
//                         >
//                             <Line data={chartData} options={chartOptions} />
//                         </div>

//                     </div>
//                 </div>

//                 <h5 className="section-title text-uppercase mt-4">Enrolled Courses</h5>
//                 {enrolledCourses.map((course, index) => (
//                     <div className="d-course-card d-flex justify-content-between align-items-start flex-wrap" key={index}>
//                         <div className="flex-grow-1">
//                             <h6 className="mb-1">
//                                 <span className="fw-bold me-2">Course {index + 1} -</span>
//                                 {course.courseTitle}
//                             </h6>
//                             <div className="text-muted small mb-1">Progress</div>
//                             <div className="d-progress w-100" style={{ maxWidth: '400px' }}>
//                                 <div
//                                     className="progress-bar bg-primary"
//                                     role="progressbar"
//                                     style={{ width: `${course.progressPercentage}%` }}
//                                 ></div>
//                             </div>
//                         </div>
//                         <div className="d-course-status text-end ms-auto mt-2 mt-md-0">
//                             {course.courseCompleted ? (
//                                 <span className="course-badge completed-badge bg-success text-white">Completed</span>
//                             ) : (
//                                 <span className="course-badge">
//                                     <i className="bi bi-card-text me-1"></i>
//                                     {course.completedLessons}/{course.totalLessons}
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DashboardHome;































import { PacmanLoader } from 'react-spinners';
import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { dashboardOverview, enrolledCoursesDashboard } from '../../../../api/userApiFunctions/dashboardApis/dashboardHome';
import FemaleDesigner from './../../../../assets/dashBoard/FemaleDesigner.png';
import CountUp from 'react-countup';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardHome = () => {
    const [overviewData, setOverviewData] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const chartContainerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        setLoading(true);
        try {
            const overviewResponse = await dashboardOverview(token);
            const coursesResponse = await enrolledCoursesDashboard(token);

            setOverviewData(overviewResponse?.data || {});
            setEnrolledCourses(coursesResponse?.data?.findEnrolledCoursesDetails || []);
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
            setMounted(true);
        }
    }, [token]);

    if (loading) {
        return (
            <div className='content-wrapper col-8 col-lg-10' style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '25vh',
                backgroundColor: '#fefefe',
            }}>
                <PacmanLoader color="#36d7b7" size={40} />
            </div>
        );
    }

    const courseLabels = enrolledCourses.map((_, i) => `Course ${i + 1}`);
    const progressData = enrolledCourses.map((course) => course.progressPercentage);

    const chartData = {
        labels: courseLabels,
        datasets: [
            {
                label: 'Progress (%)',
                data: progressData,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: '#36a2eb',
                pointBackgroundColor: '#007bff',
                tension: 0.4,
                borderWidth: 2,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000, // animation duration (2 seconds)
            easing: 'easeInOutQuad', // smooth easing
        },
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Course Progress Overview',
                font: { size: 20 },
                color: '#333',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `Progress: ${context.raw}%`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#333' },
                title: {
                    display: true,
                    text: 'Courses',
                    color: '#333',
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: '#333',
                    stepSize: 10,
                },
                title: {
                    display: true,
                    text: 'Progress (%)',
                    color: '#333',
                },
            },
        },
    };

    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progressPercentage, 0);
    const averageProgress = enrolledCourses.length > 0
        ? Math.round(totalProgress / enrolledCourses.length)
        : 0;

    return (
        <div className="content-wrapper col-8 col-lg-10">
            <div className="d_header">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <p className="mb-0 overall-progress">
                            You've learned <span className="text-warning fw-bold">{averageProgress}% of your</span> goal this week!<br />
                            Keep it up and improve your results!
                        </p>
                    </div>
                    <div className="col-md-5 d-banner-image">
                        <img src={FemaleDesigner} alt="Student studying" />
                    </div>
                </div>
            </div>

            <div className="container-fluid py-4">
                <h5 className="section-title">Overview</h5>
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="stat-card purple">
                            <div className="stat-title">Enrolled courses</div>
                            <div className="number">
                                <CountUp start={0} end={overviewData?.totalEnrolledCourse || 0} duration={2} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="stat-card orange">
                            <div className="stat-title">Wishlist</div>
                            <div className="number">
                                <CountUp start={0} end={overviewData?.totalCartCourses || 0} duration={2} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="stat-card green">
                            <div className="stat-title">Overall quiz score</div>
                            <div className="number">
                                <CountUp start={0} end={overviewData?.overallQuizPercentage || 0} duration={2} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="stat-card orange">
                            <div className="stat-title">Certificate earned</div>
                            <div className="number">
                                <CountUp start={0} end={overviewData?.totalcertificate || 0} duration={2} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Responsive Line Chart Section */}
                <div className="row graph mt-5">
                    <div
                        className="col-12"
                        style={{ overflowX: 'auto' }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '400px',
                            }}
                            ref={chartContainerRef}
                        >
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                <h5 className="section-title text-uppercase mt-4">Enrolled Courses</h5>
                {enrolledCourses.map((course, index) => (
                    <div className="d-course-card d-flex justify-content-between align-items-start flex-wrap" key={index}>
                        <div className="flex-grow-1">
                            <h6 className="mb-1">
                                <span className="fw-bold me-2">Course {index + 1} -</span>
                                {course.courseTitle}
                            </h6>
                            <div className="text-muted small mb-1">Progress</div>
                            <div className="d-progress w-100" style={{ maxWidth: '400px' }}>
                                <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: `${course.progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="d-course-status text-end ms-auto mt-2 mt-md-0">
                            {course.courseCompleted ? (
                                <span className="course-badge completed-badge bg-success text-white">Completed</span>
                            ) : (
                                <span className="course-badge">
                                    <i className="bi bi-card-text me-1"></i>
                                    {course.completedLessons}/{course.totalLessons}
                                </span>
                            )}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default DashboardHome;
