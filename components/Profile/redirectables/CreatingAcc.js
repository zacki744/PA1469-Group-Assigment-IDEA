// CreatingAcc.js
import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from '../../../style/style.js';
import * as c from '../../../style/const.js';
import { CustomButton } from '../../obj/Button.js';
import { collection, addDoc } from 'firebase/firestore/lite';


async function createUser(name, email, password, db) {
    // Add logic to create a new user entry in the database
    const userCollection = collection(db, 'User');
    await addDoc(userCollection, {
      Email: email,
      Name: name,
      Password: password,
    });
  }
  

export default function CreatingAcc({ setCreatingAccount, db, setUser, setIsLoggedIn}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = async () => {
    // Check if password and repeat password match
    if (password !== repeatPassword) {
        setError('Passwords do not match');
        return;
    }
    // Call function to create user in the database
    try {
        await createUser(name, email, password, db);
        // Reset fields and navigate back
        setUser({"Name": name, "Password": password})
        setName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
        setIsLoggedIn(true);
        setCreatingAccount(0);
    } catch (error) {
        setError('Error creating account');
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
          setCreatingAccount(0);
        }}
      />
    </View>
  );
}
