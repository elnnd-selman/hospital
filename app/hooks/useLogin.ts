"use client";
import { useState, useEffect } from "react";

const useLogin = () => {
  // Initialize the user state with data from localStorage if available
  const [user, setUser] = useState<any>(null);

  // A function to log in a user and store their data in localStorage
  const login = (userData: any) => {

    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // A function to log out a user and remove their data from localStorage
  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Check if a user is already logged in when the component mounts
    const userFromLocalStorage = window.localStorage.getItem("user");

    if (
      userFromLocalStorage != undefined &&
      userFromLocalStorage != "undefined"
    ) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return {
    user,
    login,
    logout,
  };
};

export default useLogin;
