import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, View } from "react-native";

import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/CustomInputField";
import { FormSection } from "../components/FormSection";
import { InlineNotice } from "../components/InlineNotice";
import { ScreenHeader } from "../components/ScreenHeader";
import { ScreenLayout } from "../components/ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useAccumulate } from "../hooks/useAccumulate";
import { useTypedQRForm } from "../hooks/useTypedQRForm";
import { createStyles } from "../styles/accumulate.styles";
import type { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Accumulate">;

type AccumulateForm = {
  partnerCode: string;
  locationCode: string;
  amount: string;
  reference: string;
};

export function AccumulateScreen({ navigation, route }: Props) {
  const { user } = useAuth();
  const { loading, submit } = useAccumulate();

  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [form, setForm] = useState<AccumulateForm>({
    partnerCode: "",
    locationCode: "",
    amount: "",
    reference: "",
  });

  useTypedQRForm({
    route,
    navigation,
    setForm,
    type: "ACCUMULATE",
  });

  const handleChange = (field: keyof AccumulateForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.partnerCode || !form.locationCode || Number(form.amount) <= 0) {
      Alert.alert("Revisa la información", "Ingresa aliado, sede y un monto válido.");

      return;
    }

    try {
      const succeeded = await submit({
        documentType: user?.documentType ?? "",
        documentNumber: user?.documentNumber ?? "",
        partnerCode: form.partnerCode,
        locationCode: form.locationCode,
        amount: Number(form.amount),
        reference: form.reference || "APP-ACCUMULATE",
      });

      if (!succeeded) {
        Alert.alert("No pudimos acumular", "Inténtalo nuevamente en unos minutos.");
        return;
      }

      Alert.alert("Puntos acumulados", "Tu saldo se actualizará enseguida.", [
        {
          text: "Listo",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch {}
  };

  return (
    <ScreenLayout>
      <ScreenHeader
        onBack={() => navigation.goBack()}
        eyebrow="Nueva operación"
        title="Acumular puntos"
        subtitle="Registra una compra o escanea el código del aliado."
      />

      <InlineNotice
        title="Antes de confirmar"
        message="Verifica el aliado, la sede y el monto de la compra."
      />
      <View style={styles.quickAction}>
        <CustomButton
          title="Completar con código QR"
          icon="scan-outline"
          variant="secondary"
          disabled={loading}
          onPress={() => navigation.navigate("QRScanner")}
        />
      </View>

      <FormSection
        title="Datos de la compra"
        description="Completa los códigos que te entrega el aliado."
      >
        <InputField
          label="Código del aliado"
          placeholder="Ej. ALIADO-01"
          autoCapitalize="none"
          autoCorrect={false}
          icon="storefront-outline"
          editable={!loading}
          value={form.partnerCode}
          onChangeText={(value) => handleChange("partnerCode", value)}
        />

        <InputField
          label="Código de sede"
          placeholder="Ej. SEDE-01"
          autoCapitalize="none"
          autoCorrect={false}
          icon="location-outline"
          editable={!loading}
          value={form.locationCode}
          onChangeText={(value) => handleChange("locationCode", value)}
        />

        <InputField
          label="Monto de compra"
          placeholder="0"
          keyboardType="decimal-pad"
          icon="cash-outline"
          editable={!loading}
          hint="Ingresa el valor numérico, sin símbolos de moneda."
          value={form.amount}
          onChangeText={(value) => handleChange("amount", value)}
        />

        <InputField
          label="Referencia (opcional)"
          placeholder="Ej. número de compra"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
          value={form.reference}
          onChangeText={(value) => handleChange("reference", value)}
        />
      </FormSection>
      <CustomButton
        title="Confirmar acumulación"
        onPress={handleSubmit}
        loading={loading}
        icon="checkmark-outline"
      />
    </ScreenLayout>
  );
}
