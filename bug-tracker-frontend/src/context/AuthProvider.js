import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import getResponse from "../utils/GetResponse";
import useLocalStorage from "../utils/UseLocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate();

  const login = async(email, password) => {
    let user = null
    user = await getResponse('http://localhost:8080/users/login', 'POST', JSON.stringify({email, password}))
    console.log(user)
    if (user.id) {
      setUser(user);
      //localStorage.setItem("user", JSON.stringify(user));
      navigate("/projects");
    } else {
      alert(user.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;