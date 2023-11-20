import React, { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { styles } from './../../style/style.js'
import { Feather, Entypo } from "@expo/vector-icons";
import { CustomButton } from './../obj/Button.js';
import * as c from './../../style/const.js';

export default function Search() {
  const [state, setState] = useState({ search: '', clicked: false });
  const { search, clicked } = state;

  const setClicked = (ifClicked) => {
    setState({ ...state, clicked: ifClicked });
  }

  const updateSearch = (search) => {
    setState({ ...state, search });
  }

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
      {/* Search button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <CustomButton
          title="Search"
          onPress={() => {
            // Simulating a logout action - replace this with your actual authentication logic
            // For demo purposes, we will just set isLoggedIn state to false
            setClicked(false);
          }}
          style={{ backgroundColor: c.Y_PRIMARY }} // Custom button style
        />
      )}
    </View>
  );
}
