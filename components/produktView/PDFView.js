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
    case 'Bestå':
      pdf = "gs://idea-5a667.appspot.com/manuals/IKEA_BESTA_Instructions_Manual___Manualzz.pdf";
      break;
    case 'Älvdalen':
      pdf = "gs://idea-5a667.appspot.com/manuals/aelvdalen-3-sits-baeddsoffa-knisa-moerkgra__AA-2361755-1-2.pdf";
      break;
    case 'Alex':
      pdf = "gs://idea-5a667.appspot.com/manuals/alex-skrivbord-vit__AA-2241984-6-2.pdf";
      break;
    case 'Smussla':
      pdf = "gs://idea-5a667.appspot.com/manuals/smussla-bedside-table-shelf-unit-white__AA-2230202-2-2.pdf";
      break;
    case 'Vittsjö':
      pdf = "gs://idea-5a667.appspot.com/manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf";
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
