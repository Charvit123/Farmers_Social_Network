import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const SocketClient = () => {
  useEffect(async()=>{
    const socket = await AsyncStorage.getItem('socketId');
    const id = await AsyncStorage.getItem('id');
    socket.emit('joinUser',id);
  },[socket,id])
  return <></>
}

export default SocketClient