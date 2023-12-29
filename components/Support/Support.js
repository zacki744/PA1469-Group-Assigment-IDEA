import React, { useState, useEffect } from "react";
import {Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard} from "react-native";
import { styles } from './../../style/style.js'
import {CustomButton_Y} from '../obj/Button.js';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../firebaseConfig.js';


export function Support({ route }) {
    const { ProductName } = route.params;
    const ProductID = route.params.ProductID;
    const navigation = useNavigation(); // Get navigation object
    const options = ['Overall', 'Broken', 'Missing'];
    const [dropdownVisible, setDropdownVisible] = useState(true); // set initial state to true
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [issueDetail, setIssueDetail] = useState(''); // state to store the issue detail
    const [userEmail, setUserEmail] = useState('');
    const handleButtonClick = () => {
        // Navigate to ProduktView with the selected furniture
        navigation.navigate('Receipt', { ProductName: ProductName });
    };
    useEffect(() => {
        // Set up the listener to track user authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is logged in, store the email in AsyncStorage
            setUserEmail(user.email);
            AsyncStorage.setItem('userEmail', user.email);
          } else {
            // User is not logged in, clear the email from AsyncStorage
            setUserEmail('');
            AsyncStorage.removeItem('userEmail');
          }
        });
    
        // Cleanup the listener when the component is unmounted
        return () => unsubscribe();
    }, []);
    return (
        <View style={styles.container_w}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Text style={styles.tame_heading}> {ProductName} </Text>
        <View style={[styles.container_b, {flexDirection: 'column',  width: '100%', height: '100%'}]}>
            <View style={[styles.container_wb, styles.heading, { height: '10%', marginTop: -200 }]}>
            <Text style={[ {marginLeft: -20}, styles.tame_heading]}>Art. no.</Text>
            <Text style={[ {marginLeft: 25}, styles.tame_heading]}>{ProductID}</Text>
            </View>

            <View style={[styles.container_wb, styles.heading, { alignItems: 'center', height: '10%', marginTop: -200 }]}>
            <Text style={[]}>{userEmail}</Text>
            <View style={[{ marginRight: -30 }, { flexDirection: 'absolute' }]}>
              <FontAwesome5 name="pen" size={24} color="#F6C324" />
            </View>
          </View>

            <View style={[styles.container_wb, styles.heading, { height: '10%', marginTop: -200}]}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
                <Text style={[ {marginLeft: 0}]}>{selectedOption}</Text>
            </TouchableOpacity>
            {dropdownVisible && options.filter(option => option !== selectedOption).map((option, index) => (
                <TouchableOpacity key={index} onPress={() => {setSelectedOption(option); setDropdownVisible(false);}}>
                <Text>{option}</Text>
                </TouchableOpacity>
            ))}
            </View>
            
            <View style={{marginTop: -200, marginBottom: -30, backgroundColor: 'white', borderRadius: 10}}>
            <TextInput
                style={{height: 100,textAlignVertical: 'top', padding: 10}}
                placeholder="Type here in detail, regarding the issue..."
                onChangeText={text => setIssueDetail(text)}
                value={issueDetail}
                multiline={true}
                returnKeyType="done" // Set the return key to "Done"
                onSubmitEditing={Keyboard.dismiss} // Dismiss the keyboard when the "Done" button is pressed
            />
            </View>
            <View style={[{marginTop: -150, marginBottom: -150, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }]}>
            <CustomButton_Y
                title="SEND"
                onPress={() => {
                // redirect to my account
                handleButtonClick();
                }}
            />
            </View>
        </View>
        </KeyboardAvoidingView>
        </View>
    );
}