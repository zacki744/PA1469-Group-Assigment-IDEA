import { StyleSheet, Text, View } from 'react-native';
import React , { useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from '@rneui/themed';
import { styles } from './../../style/style.js'


export default function QrScanner() {
  const [hasPermision, setHasPermision] = React.useState(false);
  const [scanData, setScandata] = React.useState();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermision(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScandata(data);
    console.log(`Data:  ${data}`)
    console.log(`Type: ${type}`)
  }

  if (!hasPermision) {
    return (
      <View>
        <Text>Plese grant camera permision to the app.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner 
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanData ? undefined : handleBarCodeScanned }
      />
      {scanData && <Button title = 'Scan agein?' onPress={() => setScandata(undefined)}/>}
    </View>
    );
  }