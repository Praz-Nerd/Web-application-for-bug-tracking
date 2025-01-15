import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProject.css";

const EditProject = () => {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [repository, setRepository] = useState("");
  const navigate = useNavigate();

  const updateProject = () => {
      alert("Project updated successfully!");
      navigate("/projects"); // Redirect to dashboard after saving
  };

  return (
    <div className="edit-project">
      <h1>Edit Project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProject();
        }}
      >
        <input
          type="text"
          value={title}
          placeholder="Project Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          value={repository}
          placeholder="Repository Link"
          onChange={(e) => setRepository(e.target.value)}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
