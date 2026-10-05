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
import { AuthStackParamList } from "../types/navigation";

import { createStyles } from "../styles/login.styles";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { userEmail, password, error, setEmail, setPassword, validate } =
    useLogin();

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
                <Ionicons
                  name="diamond-outline"
                  size={33}
                  color={colors.white}
                />
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
                  ¿No tienes cuenta?{" "}
                  <Text style={styles.linkStrong}>Regístrate</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
