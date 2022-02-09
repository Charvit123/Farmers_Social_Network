import React, { Component, useEffect, useState } from 'react';
import {StyleSheet,Text,View,TextInput ,TouchableOpacity} from 'react-native';
import { isEmpty, isEmail, isLength, isMatch } from './../utils/valid';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hostname from "../const/hostname";
const state = {
        email: "",
        password: "",
};
const LoginScreen = ({navigation}) => {
	const [userData,setUser]=useState(state);
  const { email, password } = userData;
  
  const onChangeHandler =(name,value)=> {
        setUser({...userData, [name]: value});
    }
  const onSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(email) || isEmpty(password))
                return setUser({...userData, err: "Please fill in all fields.", success: ''});

        if(!isEmail(email))
            return setUser({...userData, err: "Invalid emails.", success: ''});

        if(isLength(password))
            return setUser({...userData, err: "Password must be at least 6 characters.", success: ''});
        try {
          const url = "http://" + hostname + ":5000/api/login";
          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            })
            .then(async res=>{
              const jsonRes = await res.json();
              if(res.status!=500)
                await AsyncStorage.setItem('id', jsonRes["user"]._id)
                navigation.navigate("Home");
            })
            .catch((error) =>{
                console.log(error);
            })
            // setUserData({...userData, err: '', success: res.data.msg});
        } catch (err) {
            console.log(err);
            // err.response.data.msg && setUserData({...userData, err: err.response.data.msg, success: ''});
        }
  }
  return(
    <View style={styles.container}>
				<Logo/>
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Email"
                        placeholderTextColor = "#ffffff"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onChangeText={(text) => onChangeHandler('email', text)}
                        value={email}
                    />
                    <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor = "#ffffff"
                        onChangeText={(text) => onChangeHandler('password', text)}
                        value={password} 
                    />  
                    <TouchableOpacity style={styles.button} 
                    onPress={onSubmit}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>     
				<View style={styles.signupTextCont} >
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                        <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
			</View>	
			)
  };
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:17,
    paddingTop:6,
    paddingBottom:6,
    fontSize:18,
    color:'#ffffff',
    marginVertical: 12,
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:18,
    fontWeight:'800',
    color:'#ffffff',
    textAlign:'center'
  }
});
export default LoginScreen;