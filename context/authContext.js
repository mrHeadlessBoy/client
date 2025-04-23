import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {
  //global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //default axios setting
  axios.defaults.baseURL = "http://172.25.176.1:8088/api/v1";
  axios.defaults.headers.common['Authorization'] = `Bearer ${state?.token}`;

  //initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      if (loginData?.token) {
        setState({ user: loginData.user, token: loginData.token });

        // update axios header when token is restored
        axios.defaults.headers.common['Authorization'] = `Bearer ${loginData.token}`;
      }
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
