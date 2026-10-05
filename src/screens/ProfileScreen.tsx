import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

import { CustomButton } from "../components/CustomButtom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useBalance } from "../hooks/useBalance";
import { MainStackParamList } from "../types/navigation";
import { Colors } from "../styles/colors";

import { createStyles } from "../styles/profile.styles";

type Props = NativeStackScreenProps<MainStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const { balance } = useBalance();

  const { colors, isDark, toggleTheme } = useTheme();

  const initial = user?.userName.charAt(0).toUpperCase() ?? "U";

  const styles = createStyles(colors);

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
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

          <Text style={styles.points}>{balance.toLocaleString("es-CO")} pts</Text>
        </View>

        <Text style={styles.section}>Información personal</Text>

        <View style={styles.details}>
          <Detail
            icon="call-outline"
            label="Teléfono"
            value={user?.phone ?? "—"}
            colors={colors}
          />

          <Detail
            icon="card-outline"
            label="Documento"
            value={`${user?.documentType ?? ""} ${user?.documentNumber ?? ""}`}
            colors={colors}
          />
        </View>

        {/* Apariencia */}

        <Text style={styles.section}>Apariencia</Text>

        <View style={styles.themeRow}>
          <View style={styles.themeInfo}>
            <View style={styles.themeIcon}>
              <Ionicons
                name={isDark ? "moon-outline" : "sunny-outline"}
                size={20}
                color={colors.primary}
              />
            </View>

            <View>
              <Text style={styles.themeTitle}>Tema</Text>

              <Text style={styles.themeSubtitle}>
                {isDark ? "Modo oscuro" : "Modo claro"}
              </Text>
            </View>
          </View>

          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: colors.border,
              true: colors.primary,
            }}
            thumbColor={colors.white}
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
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  colors: Colors;
}) {
  const styles = createStyles(colors);

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
