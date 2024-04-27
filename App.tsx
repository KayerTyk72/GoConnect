import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileSceen';
import SettingScreen from './screens/SettingScreen';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider } from './components/Auth/AuthContext';
import ProfileScreen1 from './screens/ProfileSceen1';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Cần giúp đỡ" component={ProfileScreen} />
      <TopTab.Screen name="Đang giúp" component={ProfileScreen1} />
    </TopTab.Navigator>
  );
}

function MainBottomTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileTabs} options={{ headerShown: false }}/>
      <Tab.Screen name="Setting" component={SettingScreen}  options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}  name="MainBottomTabs" component={MainBottomTabs}  />
          <Stack.Screen name="Login" component={LoginScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
