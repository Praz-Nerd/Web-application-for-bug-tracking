import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateProject.css";
import getResponse from "../utils/GetResponse";
import useLocalStorage from "../utils/UseLocalStorage";

const CreateProject = () => {
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [repository, setRepository] = useState("");
  const [contributors, setContributors] = useState([]);
  const [selectedContributors, setSelectedContributors] = useState([]);
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate();

  // fetch all users to add to project
  useEffect(() => {
      const fetchData = async () => {
        try {
          let contributorsJson = await getResponse(
            "http://localhost:8080/users",
            "GET"
          );
          contributorsJson = contributorsJson.filter((contributor) => contributor.id !== user.id);
          setContributors(contributorsJson);
        } catch (err) {
          alert(err);
        }
      }
      fetchData();
    }, []);

  const createProject = async () => {
    if(newProjectTitle && repository){
      let project = await getResponse(`http://localhost:8080/users/${user.id}/projects`, 'POST', JSON.stringify({
        title: newProjectTitle,
        repository: repository
      }))
  
      for (let contributor of selectedContributors) {
        await getResponse(`http://localhost:8080/users/${user.id}/projects/${project.id}/add-member`, 'POST', JSON.stringify({participantId: parseInt(contributor)}))
      }
  
      alert("Project created successfully.");
      navigate("/projects");
    }
    else{
      alert("Incomplete fields...")
    }
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
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 35) {
              setNewProjectTitle(value);
            } else {
              alert("Project Title cannot exceed 50 characters.");
            }
          }}
        />
        <input
          type="text"
          placeholder="Repository"
          value={repository}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 35) {
              setRepository(e.target.value)
            } else {
              alert("Project Repository name cannot exceed 50 characters.");
            }
          }}
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