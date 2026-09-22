import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

import getAllCourses from "../../../../api/adminApiFunctions/getAllCourseApi/getAllCourses";
import getTotalQuizzes from "../../../../api/adminApiFunctions/getAllQuizes/getAllQuizeCount";
import getTotalUsers from "../../../../api/adminApiFunctions/getAllUsersApi/getAllusers";
import getAllComments from "../../../../api/adminApiFunctions/getAllUsersComment/getAllComments"
import "./adminHome.css";

function AdminHome() {
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [comments, setComments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


// Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());





//fetching comments
 useEffect(() => {
  async function fetchTotalComments() {
    try {
      const response = await getAllComments();
      const comments = response?.data?.courseComment || [];  // 👈 correct path
      setTotalComments(comments.length);                     // 👈 count
      setComments(comments);                                 // 👈 full comment array if needed
    } catch (error) {
      console.error("Error fetching total comments:", error);
      setError("Failed to fetch comment data");
    }
  }

  fetchTotalComments();
}, []);



  //Fetching total users
  useEffect(() => {
    async function fetchTotalUsers() {
      try {
        const response = await getTotalUsers();
        const userCount = response?.data?.data?.length || 0;
        setTotalUsers(userCount);
      } catch (error) {
        console.error("Error fetching total users:", error);
        setError("Failed to fetch user data");
      }
    }
    fetchTotalUsers();
  }, []);

  // Fetch quiz data
  useEffect(() => {
    async function fetchTotalQuizzes() {
      try {
        const response = await getTotalQuizzes();
        console.log("Quiz response:", response?.data); // Should log { totalQuiz: 15 }

        const quizCount = response?.data?.totalQuiz;

        if (typeof quizCount === "number") {
          setTotalQuizzes(quizCount); // ✅ Only store the number, not the whole object!
        }
      } catch (error) {
        console.error("Error fetching total quizzes:", error);
        setError("Failed to fetch quiz data");
      }
    }

    fetchTotalQuizzes();
  }, []);

  // Fetch course data
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getAllCourses();
        if (response?.data?.success) {
          setCourses(response.data.data);
          const total = response.data.pagination?.totalCourses;
          setTotalCourses(total || 0);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);
///////////////thsi part is for bello 







  // Loading state
  if (loading) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <PacmanLoader color="#007bff" size={25} />
        <span style={{ marginLeft: "1rem" }}>Loading dashboard...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="error-container"
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#dc3545",
        }}
      >
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }





  ///////////////////
   // Chart data
  const pieChartData = [
    { name: 'Users', value: totalUsers, color: '#8B5CF6' },
    { name: 'Courses', value: totalCourses, color: '#F59E0B' },
    { name: 'Quizzes', value: totalQuizzes, color: '#10B981' },
    { name: 'Comments', value: totalComments, color: '#3B82F6' }
  ];

  const barChartData = [
    { name: 'Users', value: totalUsers, fill: '#8B5CF6' },
    { name: 'Courses', value: totalCourses, fill: '#F59E0B' },
    { name: 'Quizzes', value: totalQuizzes, fill: '#10B981' },
    { name: 'Comments', value: totalComments, fill: '#3B82F6' }
  ];

  // Mock data for trend chart
  const trendData = [
    { month: 'Jan', users: Math.floor(totalUsers * 0.6), courses: Math.floor(totalCourses * 0.4) },
    { month: 'Feb', users: Math.floor(totalUsers * 0.7), courses: Math.floor(totalCourses * 0.5) },
    { month: 'Mar', users: Math.floor(totalUsers * 0.8), courses: Math.floor(totalCourses * 0.7) },
    { month: 'Apr', users: Math.floor(totalUsers * 0.9), courses: Math.floor(totalCourses * 0.8) },
    { month: 'May', users: Math.floor(totalUsers * 0.95), courses: Math.floor(totalCourses * 0.9) },
    { month: 'Jun', users: totalUsers, courses: totalCourses }
  ];

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const isSelected = selectedDate.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="loading-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <PacmanLoader color="#007bff" size={25} />
        <span style={{ marginLeft: "1rem" }}>Loading dashboard...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="error-container"
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#dc3545",
        }}
      >
        <h3>Error Loading Dashboard</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }



  ////

  return (
  //   <div className="admin-home">
  //     <div className="container-fluid">
  //       <div className="row mb-4">
  //         <div className="col-12">
  //           <h1 className="page-title">Admin Dashboard</h1>
  //           <p className="page-subtitle">Welcome to your admin control panel</p>
  //         </div>
  //       </div>

  //       <h5 className="section-title mb-3">Overview</h5>
  //       <div className="row">
  //         <div className="col-md-3 col-sm-6 col-12 mb-3">
  //           <div className="stat-card purple">
  //             <div className="stat-title">Total Users</div>
  //             <div className="number">
  //               {totalUsers !== null ? (
  //                 <CountUp
  //                   key={totalUsers}
  //                   start={0}
  //                   end={totalUsers}
  //                   duration={2}
  //                 />
  //               ) : (
  //                 "Loading..."
  //               )}
  //             </div>

  //             <div className="stat-icon">
  //               <i className="fas fa-users"></i>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="col-md-3 col-sm-6 col-12 mb-3">
  //           <div className="stat-card orange">
  //             <div className="stat-title">Total Courses</div>
  //             <div className="number">
  //               <CountUp start={0} end={totalCourses} duration={2} />
  //             </div>
  //             <div className="stat-icon">
  //               <i className="fas fa-book"></i>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="col-md-3 col-sm-6 col-12 mb-3">
  //           <div className="stat-card green">
  //             <div className="stat-title">Total Quizzes</div>
  //             <div className="number">
  //               {totalQuizzes !== null ? (
  //                 <CountUp
  //                   key={totalQuizzes}
  //                   start={0}
  //                   end={totalQuizzes}
  //                   duration={2}
  //                 />
  //               ) : (
  //                 "Loading..."
  //               )}
  //             </div>
  //             <div className="stat-icon">
  //               <i className="fas fa-question-circle"></i>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="col-md-3 col-sm-6 col-12 mb-3">
  //           <div className="stat-card blue">
  //             <div className="stat-title">Total Comments</div>
  //             <div className="number">
  //                {totalComments }
  //             </div>
  //             <div className="stat-icon">
  //               <i className="fas fa-comments"></i>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Additional sections can be added here */}
       

  // {/* Platform Overview Pie Chart */}
  


  //     </div>
  //   </div>

  <div className="admin-home">
      <div className="container-fluid1">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="dashboard-header1">
              <div className="header-content1">
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="page-subtitle">Welcome to your admin control panel</p>
              </div>
              <div className="header-actions2">
                <div className="date-time">
                  <div className="current-date">{new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</div>
                  <div className="current-time">{new Date().toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <h5 className="section-title2 mb-3">Overview</h5>
        <div className="row">
          <div className="col-md-3 col-sm-6 col-12 mb-3">
            <div className="stat-card purple">
              <div className="stat-title">Total Users</div>
              <div className="number">
                {totalUsers !== null ? (
                  <CountUp
                    key={totalUsers}
                    start={0}
                    end={totalUsers}
                    duration={2}
                  />
                ) : (
                  "Loading..."
                )}
              </div>
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-trend">
                <i className="fas fa-arrow-up"></i>
                <span>+12% from last month</span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-12 mb-3">
            <div className="stat-card orange">
              <div className="stat-title">Total Courses</div>
              <div className="number">
                <CountUp start={0} end={totalCourses} duration={2} />
              </div>
              <div className="stat-icon">
                <i className="fas fa-book"></i>
              </div>
              <div className="stat-trend">
                <i className="fas fa-arrow-up"></i>
                <span>+8% from last month</span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-12 mb-3">
            <div className="stat-card green">
              <div className="stat-title">Total Quizzes</div>
              <div className="number">
                {totalQuizzes !== null ? (
                  <CountUp
                    key={totalQuizzes}
                    start={0}
                    end={totalQuizzes}
                    duration={2}
                  />
                ) : (
                  "Loading..."
                )}
              </div>
              <div className="stat-icon">
                <i className="fas fa-question-circle"></i>
              </div>
              <div className="stat-trend">
                <i className="fas fa-arrow-up"></i>
                <span>+15% from last month</span>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-12 mb-3">
            <div className="stat-card blue">
              <div className="stat-title">Total Comments</div>
              <div className="number">
                {totalComments}
              </div>
              <div className="stat-icon">
                <i className="fas fa-comments"></i>
              </div>
              <div className="stat-trend">
                <i className="fas fa-arrow-up"></i>
                <span>+23% from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Calendar Section */}
        <div className="row mt-4">
          {/* Bar Chart */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="chart-card">
              <div className="chart-header">
                <h5>Platform Statistics</h5>
                <i className="fas fa-chart-bar"></i>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="chart-card">
              <div className="chart-header">
                <h5>Distribution Overview</h5>
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="calendar-card">
              <div className="calendar-header">
                <button onClick={() => navigateMonth(-1)} className="nav-btn">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <h5>
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h5>
                <button onClick={() => navigateMonth(1)} className="nav-btn">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {renderCalendar()}
              </div>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="row mt-4">
          <div className="col-12 mb-4">
            <div className="chart-card">
              <div className="chart-header">
                <h5>Growth Trends</h5>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#8B5CF6" 
                      fillOpacity={1} 
                      fill="url(#colorUsers)" 
                      name="Users"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="courses" 
                      stroke="#F59E0B" 
                      fillOpacity={1} 
                      fill="url(#colorCourses)" 
                      name="Courses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default AdminHome;
