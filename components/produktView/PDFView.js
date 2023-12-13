import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as OpenAnything from 'react-native-openanything';
import { storage } from './../../firebaseConfig.js';
import { ref, getDownloadURL } from 'firebase/storage';
import { CustomButton } from './../obj/Button.js';
import { styles } from './../../style/style.js';

function FileURLFind(produktID) {
  var pdf;
  switch (produktID) {
    case '1':
      pdf = "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf";
      break;
    case '2':
      pdf = "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf";
      break;
    case '3':
      pdf = "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf";
      break;
    case '4':
      pdf = "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf";
      break;
    default:
      pdf = "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf";
      break;
  }
  return pdf;
}

export default function PDFView({ produktID, setredirectAbles }) {
  const pathReference = ref(storage, FileURLFind(produktID));
  const [pdfUri, setPdfUri] = useState(null);

  const loadPdf = async () => {
    try {
      const pdfUrl = await getDownloadURL(pathReference);
      setPdfUri(pdfUrl);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  useEffect(() => {
    loadPdf();
  }, []);

  const openPdf = () => {
    if (pdfUri) {
      OpenAnything.Pdf(pdfUri);
    } else {
      console.warn("PDF URI is not available yet");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {pdfUri ? (
        <View>
          <Text>PDFView</Text>
          <CustomButton
            title="Open PDF"
            onPress={openPdf}
          />
        </View>
      ) : (
        <Text>Loading PDF...</Text>
      )}

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
