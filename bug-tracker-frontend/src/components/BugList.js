import React, { useState } from "react";
import "../styles/BugList.css";

const BugList = () => {
  const [bugs, setBugs] = useState([
    { id: 1, description: "Bug 1", severity: "High", resolved: false },
    { id: 2, description: "Bug 2", severity: "Low", resolved: true },
  ]);

  const resolveBug = (bugId) => {
    alert(`Bug ${bugId} resolved.`);
  };

  return (
    <div className="bug-list">
      <div class="section">
        <h1>Bugs</h1>
        <ul>
          {bugs.map((bug) => (
            <li key={bug.id}>
              <div class="listElement"><div class="bullet">● &nbsp;</div> {bug.description} - {bug.severity} - {bug.resolved ? "Resolved" : "Open"} </div>
              {!bug.resolved && (
                <button onClick={() => resolveBug(bug.id)}>Resolve</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BugList;