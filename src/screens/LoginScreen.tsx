import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/CustomInputField";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLogin } from "../hooks/useLogin";
import { Colors } from "../styles/colors";
import { AuthStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { userEmail, password, error, setEmail, setPassword, validate } = useLogin();

  const { login } = useAuth();

  const { colors } = useTheme();

  const styles = createStyles(colors);

  const handleLogin = async () => {
    if (validate()) {
      try {
        await login(userEmail, password);
      } catch {}
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Marca */}

            <View style={styles.brand}>
              <View style={styles.brandIcon}>
                <Ionicons name="diamond-outline" size={33} color={colors.white} />
              </View>

              <Text style={styles.eyebrow}>LOYALTY JAC APP</Text>

              <Text style={styles.title}>Tus puntos te esperan.</Text>

              <Text style={styles.copy}>
                Ingresa para consultar tu saldo y disfrutar tus recompensas.
              </Text>
            </View>

            {/* Formulario */}

            <View style={styles.form}>
              <InputField
                placeholder="Correo electrónico"
                value={userEmail}
                onChangeText={setEmail}
              />

              <InputField
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {error && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
              )}

              <CustomButton title="Iniciar sesión" onPress={handleLogin} />

              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("Register")}
                style={styles.link}
              >
                <Text style={styles.linkText}>
                  ¿No tienes cuenta? <Text style={styles.linkStrong}>Regístrate</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    keyboard: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
    },

    container: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
    },

    brand: {
      marginBottom: 35,
    },

    brandIcon: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 20,
      height: 56,
      justifyContent: "center",
      marginBottom: 22,
      width: 56,
    },

    eyebrow: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.1,
    },

    title: {
      color: colors.textDark,
      fontSize: 34,
      fontWeight: "800",
      letterSpacing: -0.7,
      marginTop: 8,
    },

    copy: {
      color: colors.textMuted,
      fontSize: 15,
      lineHeight: 22,
      marginTop: 10,
    },

    form: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 22,
      borderWidth: 1,
      padding: 20,
    },

    error: {
      color: colors.error,
      fontSize: 13,
      marginBottom: 2,
    },

    link: {
      alignItems: "center",
      marginTop: 24,
    },

    linkText: {
      color: colors.textMuted,
      fontSize: 14,
    },

    linkStrong: {
      color: colors.primary,
      fontWeight: "800",
    },
  });
}
