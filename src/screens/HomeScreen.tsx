import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ActivityChart } from "../components/ActivityChart";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useBalance } from "../hooks/useBalance";
import { MainStackParamList } from "../types/navigation";

import { createStyles } from "../styles/home.styles";

type Props = NativeStackScreenProps<MainStackParamList, "Home">;

const goalPoints = 2000;

export function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { balance } = useBalance();

  const { colors } = useTheme();

  const styles = createStyles(colors);

  const progress = Math.min(100, Math.max(0, (balance / goalPoints) * 100));

  const firstName = user?.userName.split(" ")[0] ?? "Usuario";

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}

        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>Hola, {firstName}</Text>

            <Text style={styles.caption}>Tu resumen de recompensas</Text>
          </View>

          <Pressable
            accessibilityLabel="Abrir perfil"
            accessibilityRole="button"
            onPress={() => navigation.navigate("Profile")}
            style={styles.profileButton}
          >
            <Text style={styles.profileInitial}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
        </View>

        {/* Balance */}

        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Puntos disponibles</Text>

              <Text style={styles.balance}>
                {balance.toLocaleString("es-CO")}
              </Text>
            </View>

            <View style={styles.coin}>
              <Ionicons
                name="diamond-outline"
                size={25}
                color={colors.primary}
              />
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progress,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {Math.round(progress)}% de tu meta
            </Text>

            <Text style={styles.progressText}>
              {goalPoints.toLocaleString("es-CO")} pts
            </Text>
          </View>
        </View>

        {/* Acciones */}

        <Text style={styles.sectionTitle}>¿Qué quieres hacer?</Text>

        <View style={styles.actions}>
          {/* Acumular */}

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate("Accumulate", {
                qrData: undefined,
              })
            }
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.actionIcon, styles.accumulateIcon]}>
              <Ionicons name="add" size={28} color={colors.primary} />
            </View>

            <Text style={styles.actionTitle}>Acumular</Text>

            <Text style={styles.actionCopy}>Suma puntos con una compra</Text>
          </Pressable>

          {/* Redimir */}

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate("Redeem", {
                qrData: undefined,
              })
            }
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.actionIcon, styles.redeemIcon]}>
              <Ionicons name="gift-outline" size={25} color={colors.accent} />
            </View>

            <Text style={styles.actionTitle}>Redimir</Text>

            <Text style={styles.actionCopy}>Disfruta tus recompensas</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ver movimientos"
          onPress={() => navigation.navigate("Transactions")}
          style={({ pressed }) => [
            styles.historyButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="list-outline" size={20} color={colors.primary} />
          <Text style={styles.historyText}>Ver todos tus movimientos</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.primary} />
        </Pressable>

        {/* Gráfica */}

        <View style={styles.chartSpacing}>
          <ActivityChart data={[40, 80, 60, 100, 50, 90, 70]} />
        </View>

        {/* Aliados */}

        <Text style={styles.sectionTitle}>Aliados destacados</Text>

        <View style={styles.partners}>
          {["Compras", "Restaurantes", "Viajes"].map((partner, index) => (
            <View key={partner} style={styles.partner}>
              <Ionicons
                name={
                  index === 0
                    ? "storefront-outline"
                    : index === 1
                      ? "restaurant-outline"
                      : "airplane-outline"
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
