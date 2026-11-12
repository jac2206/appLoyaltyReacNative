import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/CustomInputField";
import { InlineNotice } from "../components/InlineNotice";
import { JacMark } from "../components/JacMark";
import { ScreenLayout } from "../components/ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLogin } from "../hooks/useLogin";
import { createStyles } from "../styles/login.styles";
import type { AuthStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { userEmail, password, error, setEmail, setPassword, setError, validate } =
    useLogin();

  const {
    biometricAvailable,
    biometricEnabled,
    biometricLabel,
    login,
    loginWithBiometrics,
  } = useAuth();

  const { colors } = useTheme();

  const styles = createStyles(colors);
  const [submitting, setSubmitting] = useState(false);
  const submissionLock = useRef(false);

  const handleLogin = async () => {
    if (submissionLock.current) return;
    setError(null);

    if (validate()) {
      submissionLock.current = true;
      setSubmitting(true);
      try {
        await login(userEmail, password);
      } catch {
        setError("No pudimos iniciar sesión. Verifica tus datos y tu conexión.");
      } finally {
        submissionLock.current = false;
        setSubmitting(false);
      }
    }
  };

  const handleBiometricLogin = async () => {
    if (submissionLock.current) return;
    submissionLock.current = true;
    setSubmitting(true);
    setError(null);

    try {
      await loginWithBiometrics();
    } catch (biometricLoginError) {
      setError(
        biometricLoginError instanceof Error
          ? biometricLoginError.message
          : "No se pudo iniciar sesión con biometría.",
      );
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
    }
  };

  return (
    <ScreenLayout centered>
      <View style={styles.container}>
        {/* Marca */}

        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <JacMark size={64} />
          </View>

          <Text style={styles.eyebrow}>LOYALTY JAC APP</Text>

          <Text style={styles.title}>Tus puntos te esperan.</Text>

          <Text style={styles.copy}>
            Ingresa para consultar tu saldo y disfrutar tus recompensas.
          </Text>
        </View>

        {/* Formulario */}

        <View style={styles.form}>
          <Text accessibilityRole="header" style={styles.formTitle}>
            Inicia sesión
          </Text>
          <Text style={styles.formCopy}>Accede a tu cuenta de recompensas.</Text>
          <InputField
            label="Correo electrónico"
            placeholder="nombre@correo.com"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            editable={!submitting}
            value={userEmail}
            onChangeText={setEmail}
          />

          <InputField
            label="Contraseña"
            placeholder="Escribe tu contraseña"
            icon="lock-closed-outline"
            autoComplete="current-password"
            editable={!submitting}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error && <InlineNotice tone="error" message={error} />}

          <CustomButton
            title="Iniciar sesión"
            onPress={handleLogin}
            loading={submitting}
            icon="arrow-forward-outline"
          />

          {biometricAvailable && biometricEnabled && (
            <CustomButton
              title={`Ingresar con ${biometricLabel}`}
              onPress={handleBiometricLogin}
              disabled={submitting}
              variant="outline"
              icon={
                biometricLabel.includes("Face")
                  ? "scan-outline"
                  : "finger-print-outline"
              }
              accessibilityHint="Autentica tu identidad con la biometría del dispositivo"
            />
          )}

          <Pressable
            accessibilityRole="button"
            disabled={submitting}
            onPress={() => navigation.navigate("Register")}
            style={styles.link}
          >
            <Text style={styles.linkText}>
              ¿No tienes cuenta? <Text style={styles.linkStrong}>Regístrate</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
}
