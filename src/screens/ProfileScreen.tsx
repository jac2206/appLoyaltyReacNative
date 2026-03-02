import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

export function ProfileScreen({ route, navigation }: Props) {

  const { user, logout } = useAuth();

  const userName = user?.userName ?? '';
  const userEmail = user?.userEmail ?? '';

  const { totalPoints } = route.params;

  const goalPoints = 2000;
  const progressPercentage = (totalPoints / goalPoints) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={require('../../assets/sanji.jpg')}
        style={styles.avatar}
      />

      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.email}>{userEmail}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Puntos acumulados</Text>

        <Text style={styles.points}>
          {totalPoints.toString()} pts
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>

        <Text style={styles.goalText}>
          Meta: {goalPoints.toString()} pts
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.logoutButton]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    padding: 25,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  email: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 16,
    color: '#64748B',
  },

  points: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2563EB',
    marginVertical: 10,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#DBEAFE',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },

  goalText: {
    marginTop: 8,
    fontSize: 12,
    color: '#64748B',
  },

  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    marginBottom: 15,
    alignItems: 'center',
  },

  logoutButton: {
    backgroundColor: '#DC2626',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});