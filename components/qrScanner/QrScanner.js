import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from '@rneui/themed';
import { styles } from './../../style/style.js';
import { useNavigation, useIsFocused } from '@react-navigation/native';


export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused(true);

  const avaliableFurniture = ['Bestå', 'Älvdalen', 'Alex', 'Smussla', 'Vittsjö'];
  const handleScanAgain = () => {
    // Reset the stack and navigate to 'qrScanner'
    navigation.reset({
      index: 0,
      routes: [{ name: 'qrScanner' }],
    });
    setFurniture(false);
  };
  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log('Camera permission status:', status);
      setHasPermission(status === 'granted');
    };
  
    checkPermission();
  
    if (isFocused) {
      // Additional logic when the screen is focused
      console.log('Screen is focused');
    } else {
      //handleScanAgain();
    }
  }, [isFocused]);
  


  const handleBarCodeScanned = ({ data }) => {
    console.log('Scanned QR code:', data);
    for (const obj of avaliableFurniture) {
      if (obj === data) {
        setFurniture(true);
        navigation.navigate('ProduktViewQr', { ProductName: data });
      }
    }
  }; 

  if (!hasPermission) {
    return (
      <View>
        <Text>Please grant camera permission to the app.</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={handleBarCodeScanned}
      />
      {furniture && <Button title="Scan again?" onPress={() => handleScanAgain() } />}
    </TouchableOpacity>
  );
}
