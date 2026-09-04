import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/CustomInputField";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useQRForm } from "../hooks/useQRForm";
import { accumulateRequest } from "../services/transaction.service";
import { Colors } from "../styles/colors";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Accumulate">;

type AccumulateForm = {
  partnerCode: string;
  locationCode: string;
  amount: string;
  reference: string;
};

export function AccumulateScreen({ navigation, route }: Props) {
  const { user } = useAuth();

  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [form, setForm] = useState<AccumulateForm>({
    partnerCode: "",
    locationCode: "",
    amount: "",
    reference: "",
  });

  useQRForm({
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
      await accumulateRequest({
        documentType: user?.documentType ?? "",
        documentNumber: user?.documentNumber ?? "",
        partnerCode: form.partnerCode,
        locationCode: form.locationCode,
        amount: Number(form.amount),
        reference: form.reference || "APP-ACCUMULATE",
      });

      Alert.alert("Puntos acumulados", "Tu saldo se actualizará enseguida.", [
        {
          text: "Listo",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch {
      Alert.alert("No pudimos acumular", "Inténtalo nuevamente en unos minutos.");
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader
          onBack={() => navigation.goBack()}
          eyebrow="Nueva operación"
          title="Acumular puntos"
          subtitle="Registra una compra o escanea el código del aliado."
        />

        <View style={styles.info}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color={colors.primary}
          />

          <Text style={styles.infoText}>
            Verifica los datos antes de confirmar la operación.
          </Text>
        </View>

        <InputField
          placeholder="Código del aliado"
          value={form.partnerCode}
          onChangeText={(value) => handleChange("partnerCode", value)}
        />

        <InputField
          placeholder="Código de sede"
          value={form.locationCode}
          onChangeText={(value) => handleChange("locationCode", value)}
        />

        <InputField
          placeholder="Monto de compra"
          value={form.amount}
          onChangeText={(value) => handleChange("amount", value)}
        />

        <InputField
          placeholder="Referencia (opcional)"
          value={form.reference}
          onChangeText={(value) => handleChange("reference", value)}
        />

        <CustomButton title="Confirmar acumulación" onPress={handleSubmit} />

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("QRScanner")}
          style={styles.scan}
        >
          <Ionicons name="scan-outline" size={21} color={colors.primary} />

          <Text style={styles.scanText}>Escanear código QR</Text>
        </Pressable>
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

    info: {
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 14,
      flexDirection: "row",
      gap: 9,
      marginBottom: 20,
      padding: 13,
    },

    infoText: {
      color: colors.textDark,
      flex: 1,
      fontSize: 13,
      lineHeight: 18,
    },

    scan: {
      alignItems: "center",
      flexDirection: "row",
      gap: 9,
      justifyContent: "center",
      marginTop: 23,
      minHeight: 44,
    },

    scanText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "800",
    },
  });
}
