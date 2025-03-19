import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

const CalculateAttainment = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve user details
  const { user } = storedUser;
  const { id: facultyId } = user; // Extract facultyId from user

  // Fetch courses assigned to the coordinator
  useEffect(() => {
    console.log("Fetching courses for faculty ID:", facultyId);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.accessToken;

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    axios
      .get(
        `https://teacher-attainment-system-backend.onrender.com/attainment/coordinator-courses?faculty_id=${facultyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Full API Response:", response);
        console.log("Courses Data:", response.data);

        if (!response.data || response.data.length === 0) {
          console.error("Warning: No courses found!");
        } else if (!response.data[0].course_name) {
          console.error("Warning: course_name missing in API response!");
        }

        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error.response ? error.response.data : error.message);
      });
  }, [facultyId]);

  const handleViewAttainment = (courseId, academicYear, deptId) => {
    console.log(
      "Navigating to Attainment with courseId:",
      courseId,
      "and academicYear:",
      academicYear
    );
    navigate(`/coordinator-dashboard/showmarks/${courseId}/${academicYear}/${deptId}`);
  };

  // Filter Courses based on Search Term, Academic Year, and Semester
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? course.academic_yr === selectedYear : true;
    const matchesSem = selectedSem ? course.sem === selectedSem : true;
    return matchesSearch && matchesYear && matchesSem;
  });

  // Extract unique academic years and semesters for the dropdowns
  const uniqueYears = [...new Set(courses.map((course) => course.academic_yr))];
  const uniqueSems = [...new Set(courses.map((course) => course.sem))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        My Courses
      </h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <InputGroup className="w-50">
          <FormControl
            placeholder="Search by Course Name or ID"
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </div>

      {/* Filter UI */}
      <div className="d-flex justify-content-center mb-4">
        <Form.Select
          className="w-25 mx-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Academic Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="w-25 mx-2"
          value={selectedSem}
          onChange={(e) => setSelectedSem(e.target.value)}
        >
          <option value="">Select Semester</option>
          {uniqueSems.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </Form.Select>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-muted text-center">No courses match your criteria.</p>
      ) : (
        <div className="row justify-content-center">
          {filteredCourses.map((course) => (
            <div
              key={course.course_id}
              className="col-md-6 mb-4"
            >
              <div
                className="card shadow-sm"
                style={{
                  minHeight: "300px",
                  padding: "15px",
                }}
              >
                <div className="card-body p-3">
                  <h5
                    className="card-title text-primary mb-2"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    Course Details
                  </h5>
                  <p className="card-text">
                    <strong>Course Name:</strong> {course.course_name}
                  </p>
                  <p className="card-text">
                    <strong>Course ID:</strong> {course.course_id}
                  </p>
                  <p className="card-text">
                    <strong>Class:</strong> {course.class}
                  </p>
                  <p className="card-text">
                    <strong>Semester:</strong> {course.sem}
                  </p>
                  <p className="card-text">
                    <strong>Department:</strong> {course.dept_name} |{" "}
                    <strong>Academic Year:</strong> {course.academic_yr}
                  </p>

                  <button
                    onClick={() =>
                      handleViewAttainment(course.course_id, course.academic_yr, course.dept_id)
                    }
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    View Attainment
                  </button>
                  <button className="btn btn-outline-secondary w-100">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalculateAttainment;
