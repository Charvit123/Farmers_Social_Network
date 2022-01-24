import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  TouchableOpacity
} from 'react-native';
import React from 'react';


const HomeScreen = ({navigation}) => {
  const onSubmit=async()=>{
    try {
            fetch('http://192.168.0.100:5000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(async res=>{
               const jsonRes = await res.json();
                console.log(jsonRes);
                navigation.navigate("Login");
            })
            .catch((error) =>{
                console.log(error);
            })
            
        } catch(error){
            console.log(error);
        }
    }
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
        <View style={styles.container}>
					<Text style={styles.HomepageText}>Welcome to my app!!!!</Text>
					<TouchableOpacity style={styles.logoutButton}
          onPress={onSubmit} 
          ><Text style={styles.logoutButtonText}>logout</Text>
          </TouchableOpacity>
				</View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  HomepageText: {
  	fontSize:16,
    color:'black',
  },
  logoutButton: {
     width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  logoutButtonText: {
    fontSize:18,
    fontWeight:'800',
    color:'#ffffff',
    textAlign:'center'
  }
});
