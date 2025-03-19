import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const ReportAnalysis = () => {
  const [allottedCourses, setAllottedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllottedCourses = async () => {
      setLoading(true);
      setError("");

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.accessToken;

      if (!token) {
        setError("Unauthorized: Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://teacher-attainment-system-backend.onrender.com/admin/allotment/get-allotted-courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data?.data.length > 0) {
          setAllottedCourses(response.data.data);
        } else {
          setError("No course allotments found.");
        }
      } catch (err) {
        setError("Failed to fetch course allotments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllottedCourses();
  }, []);

  const uniqueYears = [
    ...new Set(allottedCourses.map((course) => course.academic_yr)),
  ];
  const uniqueSems = [...new Set(allottedCourses.map((course) => course.sem))];

  const filteredCourses = allottedCourses.filter((course) => {
    return (
      (searchTerm === "" ||
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.course_id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedYear === "" || course.academic_yr === selectedYear) &&
      (selectedSem === "" || course.sem === selectedSem)
    );
  });

  const handleViewAnalysis = (course_id, academic_yr) => {
    navigate(`/admin/attainment-analysis/${course_id}/${academic_yr}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">📚 Courses for Report and Analysis</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <InputGroup className="w-50">
          <FormControl
            placeholder="Search by Course Name or ID"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">Search</Button>
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

      {/* Loading State */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredCourses.length === 0 ? (
        <p className="text-muted text-center">
          No courses match your criteria.
        </p>
      ) : (
        <Row className="g-4">
          {filteredCourses.map((course) => (
            <Col md={6} lg={4} key={course.course_id}>
              <Card className="shadow-lg p-3 h-100 d-flex flex-column">
                <Card.Body className="flex-grow-1">
                  <h5 className="text-primary font-weight-bold mb-2">
                    {course.course_name}
                  </h5>
                  <hr />
                  <Card.Text>
                    <strong>Course ID:</strong> {course.course_id} <br />
                    <strong>Course Name:</strong> {course.course_name} <br />
                    <strong>Faculty ID:</strong> {course.faculty_id} <br />
                    <strong>Faculty Name:</strong> {course.faculty_name} <br />
                    <strong>Class:</strong> {course.class} <br />
                    <strong>Semester:</strong> {course.sem} <br />
                    <strong>Academic Year:</strong> {course.academic_yr}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() =>
                      handleViewAnalysis(course.course_id, course.academic_yr)
                    }
                  >
                    View Analysis
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ReportAnalysis;
