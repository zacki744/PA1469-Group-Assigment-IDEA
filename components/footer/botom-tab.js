import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './../Profile/profile.js'
import Search from '../search/search.js'
import QrScanner from './../qrScanner/QrScanner.js'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: '#3AA3A0',
        inactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#3AA3A0' }, // Use tabBarStyle
      }}>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="qrScanner" component={QrScanner} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}
