import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Text } from "react-native";
import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/CustomInputField";
import { DocumentTypeSelector } from "../components/DocumentTypeSelector";
import { FormSection } from "../components/FormSection";
import { InlineNotice } from "../components/InlineNotice";
import { ScreenHeader } from "../components/ScreenHeader";
import { ScreenLayout } from "../components/ScreenLayout";
import { useTheme } from "../context/ThemeContext";
import { useRegister } from "../hooks/useRegister";
import { createStyles } from "../styles/register.styles";
import type { AuthStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { loading, submit } = useRegister();

  const styles = createStyles(colors);
  const [attempted, setAttempted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
    if (loading) return;
    setAttempted(true);
    setFormError(null);
    if (Object.values(form).some((value) => !value.trim())) {
      setFormError("Completa los campos indicados para crear tu cuenta.");

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
        setFormError(
          "No fue posible registrarte. Verifica tus datos e inténtalo nuevamente.",
        );
        return;
      }

      Alert.alert("Registro exitoso", "Tu cuenta fue creada correctamente.");

      navigation.goBack();
    } catch {
      setFormError("No fue posible completar el registro. Inténtalo nuevamente.");
    }
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        onBack={() => navigation.goBack()}
        eyebrow="Crear cuenta"
        title="Empieza a ganar puntos"
        subtitle="Completa tus datos para unirte al programa."
      />

      <FormSection
        title="Identificación"
        description="Usaremos estos datos para asociar tus puntos."
      >
        <DocumentTypeSelector
          value={form.documentType}
          disabled={loading}
          error={
            attempted && !form.documentType
              ? "Selecciona tu tipo de documento."
              : undefined
          }
          onChange={(value) => change("documentType", value)}
        />

        <InputField
          label="Número de documento"
          placeholder="Ej. 1002003004"
          autoCorrect={false}
          icon="card-outline"
          editable={!loading}
          error={
            attempted && !form.documentNumber.trim()
              ? "Ingresa tu número de documento."
              : undefined
          }
          value={form.documentNumber}
          onChangeText={(value) => change("documentNumber", value)}
        />
      </FormSection>
      <FormSection
        title="Datos personales"
        description="Así podremos identificarte y contactarte."
      >
        <InputField
          label="Nombres"
          placeholder="Ej. Camila"
          autoComplete="given-name"
          editable={!loading}
          error={
            attempted && !form.firstName.trim() ? "Ingresa tus nombres." : undefined
          }
          value={form.firstName}
          onChangeText={(value) => change("firstName", value)}
        />

        <InputField
          label="Apellidos"
          placeholder="Ej. Rodríguez"
          autoComplete="family-name"
          editable={!loading}
          error={
            attempted && !form.lastName.trim() ? "Ingresa tus apellidos." : undefined
          }
          value={form.lastName}
          onChangeText={(value) => change("lastName", value)}
        />
      </FormSection>
      <FormSection
        title="Contacto y acceso"
        description="El correo y la contraseña serán tus datos de ingreso."
      >
        <InputField
          label="Correo electrónico"
          placeholder="nombre@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          icon="mail-outline"
          editable={!loading}
          error={
            attempted && !form.email.trim()
              ? "Ingresa tu correo electrónico."
              : undefined
          }
          value={form.email}
          onChangeText={(value) => change("email", value)}
        />

        <InputField
          label="Teléfono"
          placeholder="Ej. 300 123 4567"
          keyboardType="phone-pad"
          autoComplete="tel"
          icon="call-outline"
          editable={!loading}
          error={attempted && !form.phone.trim() ? "Ingresa tu teléfono." : undefined}
          value={form.phone}
          onChangeText={(value) => change("phone", value)}
        />

        <InputField
          label="Contraseña"
          placeholder="Crea una contraseña"
          autoComplete="new-password"
          icon="lock-closed-outline"
          editable={!loading}
          error={
            attempted && !form.password.trim() ? "Crea una contraseña." : undefined
          }
          secureTextEntry
          value={form.password}
          onChangeText={(value) => change("password", value)}
        />
      </FormSection>
      {formError && <InlineNotice tone="error" message={formError} />}
      <CustomButton
        title="Crear cuenta"
        onPress={register}
        loading={loading}
        icon="person-add-outline"
      />

      <Text style={styles.legal}>
        Al continuar aceptas los términos del programa de recompensas.
      </Text>
    </ScreenLayout>
  );
}
