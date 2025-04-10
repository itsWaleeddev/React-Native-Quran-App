import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ReadQuran from './screens/ReadQuran';
import SurahScreen from './screens/SurahScreen';
import Settings from './screens/Settings';
import { LanguageProvider } from './LanguageContext';



const Stack = createNativeStackNavigator();


export default function App() {
  console.log("Hello")
  return (
    <LanguageProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName='Home'
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Read Quran"
      component={ReadQuran}
      options={{ headerTitle: "Surahs" }}
    />
    <Stack.Screen
      name="Surah Screen"
      component={SurahScreen}
      options={{
        headerTintColor: 'indigo',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
      }}
    />
     <Stack.Screen
      name="Settings"
      component={Settings}
      options={{ headerTitle: "Settings" }}
    />
  </Stack.Navigator>
)

