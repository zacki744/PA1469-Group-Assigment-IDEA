import React, { useState } from 'react';
import {Text, View,} from "react-native";
import {styles} from './../../style/style.js'
import {CustomButton_Y} from '../obj/Button.js';
import { useNavigation } from '@react-navigation/native';



export function Receipt({ route }){
    const max = 999999;
    const { ProductName } = route.params;
    const { ProductID } = route.params;
    const [ticketNumber, setTicketNumber] = useState(Math.floor(Math.random() * max)); // state to store the issue detail
    const navigation = useNavigation(); // Get navigation object
    const goBackTwoSteps = () => {
        navigation.goBack();
        navigation.goBack();
      };
    return(
        <View style={styles.container_w}>
            <Text style={styles.tame_heading}> {ProductID} </Text>
            <View style={[styles.container_b, {flexDirection: 'column', width: '100%', height: '70%'}]}>
                <Text style={[{marginTop: -120, marginLeft: 0}, styles.tame_heading]}>
                    {"Thank you for contacting us regarding the issue with the product " + ProductName + ".\nWe will respond as soon as possible. :) \n\nIssue ticket #: " + ticketNumber}
                </Text>
                <View style={[{marginTop: -150, marginBottom: -150, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }]}>
                    <CustomButton_Y
                        title="Home"
                            onPress={() => {
                            // redirect to my account
                            goBackTwoSteps();
                        }}
                    />
                </View>
            </View>
        </View>
    
    )

}