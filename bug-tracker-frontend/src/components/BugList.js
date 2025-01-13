import React from "react";
import { Link } from "react-router-dom";
import "../styles/BugList.css";

const BugList = () => {
  return (
    <div className="bug-list">
      <h1>Bug List</h1>
      <Link to="/projects/1/bugs/new">Add New Bug</Link>
    </div>
  );
};

export default BugList;