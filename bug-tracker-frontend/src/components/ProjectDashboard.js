import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProjectDashboard.css";

const ProjectDashboard = () => {
  const [myProjects, setMyProjects] = useState([
    { id: 1, title: "My Project Alpha", repository: "https://repo1.com" },
  ]);
  const [testerProjects, setTesterProjects] = useState([
    { id: 2, title: "Testing Project Beta", repository: "https://repo2.com" },
  ]);

  return (
    <div className="project-dashboard">
      <div className="navigation-buttons">
        <Link to="/projects/create">
          <button>Create New Project</button>
        </Link>
        <Link to="/projects/all">
          <button>View All Projects</button>
        </Link>
      </div>
      <h1>My Projects</h1>
      <ul>
        {myProjects.map((project) => (
          <li key={project.id}>
            {project.title} - {project.repository}
            <Link to={`/projects/${project.id}/bugs`}>View Bugs</Link>
          </li>
        ))}
      </ul>

      <h1>Projects I Test</h1>
      <ul>
        {testerProjects.map((project) => (
          <li key={project.id}>
            {project.title} - {project.repository}
            <Link to={`/projects/${project.id}/bugs/new`}>Submit Bug</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDashboard;