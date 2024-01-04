const jestExpoPreset = require('jest-expo/jest-preset');
module.exports = {
  preset: 'react-native',
  ...jestExpoPreset,
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    ...jestExpoPreset.transformIgnorePatterns,
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
