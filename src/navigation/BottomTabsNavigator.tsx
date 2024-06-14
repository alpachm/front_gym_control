import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import AppStackNavigator from './AppStackNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';

export type RootBottomParams = {
    AppStackNavigator: undefined;
    Profile: undefined;
}

const Tab = createBottomTabNavigator<RootBottomParams>();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
      <Tab.Screen name="AppStackNavigator" component={AppStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabsNavigator