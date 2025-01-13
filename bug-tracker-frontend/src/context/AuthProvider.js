import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ role: localStorage.getItem("role") });
    }
  }, []);

  const login = (email, password) => {
    // Replace with real API call
    const fakeApiResponse = { token: "fakeToken", role: "PM" };
    localStorage.setItem("token", fakeApiResponse.token);
    localStorage.setItem("role", fakeApiResponse.role);
    setUser({ role: fakeApiResponse.role });
    navigate("/projects");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;