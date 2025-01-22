import React, { useState, useEffect } from "react";
import "../styles/BugForm.css";
import { useNavigate } from "react-router-dom";
import getResponse from "../utils/GetResponse";
import useLocalStorage from "../utils/UseLocalStorage";
import { useParams } from "react-router-dom";

const BugForm = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [commitLink, setCommitLink] = useState("");
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate();
  const {projectId} = useParams()

  const submitBug = async () => {
    if(description&&severity&&commitLink){
      const createBug = await getResponse(`http://localhost:8080/users/${user.id}/projects/${projectId}/add-bug`, 'POST', JSON.stringify({
        severity: severity.toUpperCase(),
        description: description,
        commit: commitLink
      }))
      alert("Bug submitted successfully.");
      navigate(`/projects`)
    }
    
  };

  return (
    <div className="bug-form">
      <h1>Register a Bug</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitBug();
        }}
      >
        <textarea
          placeholder="Bug Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          placeholder="Commit Link"
          value={commitLink}
          onChange={(e) => setCommitLink(e.target.value)}
          required
        />
        <button type="submit">Submit Bug</button>
      </form>
    </div>
  );
};

export default BugForm;