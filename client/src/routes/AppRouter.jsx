import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../pages/user/forgotPassword/ForgotPassword";
import Home from "../pages/user/Home/Home";
import UpdatePassword from "../pages/user/updatePassword/UpdatePassword";
import Login from "../pages/user/userAuth/login/Login";
import Register from "../pages/user/userAuth/register/Register";
import VerifyEmail from "../pages/user/userAuth/verifyEmail/VerifyEmail";
import UpdateUser from "../pages/user/userPages/updateUser/UpdateUser";
import UserChangePassword from "../pages/user/userPages/userChangePassword/UserChangePassword";
import UserDashboard from "../pages/user/userPages/userDashboard/UserDashboard";
import VerifyOtp from "../pages/user/verifyOtp/VerifyOtp";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/user/userPages/userDashboard/DashboardHome";
import EnrolledCourses from "../pages/user/userPages/userDashboard/EnrolledCourses";
import SelectedCourses from "../pages/user/userPages/userDashboard/SelectedCourses";
import QuizPerformance from "../pages/user/userPages/userDashboard/QuizPerformance";
import PopularCourses from "../components/homeComponent/popularCourses/PopularCourses";
import CoursesByCategory from "../components/homeComponent/PopularTopic/CoursesByCategory";
import Coursesall from '../pages/CousesPage/Coursesall'
import CourseDetails from "../pages/courseDetails/CourseDetails"; 
import Lectures from "../pages/lectures/lectures";
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs'
import Quizzes from "../pages/quizzes/Quizzes";
import UserCertificates from "../pages/user/userPages/userDashboard/UserCertificates";
import AdminDashboard from "../pages/Admin/pages/AdminDashbordPage/AdminDashbord";
import AdminHome from "../pages/Admin/pages/AdminHome/AdminHome";
import ManageAllUsers from "../pages/Admin/pages/ManageAllUsers/ManageAllUsers";
import AddCourse from "../pages/Admin/pages/AddCoursesPage/AddCourses";
import AddLessons from "../pages/Admin/pages/AddLessons/AddLessons";
import AddQuizesPage from "../pages/Admin/pages/AddQuizesPage/AddQuizesPage";
import AllCoursesPage from "../pages/Admin/pages/AllCoursesPage/AllCoursesPage";
import EditCourse from "../pages/Admin/pages/EditCourses/EditCourse";
import ManagaeComments from "../pages/Admin/pages/ManageComments/ManagaeComments";
import AddQustions from "../pages/Admin/pages/AddQuizesPage/AddQustions";
//import RequireAdmin from "./RequireAdmin";
import AdminRoute from "../../src/pages/Admin/components/AdminRoute"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/user-dashboard",
    element: <PrivateRoute><UserDashboard /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <PrivateRoute><DashboardHome /></PrivateRoute>
      },
      {
        path: "enrolled-courses",
        element: <PrivateRoute><EnrolledCourses /></PrivateRoute>
      },
      {
        path: "selected-courses",
        element: <PrivateRoute><SelectedCourses /></PrivateRoute>
      },
      {
        path: "quiz-performance",
        element: <PrivateRoute><QuizPerformance /></PrivateRoute>
      },
        {
        path: "certificates",
        element: <PrivateRoute><UserCertificates/></PrivateRoute>
      }
    ]
  },
  {
    path: "/update-user",
    element: <PrivateRoute><UpdateUser /></PrivateRoute>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/verify-otp/:email",
    element: <VerifyOtp />
  },
  {
    path: "/update-password/:email",
    element: <UpdatePassword />
  },
  {
    path: "/user-change-password",
    element: <PrivateRoute><UserChangePassword /></PrivateRoute>
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />

  },
  {
    path: "/popular-courses",
    element: <PopularCourses />,
  },
  {
    path: "/category/:categoryName",
    element: <CoursesByCategory />,
  },
  {
    path: "/courses",
    element: <Coursesall />
  },
  {
    path: "/course-details/:id",
    element: <CourseDetails />
  },
  {
    path: "/course-lectures/:id",
    element: <PrivateRoute><Lectures /></PrivateRoute>
  },
  {
     path: "/course-quizzes/:id",
    element: <PrivateRoute><Quizzes/></PrivateRoute>
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/contact",
    element: <ContactUs />
  },
  {
    path: "*",
    element: <NotFound />
  },
  // {
  //   path: "/admindashboard",
  //   element: <AdminDashboard />
  // }


//   {
//   path: "/admindashboard",
//   element: <AdminDashboard />,
//   children: [
//     {
//       path: "",
//       element: <AdminHome />
//     },
//     {
//       path: "manageallusers",
//       element: <ManageAllUsers />
//     },
//     {
//       path:"add-lesson/:courseId",
//       element: <AddLessons/>
//     },
//     {
//       path:"add-quiz",
//       element: <AddQuizesPage/>
//     },
//     {
//       path:"addqustions/:quizId",
//       element: <AddQustions/>
//     },
   
//     {
//       path: "addcourse",
//       element: <AddCourse />
//     },
//     {
//       path: "editcourse/:id",
//       element: <EditCourse/>
//     },
//     {
//       path:"allcourses",
//       element: <AllCoursesPage/>
//     },{
//       path:"managecomments",
//       element: <ManagaeComments/>
//     }
    
    
//   ]
// }

{
  path: "/admindashboard",
  element: <AdminRoute />, // ⛔ Only admin users can pass through here
  children: [
    {
      path: "",
      element: <AdminDashboard />,
      children: [
        { path: "", element: <AdminHome /> },
        { path: "manageallusers", element: <ManageAllUsers /> },
        { path: "add-lesson/:courseId", element: <AddLessons /> },
        { path: "add-quiz", element: <AddQuizesPage /> },
        { path: "addqustions/:quizId", element: <AddQustions /> },
        { path: "addcourse", element: <AddCourse /> },
        { path: "editcourse/:id", element: <EditCourse /> },
        { path: "allcourses", element: <AllCoursesPage /> },
        { path: "managecomments", element: <ManagaeComments /> }
      ]
    }
  ]
}


]);
export default appRouter;