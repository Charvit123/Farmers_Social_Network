import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import hostname from "../const/hostname";
import COLORS from "./../const/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

const ShowCmnt = (passedComments) => {
  const [cmntUser, setCmntuser] = useState("");
  const [loggedinUser, setloggedinUser] = useState("");
  const id = passedComments.passedComments[1].user;
  useEffect(async () => {
    setloggedinUser(await AsyncStorage.getItem("id"));
    const url2 = "http://" + hostname + ":5000/api/finduser";
    const res2 = await fetch(url2, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes2 = await res2.json();
    setCmntuser(jsonRes2.user);
  }, []);
  const cmntDelete = async () => {
    alert("Do you want to delete cmnt??");
    const id = passedComments.passedComments[1]._id;
    const url = "http://" + hostname + ":5000/api/deleteCmnt";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.userprofile}>
        <Image
          style={styles.userimg}
          source={{ uri: cmntUser.avatar }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            resizeMode: "contain",
          }}
        />

        <View style={styles.userdetails}>
          <Text style={{ marginLeft: 10 }}>{cmntUser.username}</Text>
        </View>
      </View>
      <View style={styles.comtcont}>
        <Text style={{ marginTop: 10 }}>
          {passedComments.passedComments[1].cmnt}
        </Text>
        {id == loggedinUser && (
          <Icon
            name="delete"
            size={20}
            onPress={cmntDelete}
            style={styles.icon}
          ></Icon>
        )}
      </View>
    </View>
  );
};
export default ShowCmnt;

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: COLORS.white,
    width: "98%",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    display: "flex",
    justifyContent: "space-around",
   alignSelf:"center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  userimg: {
    height: 5,
    width: 5,
    borderRadius: 50,
  },
  userprofile: {
    flexDirection: "row",
  },
  userdetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  comtcont: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
  },
});
