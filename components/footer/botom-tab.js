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
import CreatingAcc from '../Profile/redirectables/CreatingAcc.js';
import { MyAccount } from '../Profile/redirectables/MyAccount.js';
import { History } from '../Profile/redirectables/History.js';
import { Support } from '../Support/Support.js';
import { Receipt } from '../Support/Receipt.js';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchMain" // Rename to avoid conflicts
        component={Search}
        options={{
          headerShown: true,
          title: 'Search'
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
      <Stack.Screen
        name="Support" // Rename to avoid conflicts
        component={Support}
        options={{
          headerShown: true,
          title: 'Support',
        }}
      />
      <Stack.Screen
        name="Receipt" // Rename to avoid conflicts
        component={Receipt}
        options={{
          headerShown: true,
          title: 'Receipt',
        }}
      />

    </Stack.Navigator>
  );
}

function QrStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QrMain" // Rename to avoid conflicts
        component={QrScanner}
        options={{
          headerShown: true,
          title: 'QR Scanner',
        }}
      />
      <Stack.Screen
        name="ProduktViewQr" // Rename to avoid conflicts
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
      <Stack.Screen
        name="Support" // Rename to avoid conflicts
        component={Support}
        options={{
          headerShown: true,
          title: 'Support',
        }}
      />
      <Stack.Screen
        name="Receipt" // Rename to avoid conflicts
        component={Receipt}
        options={{
          headerShown: true,
          title: 'Receipt',
        }}
      />
    </Stack.Navigator>
  );
}

// stack for profile
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain" // Rename to avoid conflicts
        component={Profile}
        options={{
          headerShown: true,
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="CreateProfile" // Rename to avoid conflicts
        component={CreatingAcc}
        options={{
          headerShown: true,
          title: 'Create Profile',
        }}
      />
      <Stack.Screen
        name="History" // Rename to avoid conflicts
        component={History}
        options={{
          headerShown: true,
          title: 'History',
        }}
      />
      <Stack.Screen
        name="Settings" // Rename to avoid conflicts
        component={MyAccount}
        options={{
          headerShown: true,
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="PDF_ViewProfile" // Rename to avoid conflicts
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
          paddingBottom: 10,
          paddingTop: 10,
          //margin: 5,
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
      <Tab.Screen name="qrScanner" component={QrStack} options={{ headerShown: false }} />
      <Tab.Screen name="profile" component={ProfileStack} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
