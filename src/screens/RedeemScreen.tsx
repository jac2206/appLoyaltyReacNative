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
import { useRedeem } from "../hooks/useRedeem";
import { useTypedQRForm } from "../hooks/useTypedQRForm";
import { createStyles } from "../styles/redeem.styles";
import type { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Redeem">;

export function RedeemScreen({ navigation, route }: Props) {
  const { user } = useAuth();
  const { loading, submit: submitRedeem } = useRedeem();

  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [form, setForm] = useState({
    partnerCode: "",
    locationCode: "",
    points: "",
    reference: "",
  });

  useTypedQRForm({
    route,
    navigation,
    setForm,
    type: "REDEEM",
  });

  const change = (field: keyof typeof form, value: string) =>
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

  const submit = async () => {
    if (!form.partnerCode || !form.locationCode || Number(form.points) <= 0) {
      Alert.alert("Revisa la información", "Ingresa aliado, sede y puntos válidos.");

      return;
    }

    try {
      const succeeded = await submitRedeem({
        documentType: user?.documentType ?? "",
        documentNumber: user?.documentNumber ?? "",
        partnerCode: form.partnerCode,
        locationCode: form.locationCode,
        points: Number(form.points),
        reference: form.reference || "APP-REDEEM",
      });

      if (!succeeded) {
        Alert.alert("No pudimos redimir", "Verifica tu saldo e inténtalo nuevamente.");
        return;
      }

      Alert.alert("Redención confirmada", "Disfruta tu recompensa.", [
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
        eyebrow="Usar puntos"
        title="Redimir recompensa"
        subtitle="Confirma los datos del aliado para canjear tus puntos."
      />

      <InlineNotice
        title="Revisa tu redención"
        message="Confirma el aliado, la sede y los puntos que quieres utilizar."
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
        title="Datos de la redención"
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
          onChangeText={(value) => change("partnerCode", value)}
        />

        <InputField
          label="Código de sede"
          placeholder="Ej. SEDE-01"
          autoCapitalize="none"
          autoCorrect={false}
          icon="location-outline"
          editable={!loading}
          value={form.locationCode}
          onChangeText={(value) => change("locationCode", value)}
        />

        <InputField
          label="Puntos a redimir"
          placeholder="0"
          keyboardType="decimal-pad"
          icon="gift-outline"
          editable={!loading}
          hint="Ingresa los puntos que deseas utilizar."
          value={form.points}
          onChangeText={(value) => change("points", value)}
        />

        <InputField
          label="Referencia (opcional)"
          placeholder="Ej. número de compra"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
          value={form.reference}
          onChangeText={(value) => change("reference", value)}
        />
      </FormSection>
      <CustomButton
        title="Confirmar redención"
        onPress={submit}
        loading={loading}
        icon="checkmark-outline"
      />
    </ScreenLayout>
  );
}
