import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './components/footer/botom-tab.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200} // Adjust the offset as needed
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MyTabs"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#8AE2E0',
              height: 60,
              elevation: 0,
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
