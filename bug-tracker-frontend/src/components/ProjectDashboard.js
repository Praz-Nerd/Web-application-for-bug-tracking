import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProjectDashboard.css";

const ProjectDashboard = () => {
  return (
    <div className="project-dashboard">
      <h1>Project Dashboard</h1>
      <Link to="/projects/1/bugs">View Bugs for Project 1</Link>
    </div>
  );
};

export default ProjectDashboard;