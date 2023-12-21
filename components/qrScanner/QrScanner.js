import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from '@rneui/themed';
import { styles } from './../../style/style.js';
import { useNavigation, useIsFocused } from '@react-navigation/native';


export default function QrScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [initialState, setInitialState] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  const avaliableFurniture = ['Bestå', 'Älvdalen', 'Alex', 'Smussla', 'Vittsjö'];

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    const initialNavigationState = navigation.getState();
    setInitialState(initialNavigationState);
  }, [navigation]);

  const handleBarCodeScanned = ({ data }) => {
    for (const obj of avaliableFurniture) {
      if (obj === data) {
        setFurniture(true);
        navigation.navigate('ProduktViewSearch', { produktID: data });
      }
    }
  };
  const handleScanAgain = () => {
    // Reset the entire stack and navigate to 'QrScanner'
    console.log(initialState);
    navigation.reset({
      ...initialState
    });
    setFurniture(false);
    navigation.navigate('qrScanner');
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
