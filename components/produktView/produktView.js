import { Text, View } from 'react-native';
import React from 'react';
import { styles } from '../../style/style.js';
import { CustomButton } from '../obj/Button.js';
import { useNavigation } from '@react-navigation/native';


export default function ProduktView({ route }) {
  const { produktID } = route.params;
  const navigation = useNavigation();

  const handlePdfButtonClick = () => {
    // Navigate to PDF_View with the selected produktID
    navigation.navigate('PDF_ViewSearch', { produktID: produktID });
  };

  return (
    <View style={styles.container_p}>
      <View style={styles.container_3}>
        <Text style={styles.heading}>{produktID}</Text>
      </View>
      <View style={styles.container_2}>
        <Text>{produktID}</Text>
        <CustomButton
          title="Pdf"
          onPress={handlePdfButtonClick}
        />
      </View>
    </View>
  );
}
