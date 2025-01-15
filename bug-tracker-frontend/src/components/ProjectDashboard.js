import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../utils/UseLocalStorage";
import { AuthContext } from "../context/AuthProvider";
import "../styles/ProjectDashboard.css";

const ProjectDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useLocalStorage('user', null)

  const [myProjects, setMyProjects] = useState([
    { id: 1, title: "My Project Alpha", repository: "https://repo1.com" },
  ]);
  const [testerProjects, setTesterProjects] = useState([
    { id: 2, title: "Testing Project Beta", repository: "https://repo2.com" },
  ]);
  console.log(user)
  return (
    <div className="project-dashboard">
      <div className="navigation-buttons">
        <Link to="/projects/create">
          <button>Create New Project</button>
        </Link>
        <Link to="/projects/all">
          <button>View All Projects</button>
        </Link>
        <button  onClick={logout}>Logout</button>
      </div>
      <h1>Hello, {user.username}!</h1>
      <div class="section">
        <h1>My Projects</h1>
        <ul>
          {myProjects.map((project) => (
            <li key={project.id}>
              <div class="listElement"><div class="bullet">● &nbsp;</div> {project.title} - {project.repository} </div>
                <Link to={`/projects/${project.id}/bugs`}>View Bugs</Link>
            </li>
          ))}
        </ul>
      </div>
      <div class="section">
        <h1>Testing Project</h1>
        <ul>
          {testerProjects.map((project) => (
            <li key={project.id}>
              <div class="listElement"><div class="bullet">● &nbsp;</div> {project.title} - {project.repository}</div>
              <Link to={`/projects/${project.id}/bugs/new`}>Submit Bug</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDashboard;