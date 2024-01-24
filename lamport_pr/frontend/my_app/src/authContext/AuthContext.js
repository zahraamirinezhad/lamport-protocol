import { React, createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const getAccessToken = () => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log(tokens);
      return { tokens };
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
