import { Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../style/style.js';
import { CustomButton, CustomButton_Y,CustomImageButton} from '../obj/Button.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const getImagePath = () => {
  // Perform your image lookup logic here
  // If lookup fails, return the default path
  return require('./../../assets/noun-allen-set-1400418.png'); // Adjust the default path as needed
};

export function ProduktView({produktID, setredirectAbles}) {
    return (
        <View style={styles.container_w}>

            <Text style={styles.heading}>{produktID}</Text>
            
          <View style={[styles.container_b, {flexDirection: 'column'}]}>
            <Text style={{marginLeft: 25}}>produktID</Text>
            <Text style={[styles.heading, {marginLeft: 25}]}>{produktID}</Text>
            <Text style={{marginLeft: 40}}>Text</Text>
            <View style={[{flexDirection: 'row', justifyContent: 'left', marginLeft: 15}]}>
              <MaterialCommunityIcons name="screwdriver" size={24} color="black" />
              <Ionicons name="md-hammer-outline" size={24} color="black" />
              <Image source={getImagePath()} style={{...styles.searchImage, height: 25, width: 25}} />
            </View>

            <View style={[{marginTop: 20, marginBottom: 15}]}>
            <CustomButton_Y
                title="SUPPORT"
                onPress={() => {
                  // redirect to my account
                  setredirectAbles(3);
                }}
              />
              </View>

            
            <CustomImageButton
                furnitureName={produktID}
                onPress={() => {
                  // redirect to my account
                  setredirectAbles(3);
                }}
              />
              
          </View>
          <View style={styles.container_2}>
            <CustomButton
                title="Back"
                onPress={() => {
                  // redirect to my account
                  setredirectAbles(0);
                }}
              />
          </View>
        </View>
    );
}