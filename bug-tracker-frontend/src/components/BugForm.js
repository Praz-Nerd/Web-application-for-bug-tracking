import React, { useState } from "react";
import "../styles/BugForm.css";

const BugForm = () => {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");

  const submitBug = () => {
    alert("Bug submitted successfully.");
  };

  return (
    <div className="bug-form">
      <h1>Submit a Bug</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitBug();
        }}
      >
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BugForm;