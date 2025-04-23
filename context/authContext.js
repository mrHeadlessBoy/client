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
  axios.defaults.headers.common('Authorization') = state?.token;
  axios.defaults.baseURL = "http://172.25.176.1:8088/api/v1";

  //intitial local str dataF
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []);

  let token = state && state.token;

  //default axios setting
  axios.defaults.headers.common('Authorization') = `Bearer ${token}`;
  axios.defaults.baseURL = "http://172.25.176.1:8088/api/v1";

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
