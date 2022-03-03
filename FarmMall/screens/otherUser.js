import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import hostname from "../const/hostname";
import COLORS from "../const/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const otherUser = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const [diss, setPost] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [following, setFollowing] = useState();
  const [notfollowing, setnotFollowing] = useState();
  const id = route.params;

  const checkFollowing = async () => {
    const currentUser = await AsyncStorage.getItem("id");

    const url1 = "http://" + hostname + ":5000/api/following";
    const res1 = await fetch(url1, {
      method: "POST",
      body: JSON.stringify({ currentUser }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes1 = await res1.json();
    if (jsonRes1.retu.length == 0) {
      setFollowing(false);
    }
    for (var i = 0; i < jsonRes1.retu.length; i++) {
      if (jsonRes1.retu[i] == id) {
        setFollowing(true);
        break;
      } else {
        setFollowing(false);
      }
    }
  };
  useEffect(async () => {
    const currentUser = await AsyncStorage.getItem("id");
    const url = "http://" + hostname + ":5000/api/finduser";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await res.json();
    if (jsonRes.user._id === currentUser) {
      setnotFollowing(true);
    }
    setUser(jsonRes.user);

    const url2 = "http://" + hostname + ":5000/api/userPost";
    const res2 = await fetch(url2, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes2 = await res2.json();
    setPost(jsonRes2.getUsersPost);

    await checkFollowing();
  }, []);

  const follow = async () => {
    const currentUser = await AsyncStorage.getItem("id");
    const url3 = "http://" + hostname + ":5000/api/follow";
    const res3 = await fetch(url3, {
      method: "POST",
      body: JSON.stringify({ id, currentUser }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes1 = await res3.json();
  };
  const unfollow = async () => {
    const currentUser = await AsyncStorage.getItem("id");
    const url3 = "http://" + hostname + ":5000/api/unfollow";
    const res3 = await fetch(url3, {
      method: "POST",
      body: JSON.stringify({ id, currentUser }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes1 = await res3.json();
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      checkFollowing();
      setRefreshing(false);
    }, 2000);
  };
  const Card = (diss) => {
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.white }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={style.userprofile}>
          <Image
            style={style.userimg}
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
        {following && !notfollowing && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={unfollow}
            style={style.button}
          >
            <Text style={style.follow}>Following</Text>
          </TouchableOpacity>
        )}
        {!following && !notfollowing && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={follow}
            style={style.button}
          >
            <Text style={style.follow}>Follow</Text>
          </TouchableOpacity>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {diss &&
            Object.entries(diss).map((item, i) => {
              return <Card diss={item} key={i} />;
            })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default otherUser;
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
  userimg: {
    height: 10,
    width: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  userprofile: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
    alignContent: "center",
    alignSelf: "center",
  },
  userdetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  follow: {
    alignSelf: "center",
    color: "#ffffff",
  },
  button: {
    width: 300,
    backgroundColor: "#3184ad",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf: "center",
  },
});
