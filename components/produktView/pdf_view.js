import React from 'react';
import { Button, Linking } from 'react-native';

const PDFViewer = ({ pdfUrl }) => {
  const handlePress = async () => {
    console.log(pdfUrl)
    //const supported = await Linking.canOpenURL(pdfUrl);
    if (supported) {
      await Linking.openURL(pdfUrl);
    } else {
      console.log(`Don't know how to open this URL: ${pdfUrl}`);
    }
  };

  return <Button title="Open PDF" onPress={handlePress} />;
};

export default PDFViewer;
