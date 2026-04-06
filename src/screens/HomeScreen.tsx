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
import { ActivityChart } from '../components/ActivityChart';
import { useAuth } from '../context/AuthContext';
import { useBalance } from '../hooks/useBalance';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {

  const { user } = useAuth();
  const { balance } = useBalance();

  const userName = user?.userName ?? '';
  const userEmail = user?.userEmail ?? '';

  const weeklyPoints = [40, 80, 60, 100, 50, 90, 70];
  const goalPoints = 2000;

  const progressPercentage = (balance / goalPoints) * 100;

  function handleOpenProfile() {
    navigation.navigate('Profile');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.userSection}>
        <Pressable
          onPress={handleOpenProfile}
          style={({ pressed }) => [
            pressed && { opacity: 0.6 },
          ]}
        >
          <Image
            source={require('../../assets/sanji.jpg')}
            style={styles.avatar}
          />
        </Pressable>

        <View>
          <Text style={styles.welcome}>Hola 👋</Text>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tus Puntos</Text>

        <Text style={styles.points}>
          {balance.toString()} pts
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

      <ActivityChart data={weeklyPoints} />

      <Text style={styles.sectionTitle}>Aliados</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          {[1,2,3,4].map((item) => (
            <View key={item} style={styles.partnerCard}>

              <Image
                source={require('../../assets/mugiwareLogo.png')}
                style={styles.partnerImage}
              />

              <Text style={styles.partnerName}>
                Aliado {item}
              </Text>

            </View>
          ))}

      </ScrollView>

      <View style={styles.actionsContainer}>

        <Pressable
          style={styles.actionButton}
          onPress={() => navigation.navigate("Accumulate", { qrData: undefined })}
        >
          <Text style={styles.actionText}>Acumular</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: "#10B981" }]}
          onPress={() => navigation.navigate("Redeem", { qrData: undefined })}
        >
          <Text style={styles.actionText}>Redimir</Text>
        </Pressable>

      </View>
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EFF6FF',
    flexGrow: 1,
  },

  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  welcome: {
    fontSize: 16,
    color: '#64748B',
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  email: {
    fontSize: 14,
    color: '#64748B',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 16,
    color: '#64748B',
  },

  points: {
    fontSize: 28,
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

  actionsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 25,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E293B",
  },

  partnerCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: "center",
    elevation: 3,
  },

  partnerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

  partnerName: {
    fontSize: 12,
    color: "#334155",
  },
});