import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { storage } from './../../firebaseConfig.js';
import { CustomButton } from './../obj/Button.js';
//import { styles } from './../../style/style.js';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { AntDesign } from '@expo/vector-icons';



function FileURLFind(produktID) {
  var pdf;
  switch (produktID) {
    case 'Bestå':
      pdf = "gs://idea-5a667.appspot.com/manuals/IKEA_BESTA_Instructions_Manual___Manualzz";
      break;
    case 'Älvdalen':
      pdf = "gs://idea-5a667.appspot.com/manuals/aelvdalen-3-sits-baeddsoffa-knisa-moerkgra__AA-2361755-1-2";
      break;
    case 'Alex':
      pdf = "gs://idea-5a667.appspot.com/manuals/alex-skrivbord-vit__AA-2241984-6-2.pdf";
      break;
    case 'Smussla':
      pdf = "gs://idea-5a667.appspot.com/manuals/smussla-bedside-table-shelf-unit-white__AA-2230202-2-2";
      break;
    case 'Vittsjö':
      pdf = "gs://idea-5a667.appspot.com/manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2";
      break;
    default:
      pdf = "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2";
      break;
  }
  return pdf;
}

export default function PDF_View({ produktID, setredirectAbles }) {
  const folderReference = ref(storage, FileURLFind(produktID));
  const [imageUris, setImageUris] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    try {
      const imagesRef = ref(folderReference);
      const imageList = await listAll(imagesRef);

      const images = await Promise.all(
        imageList.items.map(async (imageRef) => {
          const url = await getDownloadURL(imageRef);
          return url;
        })
      );

      setImageUris(images);
      setLoading(false);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleNextPage = () => {
    if (currentImageIndex < imageUris.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : imageUris.length > 0 ? (
        <>
          <Text style={styles.count}>{`Page ${currentImageIndex + 1} of ${imageUris.length}`}</Text>
          <Image
            style={styles.webView}
            source={{ uri: imageUris[currentImageIndex] }}
          />
          <View style={styles.arrowsContainer}>
            <TouchableOpacity style={styles.arrow} onPress={handlePrevPage}>
              <AntDesign name="leftcircleo" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrow} onPress={handleNextPage}>
              <AntDesign name="rightcircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>No images found</Text>
      )}
      <View style={styles.button}>
        <CustomButton style={{alignContent: 'center'}}
          title="Back"
          onPress={() => {
            // redirect to my account
            setredirectAbles(0);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  arrowsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1, // Ensure arrows are above WebView
  },
  arrow: {
    padding: 16,
  },
  count: {
    backgroundColor: 'white',
    alignContent: 'center'
  }
});