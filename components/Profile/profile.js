import { View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './../../style/style.js';
import * as C from './../../style/const.js';
import { CustomButton } from './../obj/Button.js';
import { LoggedIn } from './LoggedIn.js';
import CreatingAcc from './redirectables/CreatingAcc.js';
import { app } from './../../firebaseConfig.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage'


const db = getFirestore(app);

async function getUsers(db) {
  const querySnapshot = await getDocs(collection(db, 'User'));
  return querySnapshot.docs.map((doc) => doc.data());
}

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
        const fetchedUsers = await getUsers(db);
        setUsers(fetchedUsers);
  
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  function createAccount() {
    console.log('create account');
    setCreatingAccount(1);
  }

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      for (const element of users) {
        console.log(element);
        if (element.Name === email && element.Password === password) {
          AsyncStorage.setItem('user', JSON.stringify(element));
          setUser(element);
          setIsLoggedIn(true);
          return;
        }
      }
      console.log('Incorrect email or password');
    }
  };
  

  const handleLogout = () => {
    AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (CreatingAccount === 1) {
    return <CreatingAcc setCreatingAccount={setCreatingAccount} db={db}  setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>;
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
    return <LoggedIn 
      user={user} 
      handleLogout={handleLogout} 
      />;
  }
}
