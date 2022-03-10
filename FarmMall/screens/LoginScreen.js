import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { isEmpty, isEmail, isLength } from "./../utils/valid";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hostname from "../const/hostname";
import loginimg from "../images/bg4.jpg";

const state = {
  email: "",
  password: "",
  err: '',
  success:'',
};
// const showErrorMsg = (msg) => {
//     return (
      
//     )
// }

// export const showSuccessMsg = (msg) => {
//     return (
//         <div className="successMsg">{msg}</div>
//     )
// }
const LoginScreen = ({ navigation }) => {
  const [userData, setUser] = useState(state);
  const { email, password,err } = userData;

  const onChangeHandler = (name, value) => {
    setUser({ ...userData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password))
      return setUser({
        ...userData,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...userData, err: "Invalid emails.", 
      success: "" 
    });

    if (isLength(password))
      return setUser({
        ...userData,
        err: "Password must be at least 8 characters.",
        success: "",
      });
    try {
      const url = "http://" + hostname + ":5000/api/login";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then(async (res) => {
          const jsonRes = await res.json();
          console.log(jsonRes);
          if (res.status != 500){
            await AsyncStorage.setItem("id", jsonRes["user"]._id);
            navigation.navigate("Home");
          }
          else{
            setUser({...userData, err: jsonRes.msg, success:'' });
          }

        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={loginimg}
        style={{
          flex: 1,
          height:800,
          width:410,
          resizeMode: 'contain',
          opacity:1,
        }}
      >
        <Logo />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#7A797A"
          selectionColor="#7A797A"
          keyboardType="email-address"
          onChangeText={(text) => onChangeHandler("email", text)}
          value={email}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          selectionColor="#7A797A"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#7A797A"
          onChangeText={(text) => onChangeHandler("password", text)}
          value={password}
        />
        {{err} && 
        <View >
          <Text style={{color: "white",
  textAlign: "center",
  marginBottom: 1,
  fontSize:19,
	fontWeight:"bold"}}>{err}</Text>
        </View>
        }
        {/* {success && showSuccessMsg(success)} */}
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  
  },
  signupText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
  },
  signupButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.9)",
    borderRadius: 25,
    paddingHorizontal: 17,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 18,
    color: "#7A797A",
    marginVertical: 12,
    alignSelf:"center",
  },
  button: {
    width: 300,
    backgroundColor: "black",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf:"center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  err:{
  color: "red",
  textAlign: "center",
  marginBottom: 1,
  fontWeight: "bold"
}
});
export default LoginScreen;
