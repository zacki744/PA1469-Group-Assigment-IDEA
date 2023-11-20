// Profile.js
import { Text, View, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './../../style/style.js';
import * as C from './../../style/const.js';
import { CustomButton } from './../obj/Button.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Saved from './redirectables/Saved.js';
import AccountDetails from './redirectables/accountDetails.js';


const Tab = createBottomTabNavigator();


export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulating a login action - replace this with your actual authentication logic
    // For demo purposes, if email and password are not empty, consider the user as logged in
    if (email !== '' && password !== '') {
      setIsLoggedIn(true);
    }
  };

  const getImagePath = () => {
    // Perform your image lookup logic here
    // If lookup fails, return the default path
    return require('./../../assets/default-profile-picture.jpg'); // Adjust the default path as needed
  };

  function LoggedIn() {
    return (
      <View style={styles.container_p}>
        <View style={styles.container_3}>
          <Image source={getImagePath()} style={styles.profilePicture} />
          <Text style={styles.heading}>Stevo jobs</Text>
        </View>
        <View style={styles.container_1}>
        <View style={styles.container_2}>
          <CustomButton
              title="My account"
              onPress={() => {
                // redirect to my account
                navigation.navigate('AccountDetails')
              }}
            />
          </View>
          <View style={styles.container_2}>
            <CustomButton
              title="History"
              onPress={() => {
                // redirect to history
                navigation.navigate('Saved')
              }}
            />
          </View>
          <View style={styles.container_2}>
            <CustomButton
              title="Logout"
              onPress={() => {
                // Simulating a logout action - replace this with your actual authentication logic
                // For demo purposes, we will just set isLoggedIn state to false
                setEmail('');
                setPassword('');
                setIsLoggedIn(false);
              }}
              style={{ backgroundColor: C.Y_PRIMARY }} // Custom button style
            />
          </View>
        </View>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <CustomButton title="Login" onPress={handleLogin} style={{ backgroundColor: C.SECONDARY_COLOR }} /> 
      </View>
    );
  } else {
    return <LoggedIn />;
  }
}
