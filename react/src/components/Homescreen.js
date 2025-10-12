import React, { useState } from "react";
import "../style/Home.css";
import logo from "../pictures/logo.png";
import graduation from "../pictures/graduation.jpeg";

// Student components
import StudentAuth from "../components/StudentAuth";
import StudentDashboard from "../components/StudentDashboard";

// Lecturer components
import LecturerAuth from "../components/LecturerAuth";
import LecturerDashboard from "../components/LecturerDashboard";

// Principal Lecturer components
import PrincipalLecturerAuth from "../components/PrincipalLecturerAuth";
import PrincipalLecturerDashboard from "../components/PrincipalLecturerDashboard";

// Program Leader components
import ProgramLeaderAuth from "../components/ProgramLeaderAuth";
import ProgramLeaderDashboard from "../components/ProgramLeaderDashboard";

function Homescreen() {
  const [view, setView] = useState("home"); 
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null); 
  const [lecturer, setLecturer] = useState(null); 
  const [principalLecturer, setPrincipalLecturer] = useState(null); 
  const [programLeader, setProgramLeader] = useState(null); 

  // === STUDENT HANDLERS ===
  const handleStudentAuth = (studentData) => {
    setStudent(studentData);
    setView("student-dashboard");
  };

  const handleStudentClick = () => {
    setLoading(true);
    setTimeout(() => {
      setView("student-auth");
      setLoading(false);
    }, 600);
  };

  const handleStudentLogout = () => {
    setStudent(null);
    setView("home");
  };

  // === LECTURER HANDLERS ===
  const handleLecturerAuth = (lecturerData) => {
    setLecturer(lecturerData);
    setView("lecturer-dashboard");
  };

  const handleLecturerClick = () => {
    setLoading(true);
    setTimeout(() => {
      setView("lecturer-auth");
      setLoading(false);
    }, 600);
  };

  const handleLecturerLogout = () => {
    setLecturer(null);
    setView("home");
  };

  // PRINCIPAL LECTURER HANDLERS 
  const handlePrincipalLecturerAuth = (principalLecturerData) => {
    setPrincipalLecturer(principalLecturerData);
    setView("principal-dashboard");
  };

  const handlePrincipalLecturerClick = () => {
    setLoading(true);
    setTimeout(() => {
      setView("principal-auth");
      setLoading(false);
    }, 600);
  };

  const handlePrincipalLecturerLogout = () => {
    setPrincipalLecturer(null);
    setView("home");
  };

  // === PROGRAM LEADER HANDLERS ===
  const handleProgramLeaderAuth = (programLeaderData) => {
    setProgramLeader(programLeaderData);
    setView("program-leader-dashboard");
  };

  const handleProgramLeaderClick = () => {
    setLoading(true);
    setTimeout(() => {
      setView("program-leader-auth");
      setLoading(false);
    }, 600);
  };

  const handleProgramLeaderLogout = () => {
    setProgramLeader(null);
    setView("home");
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading portal...</p>
      </div>
    );
  }

  // Student views
  if (view === "student-auth") {
    return <StudentAuth onLogin={handleStudentAuth} />;
  }

  if (view === "student-dashboard") {
    return <StudentDashboard student={student} onLogout={handleStudentLogout} />;
  }

  // Lecturer views
  if (view === "lecturer-auth") {
    return <LecturerAuth onLogin={handleLecturerAuth} />;
  }

  if (view === "lecturer-dashboard") {
    return <LecturerDashboard lecturer={lecturer} onLogout={handleLecturerLogout} />;
  }

  // Principal Lecturer views
  if (view === "principal-auth") {
    return <PrincipalLecturerAuth onLogin={handlePrincipalLecturerAuth} />;
  }

  if (view === "principal-dashboard") {
    return <PrincipalLecturerDashboard principalLecturer={principalLecturer} onLogout={handlePrincipalLecturerLogout} />;
  }

  // Program Leader views
  if (view === "program-leader-auth") {
    return <ProgramLeaderAuth onLogin={handleProgramLeaderAuth} />;
  }

  if (view === "program-leader-dashboard") {
    return <ProgramLeaderDashboard programLeader={programLeader} onLogout={handleProgramLeaderLogout} />;
  }

  // Home screen
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="logo-wrapper">
          <img src={logo} alt="Institution Logo" className="main-logo" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Shape Your Future Through Excellence in Education
        </h1>
        <p className="hero-subtitle">
          Empowering learners, inspiring leaders, transforming communities.
        </p>
      </section>

      {/* Role Selection Cards */}
      <section className="role-section">
        <h2 className="section-title">Access Your Portal</h2>
        <div className="role-cards">
          {/* Student Card - CLICKABLE */}
          <button 
            className="role-card student" 
            onClick={handleStudentClick}
            aria-label="Student Login"
          >
            <div className="role-icon">🎓</div>
            <h3>Students</h3>
            <p>View attendance, grades, and course progress</p>
          </button>

          {/* Lecturer Card - CLICKABLE */}
          <button 
            className="role-card lecturer" 
            onClick={handleLecturerClick}
            aria-label="Lecturer Login"
          >
            <div className="role-icon">👨‍🏫</div>
            <h3>Lecturers</h3>
            <p>Manage classes, reports, and assessments</p>
          </button>

          {/* Principal Lecturer Card - CLICKABLE */}
          <button 
            className="role-card principal" 
            onClick={handlePrincipalLecturerClick}
            aria-label="Principal Lecturer Login"
          >
            <div className="role-icon">👔</div>
            <h3>Principal Lecturers</h3>
            <p>Oversee academic performance & compliance</p>
          </button>

          {/* Program Leader Card - CLICKABLE */}
          <button 
            className="role-card leader" 
            onClick={handleProgramLeaderClick}
            aria-label="Program Leader Login"
          >
            <div className="role-icon">📊</div>
            <h3>Program Leaders</h3>
            <p>Monitor curriculum and strategic outcomes</p>
          </button>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <h2 className="section-title">Upcoming School Events</h2>
        <div className="event-card">
          <img 
            src={graduation} 
            alt="Graduation Ceremony" 
            className="event-image" 
          />
          <div className="event-content">
            <h3>🎓 Graduation Ceremony</h3>
            <p>
              Join us in celebrating the achievements of our graduating students.
              A proud moment for students, lecturers, and families 🎉
            </p>
            <span className="event-date">📅 June 15, 2025 • 10:00 AM</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Academic Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homescreen;