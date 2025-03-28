import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ReadQuran from './screens/ReadQuran';
import SurahScreen from './screens/SurahScreen';



const Stack = createNativeStackNavigator();


export default function App() {
  console.log("Hello")
  return (
    <NavigationContainer>
      <StackNavigator/>
  </NavigationContainer>
  );
}

const StackNavigator = ()=>(
  <Stack.Navigator
  initialRouteName='Home'
  >
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{headerShown:false}}
  />
  <Stack.Screen
   name="Read Quran"
   component={ReadQuran}
   options={{headerTitle:"Surahs"}}
  />
   <Stack.Screen
   name="Surah Screen"
   component={SurahScreen}
   options={{headerTintColor: 'indigo',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
   }}
  />
</Stack.Navigator>
)

