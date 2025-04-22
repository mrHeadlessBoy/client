import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Form/InputBox";
import SubmitButton from "../../components/Form/SubmitButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const Login = ( {navigation} ) => {
  //global state
  const [state, setState] = useContext(AuthContext);
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //func

  //btnfunc
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("fill all field");
        setLoading(false);
        return; 
      }
      setLoading(false);
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );
      setState(data);
      await AsyncStorage.setItem('@auth',JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
      console.log("Login data==>", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  //temp func to chk local str data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem('@auth')
    console.log('Local Storage ===>', data);
  };
  getLocalStorageData();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        not a user then  {" "}
        <Text style={styles.link}
        onPress={()=>navigation.navigate("Register")}>
          Register</Text>{" "}
      </Text>
    </View> 
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#e1d5c9",
    },
    pageTitle: {
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      color: "1e2225",
    },
    inputBox: {
      height: 40,
      marginBottom: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginTop: 10,
      paddingLeft: 10,
      color: "#af9f85",
    },
    linkText:{
      textAlign:"center",
    },
    link:{
      color:"red",
    }
  });
  

export default Login