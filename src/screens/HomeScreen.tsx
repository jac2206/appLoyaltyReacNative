import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityChart } from '../components/ActivityChart';
import { useAuth } from '../context/AuthContext';
import { useBalance } from '../hooks/useBalance';
import { colors } from '../styles/colors';
import { MainStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
const goalPoints = 2000;

export function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { balance } = useBalance();
  const progress = Math.min(100, Math.max(0, (balance / goalPoints) * 100));
  const firstName = user?.userName.split(' ')[0] ?? 'Usuario';

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>Hola, {firstName}</Text>
            <Text style={styles.caption}>Tu resumen de recompensas</Text>
          </View>
          <Pressable
            accessibilityLabel="Abrir perfil"
            accessibilityRole="button"
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <Text style={styles.profileInitial}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Puntos disponibles</Text>
              <Text style={styles.balance}>{balance.toLocaleString('es-CO')}</Text>
            </View>
            <View style={styles.coin}>
              <Ionicons name="diamond-outline" size={25} color={colors.primary} />
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>{Math.round(progress)}% de tu meta</Text>
            <Text style={styles.progressText}>
              {goalPoints.toLocaleString('es-CO')} pts
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>¿Qué quieres hacer?</Text>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Accumulate', { qrData: undefined })}
            style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
          >
            <View style={[styles.actionIcon, styles.accumulateIcon]}>
              <Ionicons name="add" size={28} color={colors.primary} />
            </View>
            <Text style={styles.actionTitle}>Acumular</Text>
            <Text style={styles.actionCopy}>Suma puntos con una compra</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Redeem', { qrData: undefined })}
            style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
          >
            <View style={[styles.actionIcon, styles.redeemIcon]}>
              <Ionicons name="gift-outline" size={25} color={colors.accent} />
            </View>
            <Text style={styles.actionTitle}>Redimir</Text>
            <Text style={styles.actionCopy}>Disfruta tus recompensas</Text>
          </Pressable>
        </View>

        <View style={styles.chartSpacing}>
          <ActivityChart data={[40, 80, 60, 100, 50, 90, 70]} />
        </View>
        <Text style={styles.sectionTitle}>Aliados destacados</Text>
        <View style={styles.partners}>
          {['Compras', 'Restaurantes', 'Viajes'].map((partner, index) => (
            <View key={partner} style={styles.partner}>
              <Ionicons
                name={
                  index === 0
                    ? 'storefront-outline'
                    : index === 1
                      ? 'restaurant-outline'
                      : 'airplane-outline'
                }
                size={21}
                color={colors.primary}
              />
              <Text style={styles.partnerText}>{partner}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 36 },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  greeting: { color: colors.textDark, fontSize: 27, fontWeight: '800' },
  caption: { color: colors.textMuted, fontSize: 14, marginTop: 4 },
  profileButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  profileInitial: { color: colors.white, fontSize: 18, fontWeight: '800' },
  balanceCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  balanceTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceLabel: { color: colors.textMuted, fontSize: 14 },
  balance: {
    color: colors.textDark,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 5,
  },
  coin: {
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  progressTrack: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 6,
    height: 8,
    marginTop: 20,
    overflow: 'hidden',
  },
  progress: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    height: '100%',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 9,
  },
  progressText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  sectionTitle: {
    color: colors.textDark,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    marginTop: 28,
  },
  actions: { flexDirection: 'row', gap: 12 },
  actionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    minHeight: 156,
    padding: 16,
  },
  actionIcon: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  accumulateIcon: { backgroundColor: colors.surfaceMuted },
  redeemIcon: { backgroundColor: '#F3E8FF' },
  actionTitle: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 16,
  },
  actionCopy: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  pressed: { opacity: 0.72 },
  chartSpacing: { marginTop: 26 },
  partners: { flexDirection: 'row', gap: 10 },
  partner: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    gap: 7,
    paddingVertical: 13,
  },
  partnerText: { color: colors.textDark, fontSize: 11, fontWeight: '700' },
});
