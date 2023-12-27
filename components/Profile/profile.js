import { View, TextInput } from 'react-native';
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

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
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
      console.error('Error logging in:', error);
      console.log('Incorrect email or password');
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
      console.error('Error logging out:', error);
    }
  };

  if (CreatingAccount === 1) {
    return <CreatingAcc setCreatingAccount={setCreatingAccount} db={db} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />;
  }

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
        <CustomButton title="Create Account" onPress={createAccount} style={{ backgroundColor: C.GREY_COLOR, margin: 20 }} />
      </View>
    );
  } else {
    return <LoggedIn user={user} handleLogout={handleLogout} />;
  }
}
