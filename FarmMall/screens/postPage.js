import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  Animated,
  TextInput,
  ScrollView,
  RefreshControl,
  Alert,
  SafeAreaView,
  BlurView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import hostname from "../const/hostname";
import { isEmpty } from "./../utils/valid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowCmnt from "./ShowCmnt";
import { NavigationEvents } from "react-navigation";
import COLORS from "./../const/colors";

const state = {
  cmnt: "",
  err: "",
  success: "",
};

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const postPage = (disscussion) => {
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(state);

  const { cmnt, err, success } = userData;

  const onChangeHandler = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const info = disscussion.route.params.diss[1];

  const id = info.user;
  const postId = info._id;

  const [user, setUser] = useState({});
  const [comments, setCmnt] = useState({});
  const takeUserfunct = async (id) => {
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
  };
  const takeComment = async (postId) => {
    const url1 = "http://" + hostname + ":5000/api/comment";
    const res1 = await fetch(url1, {
      method: "POST",
      body: JSON.stringify({ postId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes1 = await res1.json();
    setCmnt(jsonRes1.comments);
  };
  useEffect(async () => {
    await takeUserfunct(id);
    await takeComment(postId);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(cmnt))
      return setUser({
        ...userData,
        err: "Please fill in all fields.",
        success: "",
      });

    try {
      const postId = info._id;
      const postUser = info.user;
      const id = await AsyncStorage.getItem("id");
      const bodyEle = { cmnt, id, postId, postUser };
      const url = "http://" + hostname + ":5000/api/addcomment";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyEle),
      })
        .then(async (res) => {
          const jsonRes = await res.json();
          if (res.status != 500) {
            setVisible(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      // err.response.data.msg && setUserData({...userData, err: err.response.data.msg, success: ''});
      console.log(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      takeComment(info._id);
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 9, backgroundColor: COLORS.white }}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* post_part */}
          <View style={styles.userprofile}>
              <Image
                style={styles.userimg}
                source={{ uri: user.avatar }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  resizeMode: "contain",
                }}
              />
              <View style={styles.userdetails}>
                <Text>{user.username}</Text>
                <Text>{user.email}</Text>
              </View>
            </View>
          <View style={styles.subcontainer}>
       
            <Text style={styles.title}>{info.title}</Text>
            <View style={{ width: 350, height: 300, alignSelf: "center" }}>
              <Image
                source={{ uri: info.images[0] }}
                style={{ width: "100%", height: 300, resizeMode: "contain" ,borderRadius:10, }}
              />
            </View>
            <Text
              style={{
                alignSelf: "center",
               
                marginLeft: 25,
                marginRight: 25,
              }}
            >
              {info.description}
            </Text>
          </View>

          {/* cmnt_part */}
          <View style={{ marginTop: 10 }}>
            {comments &&
              Object.entries(comments).map((item, i) => {
                return <ShowCmnt passedComments={item} key={i} />;
              })}
          </View>
        </ScrollView>

        <View>
          <ModalPoup visible={visible}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Icon name="close" size={35} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Comment</Text>
              <TextInput
                placeholder="Put your thougts"
                onChangeText={(text) => onChangeHandler("cmnt", text)}
                value={cmnt}
                name="cmnt"
              />
            </View>

            <View style={{ marginVertical: 30, fontSize: 20 }}>
              <TouchableOpacity onPress={onSubmit} style={{ left: 110 }}>
                <Text>submit</Text>
              </TouchableOpacity>
            </View>
          </ModalPoup>
          <Icon name="add-comment" size={35} onPress={() => setVisible(true)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default postPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    fontFamily: "lucida grande",
    marginTop: 30,
    paddingHorizontal: 0,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  subcontainer: {
    // maxWidth: "100%",
    // maxHeight: "100%",
    // borderColor: "black",
    // overflow: "hidden",
    // shadowColor: "black",
    // shadowRadius: 10,
    // shadowOpacity: 1,
    // elevation: 5,
    // paddingTop: 20,
    // paddingBottom: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    // marginLeft: 20,
    // marginRight: 20,
    // height: 300,
    marginTop: 5,
    backgroundColor: COLORS.white,
    width: "100%",
   // marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 1,
    display: "flex",
    justifyContent: "space-around",
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
  userimg: {
    height: 5,
    width: 5,
    borderRadius: 50,
  },
  userprofile: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginLeft:40,
  },
  userdetails: {
    marginLeft: 10,
    
  },
  comment: {
    marginTop: 20,
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    // modalBackGround: "blur",
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginLeft: 40,
    marginTop: 260,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
