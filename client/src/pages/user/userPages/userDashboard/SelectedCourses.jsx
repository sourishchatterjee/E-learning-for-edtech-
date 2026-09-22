


// import React, { useEffect, useMemo, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { selectedCourse, toggleCourseInCart } from "../../../../api/userApiFunctions/dashboardApis/selectedCourse";
// import { PacmanLoader } from "react-spinners";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./SelectedCourses.css";
// import axiosInstance from "../../../../api/axiosInstance";

// const SelectedCourses = () => {
//   const token = localStorage.getItem("token");
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   const queryClient = useQueryClient();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["selectedCourses"],
//     queryFn: () => selectedCourse(token),
//   });

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;
//   const [favoriteCourses, setFavoriteCourses] = useState(new Set());
//   const [enrollingCourseId, setEnrollingCourseId] = useState(null); // NEW STATE

//   useEffect(() => {
//     if (data?.data?.data) {
//       const courseIds = data.data.data.map((course) => course._id);
//       setFavoriteCourses(new Set(courseIds));
//     }
//   }, [data]);

//   const filteredCourses = useMemo(() => {
//     if (!data?.data?.data) return [];
//     return data.data.data.filter((course) =>
//       course.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [data, searchTerm]);

//   const totalPages = useMemo(
//     () => Math.ceil(filteredCourses.length / itemsPerPage),
//     [filteredCourses]
//   );

//   const paginatedCourses = useMemo(() => {
//     return filteredCourses.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage
//     );
//   }, [filteredCourses, currentPage]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   const handleHeartToggle = async (courseId) => {
//     try {
//       const response = await toggleCourseInCart(token, courseId);
//       if (response?.status === 200) {
//         toast.success(response.data.message);
//         const updated = new Set(favoriteCourses);
//         updated.has(courseId) ? updated.delete(courseId) : updated.add(courseId);
//         setFavoriteCourses(updated);
//         queryClient.invalidateQueries(["selectedCourses"]);
//       } else {
//         toast.error("Failed to update cart");
//       }
//     } catch (error) {
//       toast.error("Error updating cart");
//     }
//   };

//   const handleEnrollClick = async (courseId) => {
//     setEnrollingCourseId(courseId); // SET LOADING STATE
//     try {
//       const response = await axiosInstance.post(
//         "/user/enrolledCourse",
//         { courseId },
//         {
//           headers: {
//             "x-access-token": token,
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Successfully enrolled!");
//         queryClient.invalidateQueries(["selectedCourses"]);
//       }
//     } catch (error) {
//       console.error("Enrollment failed:", error);
//       toast.error(error.response?.data?.message || "Enrollment failed. Please try again.");
//     } finally {
//       setEnrollingCourseId(null); 
//     }
//   };

//   if (isLoading) {
//     return (
//       <div
//         className="content-wrapper col-8 col-lg-10"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           paddingTop: "25vh",
//           backgroundColor: "#fefefe",
//         }}
//       >
//         <PacmanLoader color="#36d7b7" size={40} />
//       </div>
//     );
//   }

//   if (isError) return <div className="content-wrapper col-8 col-lg-10">Error loading courses.</div>;

//   return (
//     <div className="content-wrapper col-8 col-lg-10">
//       <div className="enroll_header mt-2 mb-2">
//         <div className="row">
//           <div className="col-md-6">
//             <h3>Course Catalog</h3>
//             <p className="ps-2">My Selected Courses</p>
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
//             paginatedCourses.map((course) => (
//               <div className="col-md-6 col-lg-6 enroll_box" key={course._id}>
//                 <div className="enroll-card position-relative">
//                   <div className="enroll-card-img">
//                     <img
//                       src={course.image ? `${API_BASE_URL}/${course.image}` : "/default-course.jpg"}
//                       alt={course.title}
//                       className="w-100"
//                     />
//                     <i
//                       className={`fa-heart fa-solid position-absolute top-0 end-0 m-2 fs-4 cursor-pointer ${
//                         favoriteCourses.has(course._id) ? "text-danger" : "text-light"
//                       }`}
//                       onClick={() => handleHeartToggle(course._id)}
//                       style={{ cursor: "pointer" }}
//                     ></i>
//                   </div>
//                   <div className="card-e text-center">
//                     <h5 className="card-e-title">{course.title}</h5>
//                     <p className="card-e-text">{course.description}</p>
//                     <div className="ratings mb-2">
//                       {[...Array(5)].map((_, i) => {
//                         const rating = course.rating || 0;
//                         return i < Math.floor(rating) ? (
//                           <i className="fa-solid fa-star" key={i}></i>
//                         ) : (
//                           <i className="fa-regular fa-star text-muted" key={i}></i>
//                         );
//                       })}
//                     </div>
//                     {course.isEnrolled ? (
//                       <Link to={`/course-lectures/${course._id}`} className="btn btn-e mx-2 mb-2">
//                         Start
//                       </Link>
//                     ) : (
//                       <button
//                         className="btn btn-e mx-2 mb-2"
//                         onClick={() => handleEnrollClick(course._id)}
//                         disabled={enrollingCourseId === course._id}
//                       >
//                         {enrollingCourseId === course._id ? "Enrolling..." : "Enroll Now"}
//                       </button>
//                     )}
//                     <Link to={`/course-details/${course._id}`} className="btn btn-f mx-2 mb-2">
//                       Explore
//                     </Link>
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

// export default SelectedCourses;




















import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  selectedCourse,
  toggleCourseInCart,
} from "../../../../api/userApiFunctions/dashboardApis/selectedCourse";
import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./SelectedCourses.css";
import axiosInstance from "../../../../api/axiosInstance";

const SelectedCourses = () => {
  const token = localStorage.getItem("token");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["selectedCourses"],
    queryFn: () => selectedCourse(token),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [favoriteCourses, setFavoriteCourses] = useState(new Set());
  const [enrollingCourseId, setEnrollingCourseId] = useState(null); // NEW STATE

  useEffect(() => {
    if (data?.data?.data) {
      const courseIds = data.data.data.map((course) => course._id);
      setFavoriteCourses(new Set(courseIds));
    }
  }, [data]);

  const filteredCourses = useMemo(() => {
    if (!data?.data?.data) return [];
    return data.data.data.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = useMemo(
    () => Math.ceil(filteredCourses.length / itemsPerPage),
    [filteredCourses]
  );

  const paginatedCourses = useMemo(() => {
    return filteredCourses.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredCourses, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleHeartToggle = async (courseId) => {
    try {
      const response = await toggleCourseInCart(token, courseId);
      if (response?.status === 200) {
        toast.success(response.data.message);
        const updated = new Set(favoriteCourses);
        updated.has(courseId)
          ? updated.delete(courseId)
          : updated.add(courseId);
        setFavoriteCourses(updated);
        queryClient.invalidateQueries(["selectedCourses"]);
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      toast.error("Error updating cart");
    }
  };

  const handleEnrollClick = async (courseId) => {
    setEnrollingCourseId(courseId); // SET LOADING STATE
    try {
      const response = await axiosInstance.post(
        "/user/enrolledCourse",
        { courseId },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully enrolled!");
        queryClient.invalidateQueries(["selectedCourses"]);
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error(
        error.response?.data?.message || "Enrollment failed. Please try again."
      );
    } finally {
      setEnrollingCourseId(null);
    }
  };

  if (isLoading) {
    return (
      <div
        className="content-wrapper col-8 col-lg-10"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "25vh",
          backgroundColor: "#fefefe",
        }}
      >
        <PacmanLoader color="#36d7b7" size={40} />
      </div>
    );
  }

  if (isError)
    return (
      <div className="content-wrapper col-8 col-lg-10">
        Error loading courses.
      </div>
    );

  return (
    <div className="content-wrapper col-8 col-lg-10">
      <div className="enroll_header mt-2 mb-2">
        <div className="row">
          <div className="col-md-6">
            <h3>Course Catalog</h3>
            <p className="ps-2">My Selected Courses</p>
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
            paginatedCourses.map((course) => (
              <div className="col-md-6 col-lg-6 enroll_box" key={course._id}>
                <div className="enroll-card position-relative">
                  <div className="enroll-card-img">
                    <img
                      src={
                        course.image
                          ? `${API_BASE_URL}/${course.image}`
                          : "/default-course.jpg"
                      }
                      alt={course.title}
                      className="course-image"
                    />
                    <i
                      className={`fa-heart fa-solid position-absolute top-0 end-0 m-2 fs-4 cursor-pointer ${favoriteCourses.has(course._id)
                        ? "text-danger"
                        : "text-light"
                        }`}
                      onClick={() => handleHeartToggle(course._id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>

                  <div className="card-e text-center">
                    <h5 className="card-e-title">{course.title}</h5>
                    <p className="card-e-text">{course.description}</p>
                    <div className="ratings mb-2">
                      {[...Array(5)].map((_, i) => {
                        const rating = course.rating || 0;
                        return i < Math.floor(rating) ? (
                          <i className="fa-solid fa-star" key={i}></i>
                        ) : (
                          <i
                            className="fa-regular fa-star text-muted"
                            key={i}
                          ></i>
                        );
                      })}
                    </div>

                    <div className="d-flex justify-content-between align-items-center gap-4">
                      {course.isEnrolled ? (
                        <Link
                          to={`/course-lectures/${course._id}`}
                          className="btn btn-e "
                        >
                          Start
                        </Link>
                      ) : (
                        <button
                          className="btn btn-e "
                          onClick={() => handleEnrollClick(course._id)}
                          disabled={enrollingCourseId === course._id}
                        >
                          {enrollingCourseId === course._id
                            ? "Enrolling..."
                            : "Enroll Now"}
                        </button>
                      )}
                      <Link
                        to={`/course-details/${course._id}`}
                        className="btn btn-f"
                      >
                        Explore
                      </Link>
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

export default SelectedCourses;