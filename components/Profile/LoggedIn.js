import { Text, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { styles } from './../../style/style.js';
import * as C from './../../style/const.js';
import { CustomButton } from './../obj/Button.js';

const getImagePath = () => {
  // Perform your image lookup logic here
  // If lookup fails, return the default path
  return require('./../../assets/default-profile-picture.jpg'); // Adjust the default path as needed
};

export function LoggedIn({ user, handleLogout }) {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={{...styles.container_w}}>
      <View style={styles.container_3}>
        {/**Implememt the code here */}
        <Image source={getImagePath()} style={styles.profilePicture} />
        <Text style={styles.heading}>{user.Name}</Text>
      </View>
      <View style={styles.container_1}>
        <View style={styles.container_2}>
          <CustomButton
            title="My account"
            onPress={() => navigation.navigate('Settings')} // Navigate to 'MyAccount'
          />
        </View>
        <View style={styles.container_2}>
          <CustomButton
            title="History"
            onPress={() => navigation.navigate('History')} // Navigate to 'History'
          />
        </View>
        <View style={styles.container_2}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            style={{ backgroundColor: C.Y_PRIMARY }} // Custom button style
          />
        </View>
      </View>
    </View>
  );
}
