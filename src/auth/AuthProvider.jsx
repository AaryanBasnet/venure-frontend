import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    console.log(userData)
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setLoading(false);
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
    console.log(token, storedUser);

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        // If parsing fails, the stored data is corrupt. It's best to log out.
        logout();
      }
    } else {
      // If there's no token or user, ensure they are logged out.
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
