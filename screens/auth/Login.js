import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Form/InputBox";
import SubmitButton from "../../components/Form/SubmitButton";

const Login = ( {navigation} ) => {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //func

  //btnfunc
  const handleSubmit = () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("fill all field");
        setLoading(false);
        return; 
      }
      setLoading(false);
      console.log("Login data==>", { email, password });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
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
      marginHorizontal: 20,
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