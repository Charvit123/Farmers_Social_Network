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
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { create } from "apisauce";
import COLORS from "./../const/colors";
import hostname from "../const/hostname";
import Weather from "./Weather";
const state = {
  search: "",
};
const HomeScreen = ({ navigation }) => {
  const [discussions, setDiscussions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [weather, setweather] = useState(false);

  const [search, setSearch] = useState("");
  const onChangeHandler = (e) => {
    setSearch(e.replace(/ /g, ""));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      const url = "http://"+hostname+"api/search?news=${search}";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonRes = await res.json();
      // console.log(jsonRes);
      setDiscussions(jsonRes.posts);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  };

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
    // console.log("1");
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

  const categories = ["ALL POSTS", "POPULAR", "WEATHER"];

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            // onPress={() => setCategoryIndex(index)}
            onPress={() => {
              setCategoryIndex(index);
              index === 2? setweather(true) : setweather(false) ;
            }}
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
        onPress={() => navigation.push("Details",diss)}
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
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      takePost();
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 7, backgroundColor: COLORS.white }}
    >
      <View style={style.header}>
        <View>
          <Text
            style={{
              fontSize: 25,
              color: COLORS.green,
              fontWeight: "bold",
              paddingHorizontal: 7,
            }}
            onPress={() => navigation.push("Home")}
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
      <View
        style={{ marginTop: 15, flexDirection: "row", paddingHorizontal: 7 }}
      >
        <View style={style.searchContainer}>
          <Icon
            name="search"
            size={25}
            style={{ marginLeft: 20 }}
            onPress={handleSearch}
          />
          <TextInput
            placeholder="Search"
            style={style.input}
            //  onChange={e => setSearch(e.target.value.replace(/ /g, ''))}
            onChangeText={(text) => onChangeHandler(text)}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon
            name="account-circle"
            size={35}
            color={COLORS.white}
            onPress={pressHandeler}
          />
        </View>
      </View>
      <CategoryList />
      {!weather &&
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
      }
      {weather &&
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Weather/>
      </ScrollView>
      }
    </SafeAreaView>
  );
};
export default HomeScreen;

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: COLORS.white,
    width: "100%",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    display: "flex",
    justifyContent: "space-around",
  },
  cardInfo: {
    marginTop: 0,
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
    height: 45,
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
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
  },
});
