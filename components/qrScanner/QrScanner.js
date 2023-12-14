import { StyleSheet, Text, View } from 'react-native';
import React , { useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from '@rneui/themed';
import { styles } from './../../style/style.js'
import { ProduktView } from './../produktView/produktView.js';
import PDF_View from './../produktView/PDFView.js';


export default function QrScanner() {
  const [hasPermision, setHasPermision] = React.useState(false);
  const [scanData, setScandata] = React.useState();
  const [redirectAbles, setredirectAbles] = React.useState(0);
  const [furniture, setFurniture] = React.useState('');
  const avalibleFurniture = [
    'Bestå',
    'Älvdalen',
    'Alex',
    'Smussla',
    'Vittsjö'
  ];
  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermision(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScandata(data);
    for (const obj of avalibleFurniture) 
    {
      if (obj === data) {
        setScandata()
        setFurniture(data)
        setredirectAbles(1);
      }
    }
  }

  if (!hasPermision) {
    return (
      <View>
        <Text>Plese grant camera permision to the app.</Text>
      </View>
    );
  }
  if (redirectAbles === 1) {
    return (
      <ProduktView produktID={furniture} setredirectAbles={setredirectAbles} />
    );
  } else if (redirectAbles === 2) {
    return (
      <PDF_View produktID={furniture} setredirectAbles={setredirectAbles} />
    );
  } else {
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
}