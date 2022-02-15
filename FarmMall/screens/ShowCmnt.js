import {
  StyleSheet,
  Text,
  View,
  Image,
 
} from "react-native";
import React, { useEffect, useState } from "react";
import hostname from "../const/hostname";
import COLORS from "./../const/colors";

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
        <Text style={{marginLeft:10,}}>{cmntUser.username}</Text>
        {/* <Text>{cmntUser.email}</Text> */}
        </View>
       
        </View>
        <View style={{marginTop:10,}}>
        <Text>{passedComments.passedComments[1].cmnt}</Text>
        </View>
        </View>
        
      
  );
};
export default ShowCmnt;

const styles = StyleSheet.create({
  container: {
  
    height: 100,
    backgroundColor: COLORS.light,
    width: "100%",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    display: "flex",
    
    justifyContent: "space-around",
    
  },  
  userimg: {
    height: 5,
    width: 5,
    borderRadius: 50,
  },
  userprofile: {
    display: "flex",
    flexDirection: "row",
   
  },
  userdetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
