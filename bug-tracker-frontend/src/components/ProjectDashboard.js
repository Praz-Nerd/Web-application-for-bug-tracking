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
  const [contributors, setContributors] = useState([
    { id: 3, username: "contributor1" },
    { id: 4, username: "contributor2" },
  ]);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [repository, setRepository] = useState("");
  const [selectedContributors, setSelectedContributors] = useState([]);

  const createProject = () => {
    alert("Project created successfully.");
  };

  return (
    <div className="project-dashboard">
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

      <div className="navigation-buttons">
        <Link to="/projects/all">
          <button>View All Projects</button>
        </Link>
      </div>

      <h1>Create New Project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProject();
        }}
      >
        <input
          type="text"
          placeholder="Project Title"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Repository"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
        />
        <select
          multiple
          value={selectedContributors}
          onChange={(e) =>
            setSelectedContributors(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {contributors.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectDashboard;