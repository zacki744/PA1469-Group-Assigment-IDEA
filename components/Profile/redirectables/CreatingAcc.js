import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../../../style/style.js';
import { CustomButton } from '../../obj/Button.js';
import { collection, addDoc, getFirestore } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from './../../../firebaseConfig.js';

const auth = getAuth(app);
const db = getFirestore(app);

async function createUserInFirestore(name, email, uid) {
  const userCollection = collection(db, 'User');
  await addDoc(userCollection, {
    Name: name,
    Email: email,
    UID: uid, // Assuming UID is a unique identifier for the user
  });
}

async function createUser(name, email, password, auth) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created!', userCredential.user);

    // Write user details to Firestore
    await createUserInFirestore(name, email, userCredential.user.uid);

    return userCredential.user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export default function CreatingAcc({ setCreatingAccount, setUser, setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = async () => {
    // Check if password and repeat password match
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return; // Return early
    }

    // Call function to create user in Firebase Authentication
    try {
      const user = await createUser(name, email, password, auth);

      // Reset fields and navigate back
      setUser({ Name: name, Password: password });
      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setIsLoggedIn(true);
      setCreatingAccount(0);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('Error creating account. Please try again.');
      }

      console.error('Error creating account:', error);
    }
  };

  return (
    <View style={styles.container_p}>
      <View style={styles.container_3}>
        <Text style={styles.heading}>Create Account</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
      />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Repeat Password"
          secureTextEntry={true}
          value={repeatPassword}
          onChangeText={(text) => setRepeatPassword(text)}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <CustomButton
        title="Create Account"
        onPress={handleCreateAccount}
        style={{ backgroundColor: 'green' }}
      />
      <CustomButton style={{margin: 20}}
        title="Back"
        onPress={() => {
          // redirect to login
          setName('');
          setEmail('');
          setPassword('');
          setRepeatPassword('');
          setCreatingAccount(0);
        }}
      />
    </View>
  );
}
