import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import ChatBot from './src/components/chatbot/ChatBot';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppNavigator />
      <ChatBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
