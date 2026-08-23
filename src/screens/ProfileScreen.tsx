import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../components/CustomButtom';
import { useAuth } from '../context/AuthContext';
import { useBalance } from '../hooks/useBalance';
import { colors } from '../styles/colors';
import { MainStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const { balance } = useBalance();
  const initial = user?.userName.charAt(0).toUpperCase() ?? 'U';

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver"
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={21} color={colors.primary} />
        </Pressable>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.initial}>{initial}</Text>
          </View>
          <Text style={styles.name}>{user?.userName}</Text>
          <Text style={styles.email}>{user?.userEmail}</Text>
        </View>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Puntos disponibles</Text>
          <Text style={styles.points}>{balance.toLocaleString('es-CO')} pts</Text>
        </View>
        <Text style={styles.section}>Información personal</Text>
        <View style={styles.details}>
          <Detail icon="call-outline" label="Teléfono" value={user?.phone ?? '—'} />
          <Detail
            icon="card-outline"
            label="Documento"
            value={`${user?.documentType ?? ''} ${user?.documentNumber ?? ''}`}
          />
        </View>
        <CustomButton title="Cerrar sesión" variant="outline" onPress={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon} size={19} color={colors.primary} />
      </View>
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 34 },
  back: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  profile: { alignItems: 'center', marginTop: 24 },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 44,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  initial: { color: colors.white, fontSize: 32, fontWeight: '800' },
  name: {
    color: colors.textDark,
    fontSize: 23,
    fontWeight: '800',
    marginTop: 14,
  },
  email: { color: colors.textMuted, fontSize: 14, marginTop: 5 },
  pointsCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 18,
    marginTop: 28,
    padding: 19,
  },
  pointsLabel: { color: colors.textMuted, fontSize: 13 },
  points: {
    color: colors.primary,
    fontSize: 27,
    fontWeight: '800',
    marginTop: 5,
  },
  section: {
    color: colors.textDark,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 11,
    marginTop: 27,
  },
  details: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
  },
  detail: { alignItems: 'center', flexDirection: 'row', gap: 13, padding: 16 },
  detailIcon: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  detailLabel: { color: colors.textMuted, fontSize: 12 },
  detailValue: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
});
