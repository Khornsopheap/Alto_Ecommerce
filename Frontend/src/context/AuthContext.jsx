import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) { setLoading(false); return; }
    api.get("/user")
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("auth_token"))
      .finally(() => setLoading(false));
  }, []);

  async function register({ name, email, password, password_confirmation }) {
    const res = await api.post("/register", { name, email, password, password_confirmation });
    localStorage.setItem("auth_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }

  async function login({ email, password }) {
    const res = await api.post("/login", { email, password });
    localStorage.setItem("auth_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  }

  async function logout() {
    try { await api.post("/logout"); }
    finally { localStorage.removeItem("auth_token"); setUser(null); }
  }

  const value = { user, loading, isLoggedIn: !!user, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}