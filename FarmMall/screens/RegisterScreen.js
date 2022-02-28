import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { isEmpty, isEmail, isLength, isMatch } from './../utils/valid';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';
import hostname from "../const/hostname";
import loginimg from "../images/bg4.jpg";
const state = {
        username: "",
        email: "",
        password: "",
        cpassword: "",
        err: "",
        success: ""
};
    
const RegisterScreen = ({navigation})=>{
    const api=create({
      baseURL:'http://192.168.29.71:5000/'
    })

  const [userData,setUser]=useState(state);
  const { username, email, password ,cpassword,err,success} = userData;
  const onChangeHandler =(name,value)=> {
        setUser({...userData, [name]: value,err: "", success: ""});
  }
  const onSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(username) || isEmpty(password))
                return setUser({...userData, err: "Please fill in all fields.", success: ''});

        if(!isEmail(email))
            return setUser({...userData, err: "Invalid emails.", success: ''});

        if(isLength(password))
            return setUser({...userData, err: "Password must be at least 6 characters.", success: ''});
        
        if(!isMatch(password, cpassword))
            return setUser({...userData, err: "Password did not match.", success: ''});

        try {
          const url = "http://" + hostname + ":5000/api/register";
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
            
        } catch(error){
            // err.response.data.msg && setUserData({...userData, err: err.response.data.msg, success: ''});
            console.log(error);
        }
    }

		return(
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
				<Logo/>
          <TextInput style={styles.inputBox} 
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Username"
                        placeholderTextColor = "#7A797A" 
                        onChangeText={(text) => onChangeHandler('username', text)}
                        value={username}
                    />
                    
              <TextInput style={styles.inputBox} 
                        name="email"
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Email"
                        placeholderTextColor = "#7A797A"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onChangeText={(text) => onChangeHandler('email', text)}
                        value={email}
                    />
                    <TextInput style={styles.inputBox} 
                        name="password"
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor = "#7A797A" 
                        onChangeText={(text) => onChangeHandler('password', text)}
                        value={password}
                    />  
                    <TextInput style={styles.inputBox} 
                        name="cpassword"
                        underlineColorAndroid='rgba(0,0,0,0)' 
                        placeholder="ConfirmPassword"
                        secureTextEntry={true}
                        placeholderTextColor = "#7A797A" 
                        onChangeText={(text) => onChangeHandler('cpassword', text)}
                        value={cpassword}
                    />
                    <TouchableOpacity style={styles.button} 
                      onPress={onSubmit}
                    >
                        <Text style={styles.buttonText}>SignUp</Text>
                    </TouchableOpacity>     
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={()=> navigation.navigate("Login")}>
            <Text style={styles.signupButton}> Sign in</Text>
          </TouchableOpacity>
				</View>
        </ImageBackground>
			</View>	
			)
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.9)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
   inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.9)',
    borderRadius: 25,
    paddingHorizontal:17,
    paddingTop:6,
    paddingBottom:6,
    fontSize:18,
    color:'#7A797A',
    marginVertical: 12,
    alignSelf:"center",
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13,
      alignSelf:"center",
  },
  buttonText: {
    fontSize:18,
    fontWeight:'800',
    color:'#ffffff',
    textAlign:'center'
  }
});
export default RegisterScreen