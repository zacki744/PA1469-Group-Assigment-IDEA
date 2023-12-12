import React, { useState, useEffect } from "react";
import { TextInput, View, Text } from "react-native";
import { styles } from "./../../style/style.js";
import { Feather, Entypo } from "@expo/vector-icons";
import { CustomButton } from "./../obj/Button.js";
import * as c from "./../../style/const.js";
import { collection, getDocs } from "firebase/firestore/lite";


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
/*
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data if needed
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);*/

  const setClicked = (ifClicked) => {
    setState({ ...state, clicked: ifClicked });
  };

  const updateSearch = (search) => {
    setState({ ...state, search });
  };

  return (
    <View style={styles.container_p}>
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
