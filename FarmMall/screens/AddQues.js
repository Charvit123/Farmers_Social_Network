import { View, Text,TextInput,Button,Image,StyleSheet,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as  ImagePicker from 'expo-image-picker';
import { create } from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import hostname from '../const/hostname';
const state = {
  title:"",
  description:"",
  picture:""
};
const AddQues = ({navigation}) => {
    const api=create({
      baseURL:'http://'+hostname+':5000/'
    })
    const [Info,setInfo]=useState(state);
    const { title,description,picture} = Info;
    const onChangeHandler =(name,value)=> {
        setInfo({...Info, [name]: value});
    }
    let [img, setImg] = useState();
    const CLOUDINARY_URL="https://api.cloudinary.com/v1_1/dxepcudkt/upload";
    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if(!granted)
            alert('You need Permission for camera roll');
    }
    useEffect(() => {
        requestPermission();
    }, []);

    const takeimage = async () => {
        const pick = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [4,3],
        });
        
        if(!pick.cancelled){
            setImg(pick);
        }
    }
    const onSubmit=async()=>{
      const id = await AsyncStorage.getItem('id')
      let base64Img = `data:image/jpg;base64,${img.base64}`;
  
      let data = {
        "file": base64Img,
        "upload_preset": "jxxkhti2",
      }
  
      const res = await fetch(CLOUDINARY_URL, {
        body:JSON.stringify(data),
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
      })
      const result=await res.json();
      api.post('/api/addDetails',{title,description,picture:[result.url],id})
      .then(res=>{
        if(res.status!=500)
            navigation.push("Home")        
      })
      .catch(err=>{
        console.log(err);
      })
    }
  return (
    <View style={styles.container}>
      <Text>Title:-</Text>
        <TextInput placeholder="Title" onChangeText={(text) => onChangeHandler('title', text)}
         value={title} 
        name="title"/>
      <Text>Description:-</Text>
        <TextInput placeholder="Description" 
        onChangeText={(text) => onChangeHandler('description', text)}
        value={description} name="description"/>
        {img &&
            <Image source={{uri:img.uri}} style={{width: 100, height: 100}}/>
        }
        <Button title="take image" onPress={takeimage} />
        <TouchableOpacity style={styles.Button}
          onPress={onSubmit} 
          ><Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

export default AddQues;
const styles = StyleSheet.create({
    container : {
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
    Button: {
     width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  ButtonText: {
    fontSize:18,
    fontWeight:'800',
    color:'#ffffff',
    textAlign:'center'
  }
})