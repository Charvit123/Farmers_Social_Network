import { StyleSheet, Text, View ,Div} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddQues from "./screens/AddQues";
import postPage from "./screens/postPage";
import io from 'socket.io-client'
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocketClient from "./socketClient";
const Stack = createNativeStackNavigator();

export default function App() {
  // const [id, setId] = useState();
  // useEffect(async()=>{ 
  //   const id=await AsyncStorage.getItem('id');
  //   setId(id);
  //   const socket=io('http://192.168.0.105:5000/');
  //   socket.on('connection');
  //   console.log(socket);
  //   await AsyncStorage.setItem('socketId', socket);
  // }, [])
  return ( 
    // <Div>
      // {/* {id &&
      //  <SocketClient/>
      // } */}
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddQues" component={AddQues} />
        <Stack.Screen name="Details" component={postPage} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
