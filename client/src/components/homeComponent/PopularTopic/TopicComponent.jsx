import React, { useState, useEffect } from 'react';
import Topics from './Topics';
import CoursesByCategory from './CoursesByCategory';
import axiosInstance from '../../../api/axiosInstance';
import { fallbackCategories, fallbackCourses } from '../../../data/fallbackData';

const TopicComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [groupedCourse, setGroupedCourse] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch categories and grouped courses from API
  useEffect(() => {
    axiosInstance.get('/category')
      .then((response) => {
        if (response.data && response.data.categories && response.data.categories.length > 0) {
          setCategories(response.data.categories);
          setGroupedCourse(response.data.groupedCourse || {});
        } else {
          setCategories(fallbackCategories);
          const grouped = {};
          fallbackCategories.forEach(cat => {
            grouped[cat] = fallbackCourses.filter(c => c.category === cat);
          });
          setGroupedCourse(grouped);
        }
      })
      .catch((error) => {
        console.warn('Backend unavailable, using default categories:', error.message);
        setCategories(fallbackCategories);
        const grouped = {};
        fallbackCategories.forEach(cat => {
          grouped[cat] = fallbackCourses.filter(c => c.category === cat);
        });
        setGroupedCourse(grouped);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading topics...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Topics categories={categories} setSelectedCategory={setSelectedCategory}/>
      {selectedCategory && (
        <CoursesByCategory
          selectedCategory={selectedCategory}
          groupedCourses={groupedCourse[selectedCategory] || []}
        />
      )}
    </div>
  );
};

export default TopicComponent;
