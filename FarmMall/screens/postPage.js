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
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import hostname from "../const/hostname";
import { isEmpty } from "./../utils/valid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowCmnt from "./ShowCmnt";

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
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(state);
  const { cmnt, err, success } = userData;
  const onChangeHandler = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  const info = disscussion.route.params.diss[1];
  const id = info.user;
  const postId=info._id;
  const [user, setUser] = useState({});
  const [comments, setCmnt] = useState({});
  useEffect(async () => {
    
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
    const url1 = "http://" + hostname + ":5000/api/comment";
    // console.log(info._id);
    const res1 = await fetch(url1, {
      method: "POST",
      body: JSON.stringify({postId}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes1 = await res1.json();
    setCmnt(jsonRes1.comments);
    // console.log(jsonRes1);
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
      console.log(bodyEle);
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
          if (res.status != 500){
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
  // console.log(comments);
  return (

  <View style={styles.container}>
    <ScrollView>
      {/* postpart */}
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{info.title}</Text>
        <View style={{ width: 300, height: 300, alignSelf: "center" }}>
          <Image
            source={{ uri: info.images[0] }}
            style={{ width: "100%", height: 300, resizeMode: "contain" }}
          />
        </View>
        <Text
          style={{
            alignSelf: "center",
            padding: 5,
            marginLeft: 25,
            marginRight: 25,
          }}
        >
          {info.description}
        </Text>
      </View>

{/* cmnt part */ }

        {comments &&
          Object.entries(comments).map((item, i) => {
            return <ShowCmnt passedComments={item} key={i} />;
          })}
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
            <Text>Comment:-</Text>
            <TextInput
              placeholder="Put your thougts"
              onChangeText={(text) => onChangeHandler("cmnt", text)}
              value={cmnt}
              name="cmnt"
            />
          </View>

          <View
            style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
          >
            <TouchableOpacity onPress={onSubmit}>
              <Text>submit</Text>
            </TouchableOpacity>
          </View>
        </ModalPoup>
        <Icon name="add-comment" size={35} onPress={() => setVisible(true)} />
      </View>
    </View>
  );
};

export default postPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    fontFamily: "lucida grande",
    marginTop: 30,
  },
  subcontainer: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderColor: "black", // if you need
    // borderWidth:1,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    marginTop: 5,
    fontSize: 25,
    alignSelf: "center",
  },
  userimg: {
    height: 5,
    width: 5,
    borderRadius: 50,
  },
  userprofile: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  userdetails: {
    marginLeft: 5,
  },
  comment: {
    marginTop: 20,
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
