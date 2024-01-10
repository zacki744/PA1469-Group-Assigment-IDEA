import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { TextInput, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from './../../style/style.js'
import { Feather, Entypo } from "@expo/vector-icons";
import { IDFurniture, furnitureID } from './../../src/javascript.js'

const getImagePath = () => {
  // Perform your image lookup logic here
  // If lookup fails, return the default path
  return require('./../../assets/better_lamp.png'); // Adjust the default path as needed
};

const furnitureImages = {
  'Bestå': require('./../../assets/BESTÅ_logga.png'),
  'Älvdalen': require('./../../assets/älvdalen_thumbnail-1.png'),
  'Alex': require('./../../assets/Alex_thumbnail.png'),
  'Smussla': require('./../../assets/smussla_thumbnail-1.png'),
  'Vittsjö': require('./../../assets/VITTSJÖ_thumbnail-1.png')
};

export default function Search() {
  const [state, setState] = useState({ search: '', clicked: false });
  const { search, clicked } = state;
  const navigation = useNavigation(); // Get navigation object
  const [filteredFurniture, setFilteredFurniture] = useState(furnitureImages);


  const setClicked = (ifClicked) => {
    setState({ ...state, clicked: ifClicked });
  }
  
  const updateSearch = (text) => {
    const filteredItems = Object.keys(furnitureImages).filter(item =>
      item.toLowerCase().includes(text.toLowerCase()) || furnitureID[item].includes(text)
    );
    setState({ ...state, search: text });
    setFilteredFurniture(filteredItems);
  };

  const handleFurnitureClick = (furniture) => {
    //check if search variable exists in furnitureID or furnitureImages
    //if it does, set the search variable to the furnitureID
    //else, set the search variable to the furniture
    const filterId = Object.keys(IDFurniture).filter(item =>
      item.toLowerCase().includes(furniture.toLowerCase())
    );
    try {
      if (filteredFurniture.includes(furniture)) {
        setClicked(false);
        updateSearch(furniture);
        // Navigate to ProduktView with the selected furniture
        navigation.navigate('ProduktViewSearch', { ProductName: furniture });
      } else if (filteredFurniture.includes(IDFurniture[filterId.at(0)])) {
        setClicked(false);
        updateSearch(IDFurniture[filterId.at(0)]);
        // Navigate to ProduktView with the selected furniture
        navigation.navigate('ProduktViewSearch', { ProductName: IDFurniture[filterId.at(0)] });
      } else if (filteredFurniture.length > 0) {
        setClicked(false);
        updateSearch(filteredFurniture.at(0));
        // Navigate to ProduktView with the selected furniture
        navigation.navigate('ProduktViewSearch', { ProductName: filteredFurniture.at(0) });
      } else if (filterId.length > 0) {
        furniture = filterId.at(0);
        setClicked(false);
        updateSearch(furniture);
        // Navigate to ProduktView with the selected furniture
        navigation.navigate('ProduktViewSearch', { ProductName: furniture });
      }
      else {
        alert("No such product exists");
        return;
      }
    }
    catch (error) {
      alert("Error: " + error);
      return;
    }
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
              updateSearch(search);
              handleFurnitureClick(search);
            }} 
            />
            )}

          {/* Input field */}
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={search}
            onChangeText={(text) => {
              setClicked(true);
              updateSearch(text);
            }}
            onFocus={() => setClicked(true)}
            onSubmitEditing={() => handleFurnitureClick(search)}
          />

        </View>
      </View>
     {/* Display the filtered furniture list */}
     {clicked && filteredFurniture.length > 0 && (
      <View style={{ flex: 1, margin: -30, marginTop: 15 }}>
        <FlatList
          data={filteredFurniture}
          keyExtractor={(item) => item.toString()}
          numColumns={2} // Change this to the number of columns you want
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleFurnitureClick(item)}>
              <Image source={furnitureImages[item]} style={{width: 150, height: 200, margin: 10, marginTop: 20}} />
              <Text style={{textAlign: 'center'}}>{furnitureID[item]}</Text>
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
