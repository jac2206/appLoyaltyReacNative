import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Switch, Text, View } from "react-native";

import { CustomButton } from "../components/CustomButtom";
import { JacMark } from "../components/JacMark";
import { ScreenHeader } from "../components/ScreenHeader";
import { ScreenLayout } from "../components/ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useBalance } from "../hooks/useBalance";
import type { Colors } from "../styles/colors";
import { createStyles } from "../styles/profile.styles";
import type { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const {
    biometricAvailable,
    biometricEnabled,
    biometricLabel,
    disableBiometricLogin,
    enableBiometricLogin,
    user,
    logout,
  } = useAuth();
  const { balance, loading } = useBalance();

  const { colors, isDark, toggleTheme } = useTheme();

  const styles = createStyles(colors);

  const handleBiometricChange = async (enabled: boolean) => {
    try {
      if (enabled) {
        await enableBiometricLogin();
      } else {
        await disableBiometricLogin();
      }
    } catch (error) {
      Alert.alert(
        "Acceso biométrico",
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el acceso biométrico.",
      );
    }
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        onBack={() => navigation.goBack()}
        eyebrow="Tu cuenta"
        title="Mi perfil"
      />

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <JacMark size={88} />
        </View>

        <Text style={styles.name}>{user?.userName}</Text>

        <Text style={styles.email}>{user?.userEmail}</Text>
      </View>

      <View style={styles.pointsCard}>
        <Text style={styles.pointsLabel}>Puntos disponibles</Text>

        <Text accessibilityLiveRegion="polite" style={styles.points}>
          {loading ? "Consultando saldo…" : `${balance.toLocaleString("es-CO")} pts`}
        </Text>
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

          <View style={styles.themeText}>
            <Text style={styles.themeTitle}>Tema</Text>

            <Text style={styles.themeSubtitle}>
              {isDark ? "Modo oscuro" : "Modo claro"}
            </Text>
          </View>
        </View>

        <Switch
          accessibilityLabel="Usar tema oscuro"
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{
            false: colors.controlBorder,
            true: colors.primary,
          }}
          thumbColor={isDark ? colors.onPrimary : colors.white}
        />
      </View>

      <Text style={styles.section}>Seguridad</Text>

      <View style={styles.themeRow}>
        <View style={styles.themeInfo}>
          <View style={styles.themeIcon}>
            <Ionicons name="finger-print-outline" size={20} color={colors.primary} />
          </View>

          <View style={styles.themeText}>
            <Text style={styles.themeTitle}>Acceso biométrico</Text>

            <Text style={styles.themeSubtitle}>
              {biometricAvailable
                ? biometricEnabled
                  ? `Activado con ${biometricLabel}`
                  : "Actívalo para iniciar sesión más rápido"
                : "Configura huella o Face ID en tu dispositivo"}
            </Text>
          </View>
        </View>

        <Switch
          accessibilityLabel={`Acceso biométrico con ${biometricLabel}`}
          value={biometricEnabled}
          onValueChange={handleBiometricChange}
          disabled={!biometricAvailable}
          trackColor={{
            false: colors.controlBorder,
            true: colors.primary,
          }}
          thumbColor={isDark && biometricEnabled ? colors.onPrimary : colors.white}
        />
      </View>

      <CustomButton
        title="Cerrar sesión"
        variant="outline"
        icon="log-out-outline"
        onPress={logout}
      />
    </ScreenLayout>
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

      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>

        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}
