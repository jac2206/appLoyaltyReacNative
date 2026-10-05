import React, { useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthStackParamList } from "../types/navigation";
import { InputField } from "../components/CustomInputField";
import { CustomButton } from "../components/CustomButtom";
import { DocumentTypeSelector } from "../components/DocumentTypeSelector";
import { ScreenHeader } from "../components/ScreenHeader";
import { useTheme } from "../context/ThemeContext";
import { useRegister } from "../hooks/useRegister";

import { createStyles } from "../styles/register.styles";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { loading, submit } = useRegister();

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
      const succeeded = await submit({
        documentType: form.documentType as "CC" | "CE" | "NIT" | "PT",

        documentNumber: form.documentNumber,

        fullName: `${form.firstName} ${form.lastName}`,

        email: form.email,

        phone: form.phone,

        password: form.password,
      });

      if (!succeeded) {
        Alert.alert(
          "No fue posible registrarte",
          "Verifica tus datos e inténtalo nuevamente.",
        );
        return;
      }

      Alert.alert("Registro exitoso", "Tu cuenta fue creada correctamente.");

      navigation.goBack();
    } catch {}
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

        <DocumentTypeSelector
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

        <CustomButton
          title="Crear cuenta"
          onPress={register}
          loading={loading}
        />

        <Text style={styles.legal}>
          Al continuar aceptas los términos del programa de recompensas.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
