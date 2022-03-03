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
import hostname from "../const/hostname";
import COLORS from "../const/colors";
import { useNavigation } from '@react-navigation/native';

const  ShowPosts = (id) => {
    const [diss, setPost] = useState({});
    const navigation = useNavigation();

    const takePost=async(userIds)=>{
        const id=userIds.userIds[1]
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
    }
  useEffect(async () => {
        await takePost(id);
  }, []);
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
            <Text style={{ fontWeight: "bold", fontSize: 15 , }}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {diss &&
          Object.entries(diss).map((item, i) => {
            return <Card diss={item} key={i} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

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
    alignSelf:"center",
  },
  userprofile: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
    alignContent: "center",
    alignSelf: "center",
   
  },
  userdetails: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "space-between",
   alignSelf:"center",
  },
});
export default ShowPosts
