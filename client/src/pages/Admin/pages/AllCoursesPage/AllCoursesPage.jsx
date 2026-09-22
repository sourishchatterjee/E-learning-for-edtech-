// import { useEffect, useState } from "react";
// import { getAllCourses, deleteCourse } from "../../../../api/adminApiFunctions/getAllCourseApi/getAllCourses";
// import { useNavigate } from "react-router-dom";
// import "./AllCoursesPage.css";

// function AllCoursesPage() {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const fetchCourses = async () => {
//     const response = await getAllCourses();
//     if (response?.status === 200) {
//       const allCourses = response.data?.data || [];

//       // Optional: filter if needed (if backend includes deleted ones)
//       const filteredCourses = allCourses.filter(course => !course.isDeleted && course._id && course.title && course.image);

//       console.log("Filtered Courses:", filteredCourses); // ✅ Debug
//       setCourses(filteredCourses);
//     } else {
//       console.error("Failed to fetch courses:", response?.data?.message || "Unknown error");
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const handleDelete = async (id) => {
//     console.log("Deleting course with ID:", id);
//     const response = await deleteCourse(id);
//     if (response?.status === 200) {
//       fetchCourses(); // Refresh list
//     } else {
//       console.error("Delete failed:", response?.data?.message || "Unknown error");
//     }
//   };

//   return (
//     <div className="all-courses-container">
//       <h2 className="all-courses-heading">All Courses</h2>
//       <div className="course-grid">
//         {courses.length === 0 ? (
//           <p>No courses available.</p>
//         ) : (
//           courses.map((course) => (
//             <div key={course._id} className="course-card">
//               <img
//                 src={`${API_BASE_URL}/${course.image}`}
//                 onError={(e) => (e.target.src = "/default-course.jpg")}
//                 alt={course?.title}
//                 className="course-image"
//               />
//               <h3>{course.title}</h3>
//               <p>{course.category}</p>
//               <p>${course.price}</p>
//               <p>{course._id}</p>
//               <div className="button-group">
// <button onClick={() => navigate(`/admin/edit-course/${course._id}`)}>
//   Edit Course
// </button>
// <button onClick={() => navigate(`/admin/add-lessons/${course._id}`)}>
//   Add Lesson
// </button>
//                 <button onClick={() => handleDelete(course._id)} className="delete-btn">
//                   Delete Course
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllCoursesPage;




import { useEffect, useState } from "react";
import {
  getAllCourseswithoutPagination,
  deleteCourse,
} from "../../../../api/adminApiFunctions/getAllCourseApi/getAllCourses";
import { useNavigate } from "react-router-dom";
import "./AllCoursesPage.css";

function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchCourses = async () => {
    const response = await getAllCourseswithoutPagination();
    if (response?.status === 200) {
      const allCourses = response.data?.data || [];
      const filteredCourses = allCourses.filter(
        (course) =>
          !course.isDeleted && course._id && course.title && course.image
      );
      setCourses(filteredCourses);
      const categories = [...new Set(filteredCourses.map((c) => c.category))];
      setUniqueCategories(categories);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    const response = await deleteCourse(id);
    if (response?.status === 200) {
      fetchCourses();
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      (filteredCategory === "All" || course.category === filteredCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //const visibleCourses = filteredCourses.slice(0, visibleCount);
  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, visibleCount);
  return (
    <div className="container py-5">
      <h2 className="all-courses-heading mb-4">All Courses</h2>

      <div className="search-bar mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search courses by title..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="category-container d-flex flex-wrap justify-content-center gap-3 mb-4">
        <button
          className={`category-btn ${
            filteredCategory === "All" ? "active" : ""
          }`}
          onClick={() => setFilteredCategory("All")}
        >
          All
        </button>
        {uniqueCategories.map((cat, i) => (
          <button
            key={i}
            className={`category-btn ${
              filteredCategory === cat ? "active" : ""
            }`}
            onClick={() => setFilteredCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>


      <div className="row g-4">
        {visibleCourses.map((course) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={course._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`${API_BASE_URL}/${course.image}`}
                className="card-img-top"
                alt={course.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title.slice(0, 45)}</h5>
                <p className="card-text small text-muted">{course.category}</p>
                <div className="card-button-group d-flex flex-wrap gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/admindashboard/editcourse/${course._id}`)}
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={() => navigate(`/admindashboard/add-lesson/${course._id}`)}
                  >
                    Add Lesson
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length > 8 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AllCoursesPage;
