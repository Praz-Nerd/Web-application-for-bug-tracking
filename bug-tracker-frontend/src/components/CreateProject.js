import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateProject.css";

const CreateProject = () => {
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [repository, setRepository] = useState("");
  const [contributors, setContributors] = useState([
    { id: 3, username: "contributor1" },
    { id: 4, username: "contributor2" },
  ]);
  const [selectedContributors, setSelectedContributors] = useState([]);
  const navigate = useNavigate();

  const createProject = () => {
    alert("Project created successfully.");
    navigate("/projects");
  };

  return (
    <div className="create-project">
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

export default CreateProject;