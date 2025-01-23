import React, { useState, useEffect } from "react";
import "../styles/BugList.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getResponse from "../utils/GetResponse";
import useLocalStorage from "../utils/UseLocalStorage";

const BugList = () => {
  const [user, setUser] = useLocalStorage('user', null)
  const [members, setMembers] = useState([])
  const navigate = useNavigate();
  const {projectId} = useParams()
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bugsJson = await getResponse(`http://localhost:8080/projects/${projectId}/bugs`, 'GET')
        setBugs(bugsJson)
        for(let bug of bugsJson){
          if(bug.memberId){
            const member = await getResponse(`http://localhost:8080/users/${bug.memberId}`, 'GET')
            setMembers(prevMembers => [...prevMembers, member])
          }
        }
      } catch (err) {
        alert(err)
      }
    };
    fetchData();
  },[])

  const resolveBug = async (bugId, resolvedLink) => {
    const resolveBug = await getResponse(`http://localhost:8080/users/${user.id}/resolve-bug/${bugId}`, 'PUT', JSON.stringify({
      resolvedLink: resolvedLink
    }))
    alert(`Bug resolved.`);
    window.location.reload();
  };

  const allocateBug = async (bugId) => {
    const allocateBug = await getResponse(`http://localhost:8080/users/${user.id}/projects/${projectId}/assign-bug/${bugId}`, 'PUT')
    alert(`Bug allocated to you.`);
    window.location.reload();
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
                {bug.resolved ? `Resolved - ${bug.resolvedLink}` : `Open: ${bug.commit}`} -{" "}
                {bug.memberId
                  ? `Assigned to User ${members.find(member => member.id === bug.memberId)?.username || 'Unknown'}`
                  : "Unassigned"}
              </div>
              {!bug.memberId && (
                <button onClick={() => allocateBug(bug.id)}>
                  Allocate to Me
                </button>
              )} 
              {!bug.resolved && bug.memberId===user.id && (
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