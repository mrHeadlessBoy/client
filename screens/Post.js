import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

const Post = ({ navigation }) => {
  //local satet
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  //handle form data to post
  const handlePost = async () => {
    try {
      setLoading(true);
      //validate
      if (!title || !description) {
        alert("add post and desciption before post");
      }
      if (!description) {
        alert("add desciption before post");
      }
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      setLoading(false);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            placeholder="add post title"
            style={styles.inputbox}
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            placeholder="add post descript"
            style={styles.inputbox}
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.postbtn} onPress={handlePost}>
            <Text style={styles.postbtntxt}>
              <FontAwesome5 name="plus-square" size={18} /> {"  "}
              POST
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
  heading: {
    color: "blue",
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputbox: {
    backgroundColor: "#fff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 17,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  postbtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postbtntxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Post;
