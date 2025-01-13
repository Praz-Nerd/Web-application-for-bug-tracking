import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProjectDashboard from "./components/ProjectDashboard";
import BugList from "./components/BugList";
import BugForm from "./components/BugForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/bugs"
          element={
            <ProtectedRoute>
              <BugList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/bugs/new"
          element={
            <ProtectedRoute>
              <BugForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
