import { Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../style/style.js';
import { CustomButton } from '../obj/Button.js';

export function ProduktView({produktID, ImmageName, setredirectAbles}) {
    return (
        <View style={styles.container_p}>
          <View style={styles.container_3}>
            <Text style={styles.heading}>Produkt name</Text>
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