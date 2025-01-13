import React, { useState } from "react";
import "../styles/BugForm.css";

const BugForm = () => {
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [commitLink, setCommitLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ severity, description, commitLink });
  };

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <label>
        Severity:
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Commit Link:
        <input
          type="url"
          value={commitLink}
          onChange={(e) => setCommitLink(e.target.value)}
        />
      </label>
      <button type="submit">Submit Bug</button>
    </form>
  );
};

export default BugForm;