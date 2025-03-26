// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Rental Marketplace</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RecordRental')}
      >
        <Text style={styles.buttonText}>Record Rental</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Marketplace')}
      >
        <Text style={styles.buttonText}>View Marketplace</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f0f0f0', // Light gray background for a modern feel
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#BB0000', // OSU Scarlet
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#BB0000', // OSU Scarlet for buttons
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    // Add shadow for modern elevation (iOS and Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  }
});

export { styles };
