import {
  ScrollView,RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import hostname from "../const/hostname";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowPosts from "./showPosts";
const followingPosts = () => {
    const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
    
    const findUser = async (id) => { 
        const url = "http://" + hostname + ":5000/api/finduser";
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jsonRes = await res.json();
        setUser(jsonRes.user.following);
    }
  useEffect(async () => {
    const currentUser=await AsyncStorage.getItem("id");
    await findUser(currentUser);
  }, []); 
    const onRefresh = async() => {
        const currentUser=await AsyncStorage.getItem("id");
        setRefreshing(true);
        setTimeout(async() => {
            await findUser(currentUser);
            setRefreshing(false);
        }, 2000);
    };
  return (
      <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
    >
        {user &&
          Object.entries(user).map((item, i) => {
            return <ShowPosts userIds={item} key={i} />
          })}
      </ScrollView>
  );
};


export default followingPosts