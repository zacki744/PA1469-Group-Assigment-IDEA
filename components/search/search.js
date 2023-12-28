import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { TextInput, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from './../../style/style.js'

import { Feather, Entypo } from "@expo/vector-icons";


const getImagePath = () => {
  // Perform your image lookup logic here
  // If lookup fails, return the default path
  return require('./../../assets/better_lamp.png'); // Adjust the default path as needed
};


export default function Search() {
  const [state, setState] = useState({ search: '', clicked: false });
  const { search, clicked } = state;
  const navigation = useNavigation(); // Get navigation object

  const furnitureImages = {
    'Bestå': require('./../../assets/BESTÅ_logga.png'),
    'Älvdalen': require('./../../assets/älvdalen_thumbnail-1.png'),
    'Alex': require('./../../assets/Alex_thumbnail.png'),
    'Smussla': require('./../../assets/smussla_thumbnail-1.png'),
    'Vittsjö': require('./../../assets/VITTSJÖ_thumbnail-1.png')
  };
  const [filteredFurniture, setFilteredFurniture] = useState(furnitureImages);


  const setClicked = (ifClicked) => {
    setState({ ...state, clicked: ifClicked });
  }

  const updateSearch = (search) => {
    const filteredItems = Object.keys(furnitureImages).filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setState({ ...state, search });
    setFilteredFurniture(filteredItems);
  }

  const handleFurnitureClick = (furniture) => {
    setClicked(false);
    updateSearch(furniture);
    // Navigate to ProduktView with the selected furniture
    navigation.navigate('ProduktViewSearch', { ProductName: furniture });
  };
  
  return (
    
    <View style={styles.container_w}>
      <View style={styles.searchContainer}>
        <View
          style={
            search !== ''
              ? styles.searchBar__clicked
              : styles.searchBar__unclicked
          }
        >
          {/* search Icon */}
          {clicked &&(
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
            onPress={() => {
              // Simulating a logout action - replace this with your actual authentication logic
              // For demo purposes, we will just set isLoggedIn state to false
              setClicked(false);
              setredirectAbles(1);
            }} 
            />
            )}

          {/* Input field */}
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={search}
            onChangeText={updateSearch}
            onFocus={() => {
              setClicked(true);
            }}
            //onSubmitEditing={() => handleFurnitureClick(search)}
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
      <View style={{ flex: 1, margin: -30, marginTop: 15 }}>
      <FlatList
        data={filteredFurniture}
        keyExtractor={(item) => item.toString()}
        numColumns={2} // Change this to the number of columns you want
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFurnitureClick(item)}>
            <Image source={furnitureImages[item]} style={{width: 150, height: 200, margin: 10, marginTop: 20}} />
          </TouchableOpacity>
        )}
      />
      </View>
      )}
      {!clicked && (
        <Image source={getImagePath()} style={{ marginLeft: 7}} />
        )}
    </View>
  );
}
