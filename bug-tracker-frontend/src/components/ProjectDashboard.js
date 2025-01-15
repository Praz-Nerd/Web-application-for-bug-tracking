import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../utils/UseLocalStorage";
import { AuthContext } from "../context/AuthProvider";
import "../styles/ProjectDashboard.css";
import getResponse from "../utils/GetResponse";


const ProjectDashboard = () => {
  const [myProjects, setMyProjects] = useState([])
  const [testerProjects, setTesterProjects] = useState([])
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useLocalStorage('user', null)
  //fetching projects for which it is member
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myProjectsJson = await getResponse(`http://localhost:8080/users/${user.id}/projects/member`, 'GET')
        setMyProjects(myProjectsJson)
      } catch (err) {
        alert(err)
      }
    };
    fetchData();
  }, []);

  //fetching projects fot which it is tester
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myProjectsJson = await getResponse(`http://localhost:8080/users/${user.id}/projects/tester`, 'GET')
        setTesterProjects(myProjectsJson)
      } catch (err) {
        alert(err)
      }
    };
    fetchData();
  }, []);

  
  //const myProjects = getResponse(`http://localhost:8080/users/${user.id}/projects/member`, 'GET')

  //console.log(user)
  return (
    <div className="project-dashboard">
      <div className="navigation-buttons">
        <Link to="/projects/create">
          <button>Create New Project</button>
        </Link>
        <Link to="/projects/all">
          <button>View All Projects</button>
        </Link>
        <button  onClick={logout}>Logout</button>
      </div>
      <h1>Hello, {user.username}!</h1>
      <div className="section">
        <h1>My Projects</h1>
        <ul>
          {myProjects.map((project) => (
            <li key={project.id}>
              <div className="listElement"><div className="bullet">● &nbsp;</div> {project.title} - {project.repository} </div>
                <Link to={`/projects/${project.id}/bugs`}>View Bugs</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h1>Testing Project</h1>
        <ul>
          {testerProjects.map((project) => (
            <li key={project.id}>
              <div className="listElement"><div className="bullet">● &nbsp;</div> {project.title} - {project.repository}</div>
              <Link to={`/projects/${project.id}/bugs/new`}>Submit Bug</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDashboard;