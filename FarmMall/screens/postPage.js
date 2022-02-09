import { StyleSheet, Text, View,Image,Modal,Button,TouchableOpacity,Animated,TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import hostname from '../const/hostname';
import { isEmpty } from './../utils/valid';
import AsyncStorage from '@react-native-async-storage/async-storage';


const state = {
   cmnt:"",
   err: "",
    success: ""
};

const ModalPoup=({visible,children})=>{
  
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
    } 
    else {
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
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const postPage = (disscussion) => {
    const [visible, setVisible] = useState(false);
    const [userData,setUserData]=useState(state);
   const { cmnt,err,success } = userData;
  const onChangeHandler =(name,value)=> {
        setUserData({...userData, [name]: value});
  }
    const info=disscussion.route.params.diss[1];
    const id=info.user;
    const [user, setUser]=useState({})
    useEffect(async () => {
            const url='http://'+hostname+':5000/api/finduser';
            const res = await fetch(url,{
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const jsonRes = await res.json();
        setUser(jsonRes.user);
    },[])
     const onSubmit =async(e) =>{
        e.preventDefault();
        if(isEmpty(cmnt))
                return setUser({...userData, err: "Please fill in all fields.", success: ''});

        try {
          const postId=info._id;
          const postUser=info.user;
          const id= await AsyncStorage. getItem('id');
          const bodyEle={cmnt,id,postId,postUser};
          console.log(bodyEle)
        //   const url='http://'+hostname+':5000/api/addcomment';
        //   fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(bodyEle),
        //     })
        //     .then(async res=>{
        //       const jsonRes = await res.json();
        //       if(res.status!=500)
        //         // await AsyncStorage.setItem('id', jsonRes["user"]._id)
        //         setVisible(false);
        //     })
        //     .catch((error) =>{
        //         console.log(error);
        //     })
            
        } catch(error){
            // err.response.data.msg && setUserData({...userData, err: err.response.data.msg, success: ''});
            console.log(error);
        }
  }
  return (
    <View>
      <Text>{info.title}</Text>
      <View style={{width:300,height:300}}>
      <Image
                source={{uri:info.images[0]}}
                style={{width:'100%',height:300,resizeMode:'contain'}}
        />
    </View>
      <Text>{info.description}</Text>
      <Text>Author:{user.username}</Text>
      <Text>Author's email:{user.email}</Text>
      <Image
            source={{uri:user.avatar}}
            style={{width:'100%',height:300,resizeMode:'contain'}} 
        />
      <View>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name="close" size={35}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
            <Text>Comment:-</Text>
            <TextInput placeholder="Put your thougts" 
              onChangeText={(text) => onChangeHandler('cmnt', text)}
              value={cmnt} name="cmnt"/>
        </View>

        <View style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          <TouchableOpacity 
                      onPress={onSubmit}
                    >
                        <Text>submit</Text>
                    </TouchableOpacity>
        </View>
      </ModalPoup>
      <Icon name="add-comment" size={35} onPress={() => setVisible(true)}/>
    </View>
      </View>
  );
};

export default postPage;
const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});