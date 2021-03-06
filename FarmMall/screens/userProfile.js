import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hostname from "../const/hostname";
import COLORS from "../const/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const userProfile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [diss, setPost] = useState({});
  const [followingCount, setFollowingCount] = useState();
  const [followerCount, setFollowerCount] = useState();
  useEffect(async () => {
    const id = await AsyncStorage.getItem("id");

    const url = "http://" + hostname + ":5000/api/finduser";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await res.json();
    setUser(jsonRes.user);

    const url2 = "http://" + hostname + ":5000/api/userPost";
    const res2 = await fetch(url2, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes1 = await res2.json();
    setPost(jsonRes1.getUsersPost);

    setFollowerCount(jsonRes.user.follower.length);
    setFollowingCount(jsonRes.user.following.length);
  }, []);

  const seeFollowers = () => {
    navigation.navigate("List", user.follower);
  };
  const seeFollowings = () => {
    navigation.navigate("List", user.following);
  };

  const Card = (diss) => {
    const onDelete = async () => {
      id = diss.diss[1]._id;
      const url = "http://" + hostname + ":5000/api/deletePost";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigation.navigate("Home");
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", diss)}
      >
        <View style={style.card}>
          <View
            style={{
              height: 200,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: diss.diss[1].images[0] }}
              style={{
                resizeMode: "cover",
                flex: 1,
                height: 200,
                width: "100%",
                borderRadius: 10,
              }}
            />
          </View>
          <View style={style.cardInfo}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {diss.diss[1].title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 0,
              }}
            >
              <Text style={{ fontSize: 13, color: "grey" }} numberOfLines={2}>
                {diss.diss[1].description}
              </Text>
            </View>
            <Icon
              name="delete"
              onPress={onDelete}
              size={20}
              style={{ alignSelf: "center", color: "black", marginTop: 5 }}
            ></Icon>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.white }}
    >
      <View style={style.userprofile}>
        <Image
          //    style={style.userimg}
          source={{ uri: user.avatar }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />

        <View style={style.userdetails}>
          <Text style={{ alignSelf: "center" }}>{user.username}</Text>
          <Text style={{ alignSelf: "center" }}>{user.email}</Text>
        </View>
      </View>
      <View style={style.followingDetails}>
        <View style={{ right: 50 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={seeFollowings}>
            <Text style={{ alignSelf: "center" }}>Following</Text>
            <Text style={{ alignSelf: "center" }}>{followingCount}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ left: 50 }}>
          <TouchableOpacity activeOpacity={0.8} onPress={seeFollowers}>
            <Text style={{ alignSelf: "center" }}>Follower</Text>
            <Text style={{ alignSelf: "center" }}>{followerCount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {diss &&
          Object.entries(diss).map((item, i) => {
            return <Card diss={item} key={i} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default userProfile;
const style = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: COLORS.white,
    width: "100%",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    display: "flex",

    justifyContent: "space-around",
  },
  card: {
    height: 310,
    backgroundColor: COLORS.white,
    width: "100%",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    display: "flex",
    justifyContent: "space-around",
  },
  cardInfo: {
    marginTop: 10,
  },
  userprofile: {
    flexDirection: "column",
    marginVertical: 10,
    alignContent: "center",
    alignSelf: "center",
  },
  followingDetails: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
  },
});
