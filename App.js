// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './src/components/HomeScreen';
import RecordRentalScreen from './src/components/RecordRentalScreen';
import MarketplaceScreen from './src/components/MarketPlaceScreen';

// Create the stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Car Rental Home' }}
        />
        <Stack.Screen 
          name="RecordRental" 
          component={RecordRentalScreen}
          options={{ title: 'Record Rental' }}
        />
        <Stack.Screen 
          name="Marketplace" 
          component={MarketplaceScreen}
          options={{ title: 'Marketplace' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
