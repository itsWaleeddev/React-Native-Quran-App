import {React, useContext, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// import Context from "./context";

// let {
//   font,
//   setFont
// } = useContext(Context);

export default function Settings({navigation}) {


  useEffect(()=>{
    console.log('I am in Setting Screen');
    
  },[])

  const changFont=()=>{
    console.log('changFont is called');
    
    global.font = 100;

    //

    // setFont(font);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ Settings</Text>
          <TouchableOpacity style={styles.featureButton} onPress={() => changFont()}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8332/8332365.png' }} 
              style={styles.icon} 
            />
            <Text style={styles.buttonText}>Change Font</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  text: { fontSize: 20, fontWeight: "bold" },
});
