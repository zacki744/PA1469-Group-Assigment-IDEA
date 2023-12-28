import React from "react";
import {Text, View,} from "react-native";
import {styles} from './../../style/style.js'
import {CustomButton_Y} from '../obj/Button.js';
import { useNavigation } from '@react-navigation/native';



export function Receipt({ route }){
    const { ProductName } = route.params;
    const navigation = useNavigation(); // Get navigation object
    const goBackTwoSteps = () => {
        navigation.goBack();
        navigation.goBack();
      };
    return(
        <View style={styles.container_w}>
            
            <View style={[styles.container_b, {flexDirection: 'column', width: '100%', height: '70%'}]}>
                
                <Text style={[{marginTop: -120, marginLeft: 0}, styles.tame_heading]}>
                    {"Thank you for contacting us regarding the issue.\nWe will respond as soon as possible. :) \n\nIssue ticket #330213"}
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