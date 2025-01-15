import React, { useState } from "react";
import "../styles/BugList.css";

const BugList = () => {
  const [bugs, setBugs] = useState([
    { id: 1, description: "Bug 1", severity: "High", resolved: false, assignedMember: null },
    { id: 2, description: "Bug 2", severity: "Low", resolved: false, assignedMember: null },
  ]);

  const resolveBug = (bugId) => {
    alert(`Bug ${bugId} resolved.`);
  };

  const allocateBug = (bugId) => {
    alert(`Bug ${bugId} allocated to you.`);
    bugs.forEach((bug) => {
      if (bug.id === bugId) {
        bug.assignedMember = { id: 1 };
        console.log(bug);
      }
    });
  }

  return (
    <div className="bug-list">
      <div className="section">
        <h1>Bugs</h1>
        <ul>
          {bugs.map((bug) => (
            <li key={bug.id}>
              <div className="listElement">
                <div className="bullet">● &nbsp;</div>
                {bug.description} - {bug.severity} -{" "}
                {bug.resolved ? "Resolved" : "Open"} -{" "}
                {bug.assignedMember
                  ? `Assigned to User ${bug.assignedMember.id}`
                  : "Unassigned"}
              </div>
              {!bug.assignedMember && (
                <button onClick={() => allocateBug(bug.id)}>
                  Allocate to Me
                </button>
              )} 
              {!bug.resolved && (
                <ResolveBugForm
                bugId={bug.id}
                onResolve={(resolvedLink) =>
                  resolveBug(bug.id, resolvedLink)
                }
              />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ResolveBugForm = ({ bugId, onResolve }) => {
  const [resolvedLink, setResolvedLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onResolve(resolvedLink);
  };

  return (
    <form onSubmit={handleSubmit} className="resolve-bug-form">
      <input
        type="text"
        placeholder="Commit Link"
        value={resolvedLink}
        onChange={(e) => setResolvedLink(e.target.value)}
        required
      />
      <button type="submit">Resolve Bug</button>
    </form>
  );
};

export default BugList;