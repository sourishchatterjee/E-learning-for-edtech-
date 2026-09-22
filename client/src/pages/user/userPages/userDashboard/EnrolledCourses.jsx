
// import React, { useState, useMemo } from "react";
// import { PacmanLoader } from 'react-spinners';
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { enrolledCourses as fetchEnrolledCourses } from "../../../../api/userApiFunctions/dashboardApis/enrolledCourses";
// import "./EnrolledCourses.css";

// const EnrolledCourses = () => {
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["enrolledCourses"],
//     queryFn: () => fetchEnrolledCourses(token),
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 4;

//   const filteredCourses = useMemo(() => {
//     if (!data?.data?.enrolledCourses) return [];
//     return data.data.enrolledCourses.filter(course =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [data, searchTerm]);

//   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
//   const paginatedCourses = filteredCourses.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   if (isLoading)
//     return <div className='content-wrapper col-8 col-lg-10' style={{
//       display: 'flex',
//       justifyContent: 'center',
//       paddingTop: '25vh',
//       backgroundColor: '#fefefe',
//     }}>
//       <PacmanLoader color="#36d7b7" size={40} />
//     </div>;
//   if (isError) return <div className="content-wrapper col-8 col-lg-10">Error loading courses.</div>;

//   return (
//     <div className="content-wrapper col-8 col-lg-10">
//       <div className="enroll_header mt-2 mb-2">
//         <div className="row">
//           <div className="col-md-6">
//             <h3>Course Catalog</h3>
//             <p className="ps-2">My Courses Catalog</p>
//           </div>
//           <div className="col-md-6 d-flex justify-content-md-end align-items-center">
//             <input
//               type="text"
//               className="search_enroll"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           {paginatedCourses.length === 0 ? (
//             <p className="text-center">No courses found.</p>
//           ) : (
//             paginatedCourses.map((course, index) => (
//               <div className="col-md-6 col-lg-6 enroll_box" key={course._id || index}>
//                 <div className="enroll-card">
//                   <div className="enroll-card-img">
//                     <img
//                       src={`${API_BASE_URL}/${course.image}`}
//                       alt={course.title}
//                       className="w-100"
//                     />
//                   </div>
//                   <div className="card-e text-center">
//                     <h5 className="card-e-title">{course.title}</h5>
//                     <p className="card-e-text">{course.description}</p>
//                     <div className="ratings mb-2">
//                       {/* Displaying star ratings based on course rating */}
//                       {[...Array(5)].map((_, i) => {
//                         const rating = course.rating || 0;
//                         if (i < Math.floor(rating)) {
//                           return <i className="fa-solid fa-star" key={i}></i>; // Full star
//                         } else if (i < rating) {
//                           return <i className="fa-solid fa-star-half-stroke" key={i}></i>; // Half star
//                         } else {
//                           return <i className="fa-regular fa-star text-muted" key={i}></i>; // Empty star
//                         }
//                       })}

//                     </div>
//                     <Link to={`/course-lectures/${course._id}`} className="btn btn-e mx-2 mb-2">start</Link>
//                     <Link to={`/course-details/${course._id}`} className="btn btn-f mx-2 mb-2">Explore</Link>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="d-flex justify-content-center mt-4 mb-4">
//             <button
//               className="btn btn-secondary mx-2 w-auto"
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="align-self-center">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="btn btn-secondary mx-2 w-auto"
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnrolledCourses;

























import React, { useState, useMemo } from "react";
import { PacmanLoader } from 'react-spinners';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { enrolledCourses as fetchEnrolledCourses } from "../../../../api/userApiFunctions/dashboardApis/enrolledCourses";
import "./EnrolledCourses.css";

const EnrolledCourses = () => {
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => fetchEnrolledCourses(token),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  const filteredCourses = useMemo(() => {
    if (!data?.data?.enrolledCourses) return [];
    return data.data.enrolledCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (isLoading)
    return <div className='content-wrapper col-8 col-lg-10' style={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '25vh',
      backgroundColor: '#fefefe',
    }}>
      <PacmanLoader color="#36d7b7" size={40} />
    </div>;
  if (isError) return <div className="content-wrapper col-8 col-lg-10">Error loading courses.</div>;

  return (
    <div className="content-wrapper col-8 col-lg-10">
      <div className="enroll_header mt-2 mb-2">
        <div className="row">
          <div className="col-md-6">
            <h3>Course Catalog</h3>
            <p className="ps-2">My Courses Catalog</p>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end align-items-center">
            <input
              type="text"
              className="search_enroll"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          {paginatedCourses.length === 0 ? (
            <p className="text-center">No courses found.</p>
          ) : (
            paginatedCourses.map((course, index) => (
              <div className="col-md-6 col-lg-6 enroll_box" key={course._id || index}>
                <div className="enroll-card">
                  <div className="enroll-card-img">
                    <img
                      src={`${API_BASE_URL}/${course.image}`}
                      alt={course.title}
                      className="course-image"
                    />
                  </div>
                  <div className="card-e text-center">
                    <h5 className="card-e-title">{course.title}</h5>
                    <p className="card-e-text">{course.description}</p>
                    <div className="ratings mb-2">
                      {/* Displaying star ratings based on course rating */}
                      {[...Array(5)].map((_, i) => {
                        const rating = course.rating || 0;
                        if (i < Math.floor(rating)) {
                          return <i className="fa-solid fa-star" key={i}></i>; // Full star
                        } else if (i < rating) {
                          return <i className="fa-solid fa-star-half-stroke" key={i}></i>; // Half star
                        } else {
                          return <i className="fa-regular fa-star text-muted" key={i}></i>; // Empty star
                        }
                      })}

                    </div>
                   <div className="d-flex justify-content-betwween align-items-center gap-4">
                     <Link to={`/course-lectures/${course._id}`} className="btn btn-e">start</Link>
                    <Link to={`/course-details/${course._id}`} className="btn btn-f ">Explore</Link>
                   </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 mb-4">
            <button
              className="btn btn-secondary mx-2 w-auto"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary mx-2 w-auto"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
