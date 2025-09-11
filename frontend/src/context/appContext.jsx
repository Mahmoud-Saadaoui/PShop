import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const setCredentials = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth(null);
  };

  useEffect(() => {
    if (!auth?.token) {
      setIsTokenExpired(true);
      return;
    }

    try {
      const decodedJwt = JSON.parse(atob(auth.token.split(".")[1]));
      const expired = decodedJwt.exp * 1000 < Date.now();
      setIsTokenExpired(expired);

      if (expired) {
        logout();
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  }, [auth]);
  return (
    <AppContext.Provider value={{ auth, setCredentials, isTokenExpired, logout }}>
      {children}
    </AppContext.Provider>
  );
};