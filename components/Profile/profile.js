import { View, TextInput, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './../../style/style.js';
import * as C from './../../style/const.js';
import { CustomButton } from './../obj/Button.js';
import { LoggedIn } from './LoggedIn.js';
import CreatingAcc from './redirectables/CreatingAcc.js';
import { db, auth } from './../../firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Remove initializeAuth from here

const getImagePath = () => {
  // Perform your image lookup logic here
  // If lookup fails, return the default path
  return require('./../../assets/default-profile-picture.jpg'); // Adjust the default path as needed
};

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [CreatingAccount, setCreatingAccount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user from AsyncStorage:', error);
      }
    };
  
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setIsLoggedIn(true);
  
        // Use getUser from Firebase Authentication to get user details
        try {
          const userQuery = query(collection(db, 'User'), where('UID', '==', authUser.uid));
          const querySnapshot = await getDocs(userQuery);
          const userData = querySnapshot.docs.map((doc) => doc.data())[0];
  
          // Save user and details to AsyncStorage
          AsyncStorage.setItem('user', JSON.stringify(userData));
  
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    });
  
    fetchData();
  
    return () => unsubscribe(); // Cleanup the auth state listener
  }, []);

  function createAccount() {
    console.log('create account');
    setCreatingAccount(1);
  }

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // Fetch user details from Firestore
      const userQuery = query(collection(db, 'User'), where('UID', '==', loggedInUser.uid));
      const querySnapshot = await getDocs(userQuery);
      const userData = querySnapshot.docs.map((doc) => doc.data())[0];

      // Save user and details to AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        // Network request failed
        // Display a message to the user
        alert('Network error. Please check your internet connection and try again.');
      } else if (error.code === 'auth/invalid-login-credentials') {
        // User not found
        // Display a message to the user
        alert('Incorrect email or password');
      }
      else {
        // Handle other error cases
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      // Remove user from AsyncStorage
      AsyncStorage.removeItem('user');

      setIsLoggedIn(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        // Network request failed
        // Display a message to the user
        alert('Network error. Please check your internet connection and try again.');
      } else {
        // Handle other error cases
        alert('An error occurred. Please try again later.');
      }
    }
  };

  if (CreatingAccount === 1) {
    return <CreatingAcc setCreatingAccount={setCreatingAccount} db={db} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />;
  }

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, backgroundColor: C.PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' }}>
        
        <View style={{ backgroundColor: C.SECONDARY_COLOR, width: '80%', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <View style={{ backgroundColor: C.Y_PRIMARY, height: 5, width: '80%', marginTop: 65, marginBottom: 20, position: 'absolute', borderRadius: 40 }} />
          <View style={{
            backgroundColor: C.Y_PRIMARY,
            height: 110,
            width: 110,
            marginTop: 16,
            marginBottom: 20,
            position: 'absolute',
            borderRadius: 60,
          }} />
          <Image
            source={getImagePath()}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
              borderRadius: 50,

            }}
          />

          <Text style={{ fontSize: 30, color: C.WHITE_COLOR, marginBottom: 20 }}>Sign In</Text>
          <View style={{...styles.inputView, width: '100%'}}>
            <TextInput style={styles.TextInput} placeholder="Email" onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={{...styles.inputView, width: '100%'}}>
            <TextInput
              style={{...styles.TextInput }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <CustomButton title="Sign In" onPress={handleLogin} style={{ backgroundColor: C.Y_PRIMARY, marginTop: 20 }} />
          <CustomButton title="Create Account" onPress={createAccount} style={{ margin: 20 }} />
        </View>
      </View>
    );
  } else {
    return <LoggedIn user={user} handleLogout={handleLogout} />;
  }
}
