import React, { useState } from "react";
import "../styles/BugForm.css";

const BugForm = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [commitLink, setCommitLink] = useState("");

  const submitBug = () => {
    alert("Bug submitted successfully.");
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
          type="url"
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