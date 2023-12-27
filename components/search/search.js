import React, { useState, useEffect } from "react";
import { TextInput, View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from './../../style/style.js'
import { Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


export default function Search() {
  const [state, setState] = useState({ search: '', clicked: false });
  const { search, clicked } = state;
  const avalibleFurniture = ['Bestå', 'Älvdalen', 'Alex', 'Smussla', 'Vittsjö'];
  const [filteredFurniture, setFilteredFurniture] = useState(avalibleFurniture);
  const navigation = useNavigation(); // Get navigation object

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
    // Navigate to ProduktView with the selected furniture
    navigation.navigate('ProduktViewSearch', { ProductName: furniture });
  };
  
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
            onPress={() => handleFurnitureClick(search)}
            
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
}
