import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

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
    </Stack.Navigator>
  );
}