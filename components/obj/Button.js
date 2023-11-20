
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './../../style/style.js';

export function CustomButton({ title, onPress, style }) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }