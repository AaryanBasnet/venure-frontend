import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    return new Promise((resolve) => {
      setLoading(true);

      const normalizedUser = {
        ...userData,
        _id: userData._id || userData.id,
        role: userData.role,
      };

      localStorage.setItem("user", JSON.stringify(normalizedUser));
      localStorage.setItem("token", token);
      setUser(normalizedUser);
      setLoading(false);
      resolve(); 
    });
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const normalizedUser = {
          ...parsedUser,
          _id: parsedUser._id || parsedUser.id,
          role: parsedUser.role,
        };
        setUser(normalizedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        logout();
      }
    } else {
      logout();
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: user !== null }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
