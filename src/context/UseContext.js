import React, { useState } from "react";
const UserContext = React.createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ email: "", auth: false });

  // Login updates the user data with a name parameter
  const login = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("tokenLogin", token);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    localStorage.removeItem("tokenLogin");
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
