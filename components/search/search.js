import React, { useState, useEffect } from "react";
import { TextInput, View, Text } from "react-native";
import { styles } from "./../../style/style.js";
import { Feather, Entypo } from "@expo/vector-icons";
import { CustomButton } from "./../obj/Button.js";
import * as c from "./../../style/const.js";
import { app, db, storage } from "./../../firebaseConfig.js";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, downloadBytes } from "firebase/storage";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";

async function getManuals(db) {
  const querySnapshot = await getDocs(collection(db, "Manuals"));
  return querySnapshot.docs.map((doc) => doc.data());
}

export default function Search() {
  const [state, setState] = useState({
    search: "",
    clicked: false,
  });
  const { search, clicked } = state;
  const [manuals, setmanuals] = useState({});
  const pathReference = ref(
    storage,
    "manuals/vittsjoe-hylla-svartbrun-glas__AA-1388480-10-2.pdf"
  );
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data if needed
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const setClicked = (ifClicked) => {
    setState({ ...state, clicked: ifClicked });
  };

  const updateSearch = (search) => {
    setState({ ...state, search });
  };

  const loadPdf = async () => {
    try {
      // Download the PDF from Firebase Storage
      const pdfUrl = await getDownloadURL(pathReference);
      setPdfUri(pdfUrl);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  return (
    <View style={styles.container_p}>
      {pdfVisible ? (
        // Display the PDF using WebView
        <WebView source={{ uri: pdfUri }} />
      ) : (
        // Show the search bar and search button if pdfVisible is false
        <View style={styles.searchContainer}>
          <View
            style={
              search !== ""
                ? styles.searchBar__clicked
                : styles.searchBar__unclicked
            }
          >
            {/* search Icon */}
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1 }}
            />

            {/* Input field */}
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={search}
              onChangeText={updateSearch}
              onFocus={() => {
                setClicked(true);
              }}
            />
            {/* cross Icon, depending on whether the search bar is clicked or not */}
            {clicked && (
              <Entypo
                name="cross"
                size={20}
                color="black"
                style={{ padding: 3, marginLeft: -19 }}
                onPress={() => {
                  updateSearch("");
                  setClicked(false);
                }}
              />
            )}
          </View>
        </View>
      )}
      {clicked && (
        <CustomButton
          title="Search"
          onPress={() => {
            setClicked(false);
            setPdfVisible(true);
            loadPdf();
          }}
          style={{ backgroundColor: c.Y_PRIMARY }}
        />
      )}
    </View>
  );
}
