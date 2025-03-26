// src/screens/RecordRentalScreen.js
import 'react-native-get-random-values'; // Required for ethers.js in React Native
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ethers } from 'ethers';
import { PRIVATE_KEY, RPC_URL, CONTRACT_ADDRESS } from '@env';
// IMPORTANT: Ensure your ABI file contains the recordRental function with six parameters.
import CarRentalMarketplaceABI from '../contracts/CarPaymentTracker.json';

export default function RecordRentalScreen() {
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [rentalLocation, setRentalLocation] = useState('');
  const [rentalDate, setRentalDate] = useState('');
  const [rentalDuration, setRentalDuration] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [message, setMessage] = useState('');

  const recordRental = async () => {
    try {
      // For ethers v6, use: new ethers.JsonRpcProvider(RPC_URL);
      // For ethers v5, use: new ethers.providers.JsonRpcProvider(RPC_URL);
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CarRentalMarketplaceABI, wallet);

      if (typeof contract.recordRental !== 'function') {
        throw new Error('recordRental function not found in the ABI. Please update your ABI file.');
      }

      // Convert duration to a number and price from ETH (string) to wei (BigNumber)
      const durationInDays = parseInt(rentalDuration);
      const priceInWei = ethers.parseEther(rentalPrice);

      // Call the recordRental function on the contract with six parameters.
      const tx = await contract.recordRental(
        carMake,
        carModel,
        rentalLocation,
        rentalDate,
        durationInDays,
        priceInWei
      );
      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      setMessage('Rental recorded on blockchain!');
    } catch (error) {
      console.error('Error recording rental:', error);
      setMessage('Error recording rental on blockchain.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Record a Car Rental</Text>
      <TextInput
        style={styles.input}
        placeholder="Car Make"
        placeholderTextColor="#999"
        value={carMake}
        onChangeText={setCarMake}
      />
      <TextInput
        style={styles.input}
        placeholder="Car Model"
        placeholderTextColor="#999"
        value={carModel}
        onChangeText={setCarModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Rental Location"
        placeholderTextColor="#999"
        value={rentalLocation}
        onChangeText={setRentalLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Rental Date (YYYY-MM-DD)"
        placeholderTextColor="#999"
        value={rentalDate}
        onChangeText={setRentalDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (days)"
        placeholderTextColor="#999"
        value={rentalDuration}
        onChangeText={setRentalDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Price in ETH"
        placeholderTextColor="#999"
        value={rentalPrice}
        onChangeText={setRentalPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={recordRental}>
        <Text style={styles.buttonText}>Record Rental</Text>
      </TouchableOpacity>
      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0', // light gray background for modern look
    alignItems: 'stretch'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#BB0000', // OSU Scarlet
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    // Subtle shadow for depth (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 2,
  },
  button: {
    backgroundColor: '#BB0000', // OSU Scarlet
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    // Shadow for modern depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#006600', // a deep green for success
    textAlign: 'center'
  }
});
