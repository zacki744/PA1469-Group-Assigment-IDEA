import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
export function AppNavigation({Name, Component}) {
    return (
        <Tab.Navigator>
          <Tab.Screen name={Name} component={Component} />
        </Tab.Navigator>
    );
  }