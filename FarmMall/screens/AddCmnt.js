import { StyleSheet, Text, View,Image,Modal,Button,TouchableOpacity,Animated,TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import hostname from '../const/hostname';

const state = {
   cmnt:"",
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

const AddCmnt = ({visible,navigation}) => {
  const [userData,setUserData]=useState(state);
   const { cmnt } = userData;
  const onChangeHandler =(name,value)=> {
        setUserData({...userData, [name]: value});
  }
  return (
    <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.push("Details")}>
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

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Congratulations registration was successful
        </Text>
      </ModalPoup>
  );
};

export default AddCmnt;

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