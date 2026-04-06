import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AccumulateScreen } from '../screens/AccumulateScreen';
import { RedeemScreen } from '../screens/RedeemScreen';
import { QRScannerScreen } from '../screens/QRScannerScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        // options={{ title: 'Inicio' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        // options={{ title: 'Perfil' }}
      />
      <Stack.Screen 
        name="QRScanner" 
        component={QRScannerScreen}
        // options={{ title: 'QRScanner' }}
      />
      <Stack.Screen 
        name="Accumulate" 
        component={AccumulateScreen}
        // options={{ title: 'Accumulate' }}
      />
      <Stack.Screen 
        name="Redeem" 
        component={RedeemScreen}
        // options={{ title: 'Redeem' }}
      />
    </Stack.Navigator>
  );
}