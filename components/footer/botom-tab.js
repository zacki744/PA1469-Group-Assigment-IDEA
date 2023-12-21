// MyTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './../Profile/profile.js';
import Search from '../search/search.js';
import QrScanner from './../qrScanner/QrScanner.js';
import ProduktView from './../produktView/produktView.js';
import PDF_View from './../produktView/PDFView.js';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchMain" // Rename to avoid conflicts
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProduktViewSearch" // Rename to avoid conflicts
        component={ProduktView}
        options={{
          headerShown: true,
          title: 'Details',
        }}
      />
      <Stack.Screen
        name="PDF_ViewSearch" // Rename to avoid conflicts
        component={PDF_View}
        options={{
          headerShown: true,
          title: 'PDF View',
        }}
      />
    </Stack.Navigator>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#F6C324',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#8AE2E0',
          borderRadius: 5,
          height: 60,
          padding: 5,
          margin: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'qrScanner') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Search" component={SearchStack} options={{ headerShown: false }} />
      <Tab.Screen name="qrScanner" component={QrScanner} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}
