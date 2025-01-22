import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditProject.css";
import getResponse from "../utils/GetResponse";
import useLocalStorage from "../utils/UseLocalStorage";

const EditProject = () => {
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [repository, setRepository] = useState("");
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const project = await getResponse(
          `http://localhost:8080/projects/${projectId}`,
          "GET"
        );
        setTitle(project.title);
        setRepository(project.repository);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [])

  const updateProject = async () => {
      const project = await getResponse(`http://localhost:8080/users/${user.id}/projects/${projectId}`, 'PUT', JSON.stringify({
        title: title,
        repository: repository
      }))
      alert("Project updated successfully!");
      navigate("/projects");
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
