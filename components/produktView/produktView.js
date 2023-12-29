import { Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from '../../style/style.js';
import { useNavigation } from '@react-navigation/native';
import { CustomButton_Y,CustomImageButton} from '../obj/Button.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getImagePath = () => {
  // Perform your image lookup logic here
  // If lookup fails, return the default path
  return require('./../../assets/noun-allen-set-1400418.png'); // Adjust the default path as needed
};

const saveSearchHistory = async (item) => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    const historyList = history ? JSON.parse(history) : [];
    const isItemExists = historyList.some((entry) => entry.item === item);

    if (!isItemExists) {
      historyList.push({ item, date: new Date().toISOString() });
      await AsyncStorage.setItem('searchHistory', JSON.stringify(historyList));
    }
  } catch (error) {
    // Error saving data
    console.log('Error saving data:', error);
  }
};

export default function ProduktView({ route }) {
  const { ProductName } = route.params;
  const navigation = useNavigation();
  const furnitureID = {
    'Bestå': '180.473.62',
    'Älvdalen': '200.114.08',
    'Alex': '302.130.76',
    'Smussla': '404.539.24',
    'Vittsjö': '502.146.78'
  };
  saveSearchHistory(ProductName);

  return (
    <View style={styles.container_w}>
        <Text style={styles.heading}>{ProductName}</Text>
        
      <View style={[styles.container_b, {flexDirection: 'column'}]}>
        <Text style={{marginLeft: 25}}>Product ID</Text>
        <Text style={[styles.heading, {marginLeft: 25}]}>{furnitureID[ProductName]}</Text>
        <Text style={{marginLeft: 40}}>Tools</Text>
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
              navigation.navigate(
                'Support', 
                { 
                  ProductName: ProductName,
                  ProductID: furnitureID[ProductName]
                }
              );;
            }}
          />
          </View>        
         <CustomImageButton
            furnitureName={ProductName}
            onPress={() => {
              // redirect to my account
              navigation.navigate('PDF_ViewSearch', { ProductName: ProductName });
            }}
          />
      </View>
    </View>
);
}
