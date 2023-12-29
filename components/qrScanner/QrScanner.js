import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from '@rneui/themed';
import { styles } from './../../style/style.js';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [isScanned, setIsScanned] = useState(false); // New state
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
    setIsScanned(false); // Reset the state when scanning again
  };
  
  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  
    checkPermission();
  
    if (isFocused && isScanned) {
      // Additional logic when the screen is focused and the QR code is already scanned
      console.log('Screen is focused, but QR code is already scanned');
    }
  }, [isFocused, isScanned]);

  const handleBarCodeScanned = ({ data }) => {
    if (!isScanned) { // Check if the QR code is already scanned
      for (const obj of avaliableFurniture) {
        if (obj === data) {
          console.log('Found furniture:', data);
          setFurniture(true);
          navigation.navigate('ProduktViewQr', { ProductName: data });
          return;
        }
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
