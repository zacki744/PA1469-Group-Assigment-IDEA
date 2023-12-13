import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { storage } from './../../firebaseConfig.js';
import { ref, getDownloadURL } from 'firebase/storage';
import { CustomButton } from './../obj/Button.js';
import { styles } from './../../style/style.js';
import PDFViewer from './pdf_view.js';

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

export default function PDF_View({ produktID, setredirectAbles }) {
  const pathReference = ref(storage, FileURLFind(produktID));
  const [pdfUrl, setPdfUrl] = useState(null);

  const loadPdf = async () => {
    try {
      const url = await getDownloadURL(pathReference);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  useEffect(() => {
    loadPdf();
  }, []);

  return (
    <View style={styles.container}>
      {pdfUrl ? (
        <PDFViewer pdfUrl={pdfUrl} />
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
