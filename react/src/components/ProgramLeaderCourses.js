// src/components/ProgramLeaderCourses.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ Setup global axios baseURL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true; // important for CORS & cookies

function ProgramLeaderCourses({ programLeaderId }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    faculty_id: programLeaderId, // assuming programLeaderId maps to faculty_id
    course_name: "",
    course_code: "",
    credits: 3,
    semester: "Fall 2025",
  });

  // ✅ Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("❌ Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Handle input change (works for add & edit)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCourse) {
      setEditingCourse((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewCourse((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Add new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/courses", {
        faculty_id: newCourse.faculty_id,
        course_name: newCourse.course_name,
        course_code: newCourse.course_code,
        credits: parseInt(newCourse.credits, 10),
        semester: newCourse.semester,
      });

      setCourses([...courses, { course_id: data.courseId, ...newCourse }]);
      setNewCourse({
        faculty_id: programLeaderId,
        course_name: "",
        course_code: "",
        credits: 3,
        semester: "Fall 2025",
      });

      alert("✅ Course added successfully!");
    } catch (err) {
      console.error("❌ Error adding course:", err);
      alert("❌ Failed to add course. Please check your input and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Start editing a course
  const handleEditClick = (course) => {
    setEditingCourse({ ...course });
  };

  // ✅ Save edited course
  const handleSaveEdit = async () => {
    if (!editingCourse) return;
    setIsSubmitting(true);

    try {
      await axios.put(`/api/courses/${editingCourse.course_id}`, {
        faculty_id: editingCourse.faculty_id,
        course_name: editingCourse.course_name,
        course_code: editingCourse.course_code,
        credits: parseInt(editingCourse.credits, 10),
        semester: editingCourse.semester,
      });

      setCourses((prev) =>
        prev.map((c) => (c.course_id === editingCourse.course_id ? editingCourse : c))
      );

      setEditingCourse(null);
      alert("✅ Course updated successfully!");
    } catch (err) {
      console.error("❌ Error updating course:", err);
      alert("❌ Failed to update course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Delete a course
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.course_id !== id));
      alert("🗑️ Course deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting course:", err);
      alert("❌ Failed to delete course.");
    }
  };

  const handleCancelEdit = () => setEditingCourse(null);

  // =============================
  // ✅ Render Section
  // =============================
  if (loading) return <div className="dashboard-card">Loading courses...</div>;
  if (error) return <div className="dashboard-card error">{error}</div>;

  return (
    <div className="dashboard-card">
      <h2>📚 Course Management</h2>

      {/* Add New Course */}
      {!editingCourse && (
        <form onSubmit={handleAddCourse} className="dashboard-card">
          <h3>Add New Course</h3>
          <div className="form-grid">
            <input
              type="text"
              name="course_name"
              placeholder="Course Name"
              value={newCourse.course_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="course_code"
              placeholder="Course Code"
              value={newCourse.course_code}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={newCourse.credits}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
            />
            <select
              name="semester"
              value={newCourse.semester}
              onChange={handleInputChange}
              required
              className="form-select"
            >
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2026">Spring 2026</option>
              <option value="Summer 2026">Summer 2026</option>
            </select>
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Course"}
          </button>
        </form>
      )}

      {/* List Existing Courses */}
      <h3>Existing Courses</h3>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        courses.map((course) => (
          <div key={course.course_id} className="course-item">
            {editingCourse && editingCourse.course_id === course.course_id ? (
              // Edit Mode
              <div className="edit-form">
                <input
                  type="text"
                  name="course_name"
                  value={editingCourse.course_name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="course_code"
                  value={editingCourse.course_code}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="credits"
                  value={editingCourse.credits}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                />
                <select
                  name="semester"
                  value={editingCourse.semester}
                  onChange={handleInputChange}
                >
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                  <option value="Summer 2026">Summer 2026</option>
                </select>
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={handleSaveEdit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                  <button className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <h3>
                  {course.course_name} ({course.course_code})
                </h3>
                <p>
                  <strong>Credits:</strong> {course.credits} •{" "}
                  <strong>Semester:</strong> {course.semester}
                </p>
                <div className="course-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCourse(course.course_id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProgramLeaderCourses;
