import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./config";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const [notiLoading, setnotiLoading] = useState(false);

  const [allNotifications, setallNotifications] = useState([]);

  const [isAuthenticated, setisAuthenticated] = useState(false);

  const SignIn = async (email, password) => {
    console.log("Signing in", BASE_URL, email, password);
    setloading(true);
    try {
      await axios
        .post(`${BASE_URL}/api/user/login`, {
          email: email.toLowerCase(),
          password: password,
        })
        .then((res) => {
          setUserData(res.data.user);
          setisAuthenticated(true);
          AsyncStorage.setItem("userId", JSON.stringify(res.data.user.id));
          console.log(res.data.user.id, "id");
          setError("");
          console.log(res.data.user);
        })
        .catch((error) => {
          setError(error.response.data.message);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setloading(false);
  };

  const SignUp = async (email, password, firstName, lastName, age, mobile) => {
    console.log("Signing up", BASE_URL, email, password);
    setloading(true);
    setError("");
    try {
      await axios
        .post(`${BASE_URL}/api/user/signup`, {
          user: {
            email: email.toLowerCase(),
            password: password,
            firstName: firstName,
            lastName: lastName,
            age: age,
            mobile: mobile,
          },
        })
        .then((res) => {
          setloading(false);
          setUserData(res.data.user);
          setisAuthenticated(true);
          AsyncStorage.setItem("userId", JSON.stringify(res.data.user.id));
          setError("");
          console.log(res.data.user);
        })
        .catch((error) => {
          setloading(false);
          setError(error.response.data.message);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setloading(false);
      setError(error.response.data.message);
    }
    setloading(false);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        SignIn,
        SignUp,
        loading,
        error,
        setisAuthenticated,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
