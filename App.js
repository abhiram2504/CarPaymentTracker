// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ethers } from 'ethers';
import CarPaymentTrackerABI from './src/CarPaymentTracker.json';

// Replace with your deployed contract address and a valid RPC endpoint (e.g., Infura or Alchemy)
const CONTRACT_ADDRESS = '0xYourContractAddress';
const RPC_URL = 'https://your-testnet-url';

export default function App() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState('');
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    // For demonstration, we’re using a hardcoded private key to create a signer.
    // NEVER include private keys directly in production apps.
    const initBlockchain = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        const privateKey = '0xYourPrivateKey'; // Use a test account for development only!
        const tempSigner = new ethers.Wallet(privateKey, provider);
        setSigner(tempSigner);
      } catch (error) {
        console.error('Error initializing blockchain connection:', error);
        setMessage('Blockchain initialization failed.');
      }
    };
    initBlockchain();
  }, []);

  const addCar = async () => {
    if (!signer) {
      setMessage('No blockchain signer available.');
      return;
    }
    try {
      // Create a contract instance with the signer to send transactions.
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CarPaymentTrackerABI.abi, signer);
      const tx = await contract.addCar(make, model, parseInt(year));
      await tx.wait();
      setMessage('Car added successfully on blockchain!');
    } catch (error) {
      console.error(error);
      setMessage('Error adding car to blockchain.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Payment Tracker Dapp</Text>
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={make}
        onChangeText={setMake}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <Button title="Add Car" onPress={addCar} />
      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#aaa',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
  },
});
