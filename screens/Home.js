import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Home = () => {
  //global sts
  const [state, setState] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
});

export default Home;
