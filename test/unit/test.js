import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getSearchHistory } from './components/Profile/redirectables/History.js';
import * as functions from '../../src/javascript.js';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}));

describe('saveSearchHistory Function', () => {
  const fixedDate = new Date('2024-01-01T00:00:00.000Z'); // Example fixed date
  let realDate;

  beforeAll(() => {
    global.Date = jest.fn(() => fixedDate);
  });

  beforeEach(() => {
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
  });

  it('adds a new item to empty history', async () => {
    AsyncStorage.getItem.mockResolvedValue(null); // Simulating no existing history

    await functions.saveSearchHistory('newItem');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('searchHistory', JSON.stringify([{ item: 'newItem', date: fixedDate.toISOString() }]));
  });

  it('adds a new item to existing history', async () => {
    const existingHistory = JSON.stringify([{ item: 'existingItem', date: new Date().toISOString() }]);
    AsyncStorage.getItem.mockResolvedValue(existingHistory);

    await functions.saveSearchHistory('newItem');

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('searchHistory', expect.stringContaining('newItem'));
  });

  it('does not add a duplicate item', async () => {
    const existingHistory = JSON.stringify([{ item: 'existingItem', date: new Date().toISOString() }]);
    AsyncStorage.getItem.mockResolvedValue(existingHistory);

    await functions.saveSearchHistory('existingItem');

    // Ensures setItem is not called since the item already exists
    expect(AsyncStorage.setItem).not.toHaveBeenCalledWith();
  });

  // ... other tests
});
describe('History Component Functions', () => {
  beforeEach(() => {
    // Reset mock calls before each test
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
  });

  it('gets search history from AsyncStorage', async () => {
    const mockData = [{ item: 'Bestå', date: '2023-12-29T12:00:00Z' }];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockData));

    const history = await functions.getSearchHistory(); // Assuming getSearchHistory is exported for testing

    expect(history).toEqual(mockData);
  });

  it('deletes search history item from AsyncStorage', async () => {
    const mockData = [{ item: 'Bestå', date: '2023-12-29T12:00:00Z' }];
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockData));

    await functions.deleteHistoryItem(mockData[0]);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('searchHistory', '[]');
  });
});

describe('User Functions in AsyncStorage', () => {
  beforeEach(() => {
    // Reset mock calls before each test
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
    AsyncStorage.removeItem.mockReset();
  });

  it('adds a new user to AsyncStorage', async () => {
    const newUser = { username: 'testUser', email: 'test@example.com' };

    // Simulate no existing user
    AsyncStorage.getItem.mockResolvedValue(null);

    await functions.saveUserToAsyncStorage(newUser);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(newUser));
  });

  it('modifies an existing user in AsyncStorage', async () => {
    const existingUser = { username: 'oldUser', email: 'old@example.com' };
    const updatedUser = { username: 'newUser', email: 'new@example.com' };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingUser));

    await functions.saveUserToAsyncStorage(updatedUser);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(updatedUser));
  });

  it('removes an existing user from AsyncStorage', async () => {
    const existingUser = { username: 'existingUser', email: 'existing@example.com' };

    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingUser));

    await functions.removeUserFromAsyncStorage();

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('does not remove user if not existing in AsyncStorage', async () => {
    // Reset the mock calls before calling the function
    AsyncStorage.removeItem.mockReset();

    await functions.removeUserFromAsyncStorage();

    expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
  });
});