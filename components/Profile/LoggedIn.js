import { Text, View, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './../../style/style.js';
import * as C from './../../style/const.js';
import { CustomButton } from './../obj/Button.js';

const getImagePath = () => {
    // Perform your image lookup logic here
    // If lookup fails, return the default path
    return require('./../../assets/default-profile-picture.jpg'); // Adjust the default path as needed
  };

export function LoggedIn({ user, setIsLoggedIn, setEmail, setPassword }) {
    const handleLogout = () => {
      // Handle logout action
      // For demo purposes, we will just set isLoggedIn state to false
      setEmail('');
      setPassword('');
      setIsLoggedIn(false);
    };
    return (
        <View style={styles.container_p}>
          <View style={styles.container_3}>
            <Image source={getImagePath()} style={styles.profilePicture} />
            <Text style={styles.heading}>{user.Name}</Text>
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
                  handleLogout();
                }}
                style={{ backgroundColor: C.Y_PRIMARY }} // Custom button style
              />
            </View>
          </View>
        </View>
      );
}