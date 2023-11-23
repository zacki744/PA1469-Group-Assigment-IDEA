// Profile.js
import { Text, View, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './../../style/style.js';
import * as C from './../../style/const.js';
import { CustomButton } from './../obj/Button.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoggedIn } from './LoggedIn.js'; // Update this line


const Tab = createBottomTabNavigator();
import { app } from './../../firebaseConfig.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(app);

async function getUsers(db) {
  const querySnapshot = await getDocs(collection(db, "User"));
  return querySnapshot.docs.map(doc => doc.data());
}

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        await setUsers(getUsers(db));
        console.log(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);

  const handleLogin = () => {
    // Simulating a login action - replace this with your actual authentication logic
    // For demo purposes, if email and password are not empty, consider the user as logged in
    if (email !== '' && password !== '') {
      console.log(email + ' ' + password);
      console.log(users._j);
      for (const element of users._j) {
        console.log(element);
        if (element.Name === email && element.Password === password) {
          setUser(element);
          setIsLoggedIn(true);
          return;
        }
      }
      console.log('Incorrect email or password');
    }
  };
  


  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <CustomButton title="Login" onPress={handleLogin} style={{ backgroundColor: C.SECONDARY_COLOR }} /> 
      </View>
    );
  } else {
    return <LoggedIn 
      user = {user} 
      setIsLoggedIn = {setIsLoggedIn} 
      setEmail ={setEmail} 
      setPassword={setPassword}
      />;
  }
}
