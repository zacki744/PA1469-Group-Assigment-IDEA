import { Text, View, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from './../../style/style.js'



export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulating a login action - replace this with your actual authentication logic
    // For demo purposes, if email and password are not empty, consider the user as logged in
    if (email !== '' && password !== '') {
      setIsLoggedIn(true);
    }
  };
  function LoggedIn() {
    return (
      <View style={styles.container_p}>
        <View style={styles.container_1}>

          <Text style={styles.heading}>Welcome to Your Home</Text>
        </View>
        <View style={styles.container_1}>
          <View style={styles.container_2}>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
          <View style={styles.container_2}>
            <Button
              style={styles.buttonContainer}
              title="Logout"
              onPress={() => {
                // Simulating a logout action - replace this with your actual authentication logic
                // For demo purposes, we will just set isLoggedIn state to false
                setEmail('');
                setPassword('');
                setIsLoggedIn(false);
              }}
            ></Button>
          </View>
        </View>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <Button 
          style={styles.buttonContainer} 
          title="Login" 
          onPress={handleLogin} />
        </View>
    );
  } else {
    return <LoggedIn /> ;
  }
}
