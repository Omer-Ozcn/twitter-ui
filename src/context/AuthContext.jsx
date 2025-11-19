import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const storedUser = localStorage.getItem("tw_user_data");
    const storedAuth = localStorage.getItem("tw_auth");

    if (storedUser && storedAuth) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      // 1. Backend doğrulaması
      await api.post("/auth/login", { username, password });

      // 2. Basic Auth Header oluştur ve sakla
      const authHeader = "Basic " + btoa(`${username}:${password}`);
      localStorage.setItem("tw_auth", JSON.stringify({ username, authHeader }));

      // 3. Kullanıcı detaylarını çek (/users/me)
      const res = await api.get("/users/me");
      const userData = res.data;
      
      localStorage.setItem("tw_user_data", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("tw_auth");
    localStorage.removeItem("tw_user_data");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);