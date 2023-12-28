import { Text,View,Image,ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from './../../style/style.js';
import { AntDesign } from '@expo/vector-icons';

const furnitureImages = {
  'Bestå': require('./../../assets/BESTÅ_logga.png'),
  'Älvdalen': require('./../../assets/älvdalen_thumbnail-1.png'),
  'Alex': require('./../../assets/Alex_thumbnail.png'),
  'Smussla': require('./../../assets/smussla_thumbnail-1.png'),
  'Vittsjö': require('./../../assets/VITTSJÖ_thumbnail-1.png')
};


export function CustomButton({ title, onPress, style }) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  export function CustomButton_Y({ title, onPress, style }) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonContainer_Y, style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }


  export function CustomImageButton({ furnitureName, onPress }) {
    return (
      <TouchableOpacity onPress={onPress} style={{marginLeft: 130, marginTop: -195}}>
        <View style={{borderRadius: 20, overflow: 'hidden'}}>
          <ImageBackground source={furnitureImages[furnitureName]} style={{...styles.searchImage, height: 200, width: 150}}>
          </ImageBackground>
        </View>
        <View style={{marginLeft: 125,  marginTop:5, position: 'absolute'}}>
          <AntDesign name="arrowsalt" size={20} color="black" />
        </View>
      </TouchableOpacity>
    );
  }
﻿
