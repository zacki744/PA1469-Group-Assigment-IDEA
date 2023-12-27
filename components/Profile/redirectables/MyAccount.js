import { Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { styles } from '../../../style/style.js';
import { CustomButton } from '../../obj/Button.js';

export function MyAccount() {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container_p}>
      <View style={styles.container_3}>
        <Text style={styles.heading}>My Account</Text>
      </View>
      <View style={styles.container_2}>
        <CustomButton
          title="Back"
          onPress={() => navigation.goBack()} // Navigate back
        />
      </View>
    </View>
  );
}
