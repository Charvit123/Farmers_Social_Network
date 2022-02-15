import { StyleSheet, Text, View, Div } from "react-native";
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
import userProfile from "./screens/userProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddQues" component={AddQues} />
        <Stack.Screen name="Details" component={postPage} />
        <Stack.Screen name="UserProfile" component={userProfile} />
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
