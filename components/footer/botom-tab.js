// MyTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './../Profile/profile.js';
import Search from '../search/search.js';
import QrScanner from './../qrScanner/QrScanner.js';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons

const Tab = createBottomTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#F6C324',
        inactiveTintColor: 'gray',
        tabBarStyle: {style: { backgroundColor: '#3AA3A0' }},
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // You can customize the icon based on the route name
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'qrScanner') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return your customized icon component
          // Make sure to use an icon library like @expo/vector-icons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="qrScanner" component={QrScanner} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}
