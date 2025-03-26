// src/screens/MarketplaceScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function MarketplaceScreen() {
  // Dummy data; in a real app, fetch these from your contract or backend.
  const [offers, setOffers] = useState([
    {
      id: 1,
      carMake: 'Toyota',
      carModel: 'Camry',
      location: 'Los Angeles, CA',
      date: '2025-04-01',
      duration: '3 days',
      price: '0.05 ETH'
    },
    {
      id: 2,
      carMake: 'Honda',
      carModel: 'Civic',
      location: 'New York, NY',
      date: '2025-04-05',
      duration: '5 days',
      price: '0.08 ETH'
    }
  ]);

  const purchaseRental = (offer) => {
    // Integrate blockchain purchase logic here
    console.log('Purchasing rental:', offer);
    alert(`Purchased rental for ${offer.carMake} ${offer.carModel}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Marketplace Offers</Text>
      {offers.map((offer) => (
        <View key={offer.id} style={styles.offerCard}>
          <Text style={styles.offerTitle}>
            {offer.carMake} {offer.carModel}
          </Text>
          <Text style={styles.offerDetail}>Location: {offer.location}</Text>
          <Text style={styles.offerDetail}>Date: {offer.date}</Text>
          <Text style={styles.offerDetail}>Duration: {offer.duration}</Text>
          <Text style={styles.offerDetail}>Price: {offer.price}</Text>
          <TouchableOpacity style={styles.button} onPress={() => purchaseRental(offer)}>
            <Text style={styles.buttonText}>Purchase Rental</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0', // light gray background for a modern feel
    alignItems: 'stretch'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#BB0000', // OSU Scarlet
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    // Subtle shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 3,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#BB0000', // OSU Scarlet
  },
  offerDetail: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333'
  },
  button: {
    backgroundColor: '#BB0000', // OSU Scarlet for the button
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    // Shadow for depth
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
  }
});
