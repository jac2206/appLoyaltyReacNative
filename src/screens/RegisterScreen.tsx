import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthStackParamList } from "../types/navigation";
import { InputField } from "../components/CustomInputField";
import { CustomButton } from "../components/CustomButtom";
import { DocumentTypePicker } from "../components/DocumentTypePicker";
import { ScreenHeader } from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styles/colors";
import { registerRequest } from "../services/auth.service";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [form, setForm] = useState({
    documentType: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const change = (field: keyof typeof form, value: string) =>
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

  const register = async () => {
    if (Object.values(form).some((value) => !value.trim())) {
      Alert.alert("Completa tus datos", "Todos los campos son obligatorios.");

      return;
    }

    try {
      await registerRequest({
        documentType: form.documentType as "CC" | "CE" | "NIT" | "PT",

        documentNumber: form.documentNumber,

        fullName: `${form.firstName} ${form.lastName}`,

        email: form.email,

        phone: form.phone,

        password: form.password,
      });

      Alert.alert("Registro exitoso", "Tu cuenta fue creada correctamente.");

      navigation.goBack();
    } catch {
      Alert.alert(
        "No fue posible registrarte",
        "Verifica tus datos e inténtalo nuevamente.",
      );
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader
          onBack={() => navigation.goBack()}
          eyebrow="Crear cuenta"
          title="Empieza a ganar puntos"
          subtitle="Completa tus datos para unirte al programa."
        />

        <DocumentTypePicker
          value={form.documentType}
          onChange={(value) => change("documentType", value)}
        />

        <InputField
          placeholder="Número de documento"
          value={form.documentNumber}
          onChangeText={(value) => change("documentNumber", value)}
        />

        <InputField
          placeholder="Nombres"
          value={form.firstName}
          onChangeText={(value) => change("firstName", value)}
        />

        <InputField
          placeholder="Apellidos"
          value={form.lastName}
          onChangeText={(value) => change("lastName", value)}
        />

        <InputField
          placeholder="Correo electrónico"
          value={form.email}
          onChangeText={(value) => change("email", value)}
        />

        <InputField
          placeholder="Teléfono"
          value={form.phone}
          onChangeText={(value) => change("phone", value)}
        />

        <InputField
          placeholder="Crea una contraseña"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => change("password", value)}
        />

        <CustomButton title="Crear cuenta" onPress={register} />

        <Text style={styles.legal}>
          Al continuar aceptas los términos del programa de recompensas.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      padding: 20,
      paddingBottom: 34,
    },

    legal: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 18,
      textAlign: "center",
    },
  });
}
