/** @format */

import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../services/authServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );

  async function getLoggedUserData() {
    const response = await getUserDataApi();
    if (response.message) {
      setUserData(response.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getLoggedUserData();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
