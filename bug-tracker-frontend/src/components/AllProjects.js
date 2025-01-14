import React, { useState, useEffect } from "react";
import "../styles/AllProjects.css";

const AllProjects = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: "Project Alpha", repository: "https://repo1.com" },
    { id: 2, title: "Project Beta", repository: "https://repo2.com" },
  ]);

  const becomeTester = (projectId) => {
    alert(`You are now a tester for project ${projectId}`);
  };

  return (
    <div className="all-projects">
      <h1>All Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.title} - {project.repository}
            <button onClick={() => becomeTester(project.id)}>Become Tester</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProjects;