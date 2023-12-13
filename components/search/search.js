import React, { useState, useEffect } from "react";
import { TextInput, View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from './../../style/style.js'
import { Feather, Entypo } from "@expo/vector-icons";
import { CustomButton } from './../obj/Button.js';
import { ProduktView } from './../produktView/produktView.js';
import PDF_View from './../produktView/PDFView.js';

export default function Search() {
  const [state, setState] = useState({ search: '', clicked: false });
  const { search, clicked } = state;
  const [redirectAbles, setredirectAbles] = useState(0);
  const avalibleFurniture = [
    'Bestå',
    'Älvdalen',
    'Alex',
    'Smussla',
    'Vittsjö'
  ];
  const [filteredFurniture, setFilteredFurniture] = useState(avalibleFurniture);

  const setClicked = (ifClicked) => {
    setState({ ...state, clicked: ifClicked });
  }

  const updateSearch = (search) => {
    const filteredItems = avalibleFurniture.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setState({ ...state, search });
    setFilteredFurniture(filteredItems);
  }

  const handleFurnitureClick = (furniture) => {
    setClicked(false);
    updateSearch(furniture);
    setredirectAbles(1); // Assuming you want to redirect to ProduktView
    // You can also add logic to handle PDF_View redirection based on the selected furniture
  }

  if (redirectAbles === 1) {
    return (
      <ProduktView produktID={search} setredirectAbles={setredirectAbles} />
    );
  } else if (redirectAbles === 2) {
    return (
      <PDF_View produktID={search} setredirectAbles={setredirectAbles} />
    );
  } else {
    return (
    <View style={styles.container_p}>
      <View style={styles.searchContainer}>
        <View
          style={
            search !== ''
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
            onPress={() => {
              setredirectAbles(1);
            }}
            
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
      {/* Display the filtered furniture list */}
      {clicked && (
        <FlatList
          data={filteredFurniture}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFurnitureClick(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
  };
}
