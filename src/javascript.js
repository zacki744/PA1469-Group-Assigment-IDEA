import AsyncStorage from '@react-native-async-storage/async-storage';

export const furnitureID = {
    'Bestå': '180.473.62',
    'Älvdalen': '200.114.08',
    'Alex': '302.130.76',
    'Smussla': '404.539.24',
    'Vittsjö': '502.146.78'
};
//as above but reversed, so that you can search with
export const IDFurniture = {
    '180.473.62': 'Bestå',
    '200.114.08': 'Älvdalen',
    '302.130.76': 'Alex',
    '404.539.24': 'Smussla',
    '502.146.78': 'Vittsjö'
}

//functons for logic
export const saveSearchHistory = async (item) => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    const historyList = history ? JSON.parse(history) : [];
    const isItemExists = historyList.some((entry) => entry.item === item);

    if (!isItemExists) {
      historyList.push({ item, date: new Date().toISOString() });
      await AsyncStorage.setItem('searchHistory', JSON.stringify(historyList));
    }
  } catch (error) {
    // Error saving data
    alert('Error saving search history');
    }
};
export const getSearchHistory = async () => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    return [];
  }
};

export const deleteHistoryItem = async (itemToDelete) => {
  try {
    let history = await AsyncStorage.getItem('searchHistory');
    let historyList = history ? JSON.parse(history) : [];
    historyList = historyList.filter(item => item.date !== itemToDelete.date);
    await AsyncStorage.setItem('searchHistory', JSON.stringify(historyList));
    return historyList;
  } catch (error) {
    return [];
  }
};

//User functions 
export const removeUserFromAsyncStorage = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      await AsyncStorage.removeItem('user');
    }
  } catch (error) {
    if(error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  }
};

export const saveUserToAsyncStorage = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to AsyncStorage:', error);
  }
};
