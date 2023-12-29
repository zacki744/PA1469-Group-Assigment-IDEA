import { Text,View,Dimensions,ImageBackground, TouchableOpacity } from 'react-native';
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
  const imageSource = furnitureImages[furnitureName];

  // Check if the image source is available
  if (!imageSource) {
    console.error(`Image source not found for furnitureName: ${furnitureName}`);
    return null;
  }
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
    const borderRadius = 20;
  
    const twoP = screenHeight * 0.02;

    return (
      <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: twoP, right: twoP }}>
        <View style={{ borderRadius: 20, overflow: 'hidden' }}>
          <ImageBackground source={imageSource} 
            style={{
              ...styles.searchImage,
              height: screenHeight * 0.229,
              width: screenWidth * 0.35,
              borderRadius: borderRadius }}>
          </ImageBackground>
        </View>
        <View style={{ marginTop: screenHeight * 0.01, marginLeft: screenWidth * 0.3, position: 'absolute' }}>
          <AntDesign name="arrowsalt" size={screenHeight * 0.02} color="black" />
        </View>
      </TouchableOpacity>
    );
  }
