import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

// Cookie options — secure only in production, not on localhost
const cookieOptions = {
  expires: 7,
  secure: window.location.protocol === "https:",  // true in prod, false on localhost
  sameSite: "Strict",
};

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      const saved = Cookies.get("user");           // read the cookie string
      return saved ? JSON.parse(saved) : null;     // parse it back to an object
    } catch {
      // if cookie is corrupted for any reason, wipe and start fresh
      Cookies.remove("token");
      Cookies.remove("user");
      return null;
    }
  });

  const login = (userData, token) => {
    // userData is an object — must stringify before storing in a cookie
    Cookies.set("token", token, cookieOptions);
    Cookies.set("user", JSON.stringify(userData), cookieOptions);  // ← stringify
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token", cookieOptions);
    Cookies.remove("user", cookieOptions);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}