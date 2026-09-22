// 

import React, { useEffect, useState } from "react";
import "./AddQuizesPage.css";
import { useNavigate } from "react-router-dom";
import { allCourses } from "../../../../api/adminApiFunctions/addQuizeApi/addQuizeApi";
import "./Quize.css"
function AddQuizesPage() {
  const [courses, setCourses] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch courses
  const fetchCourses = async () => {
    const response = await allCourses();
    if (response?.status === 200) {
      const allCoursesData = response.data?.data || [];
      const validCourses = allCoursesData.filter(
        (course) =>
          !course.isDeleted && course._id && course.title && course.image
      );
      setCourses(validCourses);
      const categories = [...new Set(validCourses.map((c) => c.category))];
      setUniqueCategories(categories);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      filteredCategory === "All" || course.category === filteredCategory;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, visibleCount);

  return (
    <div className="quiz-page-container">
      <h2 className="quiz-heading">Add Quize</h2>

      <div className="quiz-search-bar">
        <input
          type="text"
          placeholder="Search courses by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="quiz-category-filter">
        <button
          className={`quiz-category-btn ${filteredCategory === "All" ? "active" : ""}`}
          onClick={() => setFilteredCategory("All")}
        >
          All
        </button>
        {uniqueCategories.map((cat, i) => (
          <button
            key={i}
            className={`quiz-category-btn ${filteredCategory === cat ? "active" : ""}`}
            onClick={() => setFilteredCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="quiz-cards-grid">
        {visibleCourses.map((course) => (
          <div className="quiz-card" key={course._id}>
            <img
              src={`${API_BASE_URL}/${course.image}`}
              alt={course.title}
              className="quiz-card-img"
            />
            <div className="quiz-card-body">
              <h5 className="quiz-card-title">{course.title}</h5>
              <p className="quiz-card-category">{course.category}</p>
              <div className="quiz-card-buttons">
                <button onClick={() => navigate(`/admindashboard/editquiz/${course._id}`)}>
                  Edit Quiz
                </button>
                <button onClick={() => navigate(`/admindashboard/addqustions/${course._id}`)}>
                  Add Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length > 8 && (
        <div className="quiz-show-more">
          <button onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddQuizesPage;