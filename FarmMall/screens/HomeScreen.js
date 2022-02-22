import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { create } from "apisauce";
import COLORS from "./../const/colors";
import hostname from "../const/hostname";

const HomeScreen = ({ navigation }) => {
  const [discussions, setDiscussions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const takePost = async () => {
    const url = "http://" + hostname + ":5000/api/showDiscussions";
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const result1 = await res.json();
        setDiscussions({ ...result1.getDiscussions });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(async () => {
    await takePost();
  }, []);
  const addQues = async () => {
    navigation.navigate("AddQues");
  };
  const pressHandeler = async () => {
    navigation.navigate("UserProfile");
  };
  const onSubmit = async () => {
    try {
      const url = "http://" + hostname + ":5000/api/logout";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const jsonRes = await res.json();
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [catergoryIndex, setCategoryIndex] = React.useState(0);

  const categories = ["All POSTS", "POPULAR", "WEATHER"];

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const Card = (diss) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Details", diss)}
      >
        <View style={style.card}>
          {/* <View style={{left:270,paddingBottom: 20}}>
                <Picker> 
                  <Picker.Item label="..." value="0" />
                    <Picker.Item 
                    label="Delete1" 
                    value="delete" 
                    />
                </Picker>
            </View> */}
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
                marginTop: 5,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "bold" }}
                numberOfLines={2}
              >
                {diss.diss[1].description}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      takePost();
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.white }}
    >
      <View style={style.header}>
        <View>
          <Text
            style={{ fontSize: 28, color: COLORS.green, fontWeight: "bold" }}
            onPress={() => navigation.navigate("Weather")}
          >
            Farm Discuss
          </Text>
        </View>
        <View style={style.icons}>
          <Icon name="add-box" size={35} onPress={addQues} />
          <Icon
            name="logout"
            size={35}
            style={{ marginLeft: 10 }}
            onPress={onSubmit}
          />
        </View>
      </View>
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
        <View style={style.sortBtn}>
          <Icon
            name="account-circle"
            size={30}
            color={COLORS.white}
            onPress={pressHandeler}
          />
        </View>
      </View>
      <CategoryList />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {discussions &&
          Object.entries(discussions).map((item, i) => {
            return <Card diss={item} key={i} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 14,
    color: "grey",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 300,
    backgroundColor: COLORS.light,
    width: "100%",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    display: "flex",
    justifyContent: "space-around",
  },
  cardInfo: {
    marginTop: 30,
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
});
