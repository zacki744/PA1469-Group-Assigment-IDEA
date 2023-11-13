import { View } from 'react-native';
import MyTabs from './components/footer/botom-tab.js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './style/style.js'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.bottomTab}>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </View>

  );
}
