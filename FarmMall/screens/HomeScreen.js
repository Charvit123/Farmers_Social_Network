import {
  StyleSheet,
  Text,
  View,
  TextInput ,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import { create } from 'apisauce';
import COLORS from './../const/colors';
// import plants from './../const/plants';

const HomeScreen = ({navigation}) => {
  // const [discussions,setDiscussions]=useState([]);
  let discussions = {};
  const api = create({
    baseURL: 'http://192.168.0.104:5000/'
  }) 

  const fetchDiscussion = async () => {
     api.get('/api/showDiscussions')
    .then(async(res) => {
      // const result1=res.json();
      discussions = res["data"].getDiscussions;
      // console.log(discussions.length)
      for (var i=0; i < discussions.length; i++){
        console.log(discussions[i].title);
      }
      // setDiscussions({...result1});
    }).catch((err) => {
      console.log(err);
    });
    // console.log(discussions);
  }

  useEffect(async() => {
    await fetchDiscussion();
  }, [])
  const addQues=async()=>{
    navigation.navigate("AddQues");
  }
  const onSubmit=async()=>{
    try {
            fetch('http://192.168.0.104:5000/api/logout', {
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
    const [catergoryIndex, setCategoryIndex] = React.useState(0);

  const categories = ['POPULAR', 'ORGANIC', 'DESEASE', 'WEATHER'];

    const CategoryList = () => {
      return (
        <View style={style.categoryContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
    const Card = () => {
      console.log("1");
      // console.log(diss);
      console.log("2");
        return (
          <TouchableOpacity
            activeOpacity={0.8}
        // onPress={() => navigation.navigate('Details', plant)}
          >
          <View style={style.card}>
            {/* <View style={{alignItems: 'flex-end'}}>
            {}
          </View> */}

            <View
              style={{
                height: 200,
                alignItems: 'center',
              }}>
              <Image
                source={{uri:'http://res.cloudinary.com/dxepcudkt/image/upload/v1643356204/sbzfcsmctumhj2gxylly.jpg'}}
                style={{resizeMode:'contain',width:400,height:200}}
              />
            </View>
            <View style={style.cardInfo}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Charvit
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                Charvit
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 15, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <Text style={{fontSize: 30, color: COLORS.green, fontWeight: 'bold'}}>
            Farm Mall
          </Text>
        </View>
        <View style={style.icons}>
          <Icon name="add-box" size={35} onPress={addQues} />
          <Icon name="logout" size={35} style={{marginLeft: 10}} onPress={onSubmit}/>
        </View>
      </View>
      <View style={{marginTop: 15, flexDirection: 'row'}}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoryList />
      <Card/>
      {/* {
        Object.entries(discussions).map((item)=>{
          console.log(item);
          // return <Card diss={item} />
        })
      } */}
       { 
      //  <FlatList
      //     showsVerticalScrollIndicator={false}
      //     contentContainerStyle={{
      //       marginTop: 10,
      //       paddingBottom: 50,
      //     }}
      //     data={Object.keys(discussions)}
      //     renderItem={(item) => {
      //       console.log(item);
      //     // return <Card diss={item} />;
      //     }}
      // /> 
      // {
      //   for(i=0;i<discussions.length;i++)
      // }
}
      {/* } */}
     </SafeAreaView>
  )
};
export default HomeScreen;

const style = StyleSheet.create({
    categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 14, 
    color: 'grey', 
    fontWeight: 'bold'
  },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 300,
    backgroundColor: COLORS.light,
    width:'100%',
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    display: 'flex',
    justifyContent: 'space-around'
  },
  cardInfo: {
    marginTop: 30
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icons:{
    display:'flex',
    flexDirection:'row',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
