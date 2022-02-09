import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import hostname from "../const/hostname";
const ShowCmnt=(passedComments)=>{
    const [cmntUser, setCmntuser] = useState("");
    const id=passedComments.passedComments[1].user;
  useEffect(async () => {
      
    const url2 = "http://" + hostname + ":5000/api/finduser";
    const res2 = await fetch(url2, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes2 = await res2.json();
    setCmntuser(jsonRes2.user)
    // console.log(jsonRes2)
    }, []);
  // console.log(passedComments.passedComments[1])
  return(
      <View>
        <Text>{passedComments.passedComments[1].cmnt}</Text>
        <Text>{cmntUser.username}</Text>
        <Text>{cmntUser.email}</Text>
        <Text></Text>
      </View>
  );
};
export default ShowCmnt;
