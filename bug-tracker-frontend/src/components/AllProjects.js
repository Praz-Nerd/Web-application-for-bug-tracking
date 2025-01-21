import React, { useState, useEffect } from "react";
import "../styles/AllProjects.css";
import getResponse from "../utils/GetResponse";
import useLocalStorage from "../utils/UseLocalStorage";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate();

  useEffect(() => {
        const fetchData = async () => {
          try {
            const projectsJson = await getResponse(
              "http://localhost:8080/projects",
              "GET"
            );

            const testerProjectsJson = await getResponse(
              `http://localhost:8080/users/${user.id}/projects/tester`,
              "GET"
            )
            const memberProjectsJson = await getResponse(
              `http://localhost:8080/users/${user.id}/projects/member`,
              "GET"
            )
            console.log(testerProjectsJson);
            let projects = projectsJson.filter((project) => {
              for (let testerProject of testerProjectsJson) {
                if (testerProject.id === project.id) {
                  return false;
                }
              }
              for (let memberProject of memberProjectsJson) {
                if (memberProject.id === project.id) {
                  return false;
                }
              }
              return true;
            })
            setProjects(projects);
          } catch (err) {
            alert(err);
          }
        }
        fetchData();
      }, []);

  const becomeTester = async (projectId) => {
    let result = await getResponse(`http://localhost:8080/users/${user.id}/become-tester/${projectId}`, 'POST')
    navigate("/projects");
    alert(`You are now a tester for project ${projectId}`);
  };

  return (
    <div className="all-projects">
      <div class="section">
        <h1>All Projects</h1>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <div class="listElement"><div class="bullet">● &nbsp;</div> {project.title} - {project.repository}</div>
              <button onClick={() => becomeTester(project.id)}>Become Tester</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllProjects;