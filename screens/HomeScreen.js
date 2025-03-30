import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  return (
    <View style = {styles.container}>
    <View style = {styles.container1}>
        <Text style= {{paddingTop: 50, color: 'white', fontSize: 20, fontWeight: 'bold'}}>Quran</Text>
        <Image
        style ={{height:110, width:110, marginTop: '15'}}
        source={{uri: 'https://parspng.com/wp-content/uploads/2022/09/quranpng.parspng.com-12.png'}}
        ></Image>
        <View style={{alignItems:'center'}}>
          <Text style={{color:'white', marginTop:12}} >Last Read</Text>
          <Text style={{color:'white', marginTop:1, fontSize: '25'}}>Al-Faatiha</Text>
          <Text style={{color:'white', marginTop:1}}>Verse No. 7</Text>
        </View>
    </View>

    <View style = {styles.container2}>
      <Text style = {{fontSize: 25, fontWeight: 'bold'}} >Features</Text>
      <View style = {{marginTop: 25}}>
      
        <View style = {{flexDirection: 'row'}} >
          
          <TouchableOpacity
           style = {styles.item}
            onPress={()=>
                    navigation.navigate('Read Quran')
            }
          >
            <Image 
            style = {{height: 75, width: 75}}
            source={{uri: 'https://static.vecteezy.com/system/resources/previews/021/886/069/non_2x/illustration-of-the-holy-quran-book-book-islamic-icons-can-be-used-for-the-month-of-ramadan-eid-and-eid-al-adha-for-logo-website-and-poster-designs-free-vector.jpg'}}
            >
            </Image>
            <Text style={{fontSize:20, fontWeight:'300', paddingTop: 0}}>Read Quran</Text>
            
          </TouchableOpacity>

          <View style = {styles.item}>
            <FontAwesome  name="search" size={60} color="black" />
            <Text style={{fontSize:20, fontWeight:'300', paddingTop: 15}}>Search</Text>
          </View>

        </View>  

        <View style = {{flexDirection: 'row'}}>

          <View style = {styles.item}>
           <FontAwesome name="bookmark" size={60} color="black" />
           <Text style={{fontSize:20, fontWeight:'300', paddingTop: 15}}>Book Mark</Text>
          </View>

          <View style = {styles.item}>
           <Ionicons name="settings" size={60} color="black" />
           <Text style={{fontSize:20, fontWeight:'300', paddingTop: 15}}>Settings</Text>
          </View>

        </View>  

      </View>
    </View>

    <StatusBar style="auto" />
  </View>  
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue'
    },
    container1: {
      flex: 0.35,
      backgroundColor: 'blue',
      alignItems: 'center',
    },
    container2: {
      flex: 0.65,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 10
    },
    item: {
      borderWidth: 1,
      borderColor: 'grey',
      height: 130,
      width: 130,
      borderRadius: 10,
      margin: 25,
      alignItems: 'center',
      paddingTop:10
    }
  });