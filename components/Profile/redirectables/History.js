import { Text, View, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../style/style.js';
import { CustomButton } from '../../obj/Button.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSearchHistory, deleteHistoryItem } from './../../../src/javascript.js'

export function History() {
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // New state for refresh control
  const navigation = useNavigation();

  const fetchHistory = async () => {
    try {
      const historyData = await getSearchHistory();
      setHistory(historyData);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchHistory().then(() => setRefreshing(false));
  }, []);

  const handleFurnitureClick = (furniture) => {
    navigation.navigate('PDF_ViewProfile', { ProductName: furniture });
  };

  const deleteHistoryItem = async (itemToDelete) => {
    try {
      let history = await AsyncStorage.getItem('searchHistory');
      let historyList = history ? JSON.parse(history) : [];
      historyList = historyList.filter(item => item.date !== itemToDelete.date);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(historyList));
    } catch (error) {
      return [];
    }
  };

  return (
    <View style={{...styles.container_p, marginBottom: 15}}>
      <View style={styles.container_3}>
        <Text style={styles.heading}>History</Text>
      </View>
      {/* Display search history */}
      <FlatList
        data={history}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.historyItemContiner} onPress={() => handleFurnitureClick(item.item)}>
            <View style={{...styles.container_2, width: '95%'}}>
              <Text style={styles.itemName}>{item.item}</Text>
              <Text style={styles.itemDate}>
                {new Date(item.date).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </Text>
              <CustomButton
                style={styles.historyItemDelete} title="Delete"
                onPress={() => { try {setHistory(deleteHistoryItem(item))} catch{alert('error deleting object')}}}
              />
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );  
}

