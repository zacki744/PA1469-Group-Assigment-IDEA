import { Text, View } from 'react-native';
import React from 'react';
import { styles } from '../../style/style.js';
import { CustomButton } from '../obj/Button.js';

export function ProduktView({produktID, setredirectAbles}) {
    return (
        <View style={styles.container_p}>
          <View style={styles.container_3}>
            <Text style={styles.heading}>{produktID}</Text>
          </View>
          <View style={styles.container_2}>
            <Text>produktID</Text>
              <CustomButton
                  title="Pdf"
                  onPress={() => {
                    // redirect to my account
                    setredirectAbles(2);
                  }}
                />
              </View>
            <View style={styles.container_2}>
              <CustomButton
                  title="Back"
                  onPress={() => {
                    // redirect to my account
                    setredirectAbles(0);
                  }}
                />
              </View>
          </View>
      );
}