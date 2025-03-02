// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/Protectedroutes";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import AdminDashBoard from "./pages/admin/Dashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import CoordinatorDashboard from "./pages/coordinator/Coordinator_Dashboard";
import CourseAttainment from './pages/coordinator/Attainmentinfo';
import MyCourses from './pages/faculty/MyCourses'
import AddMarks from './pages/faculty/AddMarks'
import Error from './assets/404_error.jpg'
import CoursesCoordinated from "./pages/coordinator/CoursesCoordinated";
import SetTarget from './pages/coordinator/SetTarget';
import SeeFaculty from './pages/admin/SeeFaculty';
import AddFaculty from './pages/admin/AddFaculty';
import AddCourse from './pages/admin/AddCourse';
import SeeCourses from './pages/admin/SeeCourses';
import UpdateCourses from "./pages/admin/UpdateCourse";
import UpdateFaculty from './pages/admin/UpdateFaculty';
import AddCourseAllotment from './pages/admin/AddCourseAllotment';
import SeeCourseAllotment from './pages/admin/SeeCourseAllotment';
import HelpPage from "./pages/HelpPage";
import DownloadReport from "./pages/coordinator/DownloadReport";
import SeeCourseCoordinator from './pages/admin/SeeCourseCoordinator';
import AddCourseCoordinator from './pages/admin/AddCourseCoordinator';

 
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />


      {/* 🔹 Admin Dashboard */}
      {/* Wrap in DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/admin-dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashBoard /></ProtectedRoute>} />
        <Route path="/admin-dashboard/profile" element={<ProtectedRoute roles={["admin"]}><Profile /></ProtectedRoute>} />
        <Route path="/admin/see-faculty" element={<ProtectedRoute roles={["admin"]}><SeeFaculty /></ProtectedRoute>} />
        <Route path="/admin/add-faculty" element={<ProtectedRoute roles={["admin"]}><AddFaculty /></ProtectedRoute>} />
        <Route path="/admin/update-faculty" element={<ProtectedRoute roles={["admin"]}><UpdateFaculty /></ProtectedRoute>} />
        <Route path="/admin/add-course" element={<ProtectedRoute roles={["admin"]}><AddCourse /></ProtectedRoute>} />
        <Route path="/admin/see-courses" element={<ProtectedRoute roles={["admin"]}><SeeCourses /></ProtectedRoute>} />
        <Route path="/admin/update-course" element={<ProtectedRoute roles={["admin"]}><UpdateCourses /></ProtectedRoute>} />
        <Route path="/admin/add-course-allotment" element={<ProtectedRoute roles={["admin"]}><AddCourseAllotment /></ProtectedRoute>} />
        <Route path="/admin/see-course-allotment" element={<ProtectedRoute roles={["admin"]}><SeeCourseAllotment /></ProtectedRoute>} />
        <Route path="/admin/get-course-coordinator" element={<ProtectedRoute roles={["admin"]}><SeeCourseCoordinator /></ProtectedRoute>} />
        <Route path="/admin/add-course-coordinator" element={<ProtectedRoute roles={["admin"]}><AddCourseCoordinator /></ProtectedRoute>} />
      </Route>


      {/* 🔹 Faculty Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/faculty-dashboard" element={<ProtectedRoute roles={["faculty", "coordinator", "admin"]}><FacultyDashboard /></ProtectedRoute>} />
        <Route path="/faculty-dashboard/profile" element={<ProtectedRoute roles={["faculty", "coordinator", "admin"]}><Profile /></ProtectedRoute>} />
        <Route path="/faculty-dashboard/mycourses" element={<ProtectedRoute roles={["faculty", "coordinator", "admin"]}><MyCourses /></ProtectedRoute>} />
        <Route path="/faculty-dashboard/addmarks" element={<ProtectedRoute roles={["faculty", "coordinator", "admin"]}><AddMarks /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute roles={["admin", "faculty", "coordinator"]}><HelpPage /></ProtectedRoute>} />
      </Route>

      {/* 🔹 Coordinator Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/coordinator-dashboard" element={<ProtectedRoute roles={["coordinator", "admin"]}><CoordinatorDashboard /></ProtectedRoute>} />
        <Route path="/coordinator-dashboard/mycourses" element={<ProtectedRoute roles={["coordinator", "admin"]}><CoursesCoordinated /></ProtectedRoute>} />
        <Route path="/coordinator-dashboard/attainment/:courseId/:academicYear/:dept_id" element={<ProtectedRoute roles={["coordinator", "admin"]}><CourseAttainment /></ProtectedRoute>} />
        <Route path="/coordinator-dashboard/profile" element={<ProtectedRoute roles={["coordinator", "admin"]}><Profile /></ProtectedRoute>} />
        <Route path="/coordinator-dashboard/setTarget" element={<ProtectedRoute roles={["coordinator", "admin"]}><SetTarget/></ProtectedRoute>} />
        <Route path="/coordinator-dashboard/downloadreport" element={<ProtectedRoute roles={["coordinator", "admin"]}><DownloadReport/></ProtectedRoute>} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<img src={Error} alt="404 Not Found" style={{ width: "100%", height: "100%", objectFit: "cover" }} />} />

    </Routes>
  );
};

export default AppRoutes;
