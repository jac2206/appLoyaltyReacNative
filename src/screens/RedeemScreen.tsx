import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/CustomInputField";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAuth } from "../context/AuthContext";
import { useQRForm } from "../hooks/useQRForm";
import { redeemRequest } from "../services/transaction.service";
import { colors } from "../styles/colors";
import { MainStackParamList } from "../types/navigation";
type Props = NativeStackScreenProps<MainStackParamList, "Redeem">;
export function RedeemScreen({ navigation, route }: Props) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    partnerCode: "",
    locationCode: "",
    points: "",
    reference: "",
  });
  useQRForm({ route, navigation, setForm, type: "REDEEM" });
  const change = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = async () => {
    if (!form.partnerCode || !form.locationCode || Number(form.points) <= 0) {
      Alert.alert(
        "Revisa la información",
        "Ingresa aliado, sede y puntos válidos.",
      );
      return;
    }
    try {
      await redeemRequest({
        documentType: user?.documentType ?? "",
        documentNumber: user?.documentNumber ?? "",
        partnerCode: form.partnerCode,
        locationCode: form.locationCode,
        points: Number(form.points),
        reference: form.reference || "APP-REDEEM",
      });
      Alert.alert("Redención confirmada", "Disfruta tu recompensa.", [
        { text: "Listo", onPress: () => navigation.navigate("Home") },
      ]);
    } catch {
      Alert.alert(
        "No pudimos redimir",
        "Verifica tu saldo e inténtalo nuevamente.",
      );
    }
  };
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScreenHeader
          onBack={() => navigation.goBack()}
          eyebrow="Usar puntos"
          title="Redimir recompensa"
          subtitle="Confirma los datos del aliado para canjear tus puntos."
        />
        <View style={styles.info}>
          <Ionicons name="gift-outline" size={19} color={colors.accent} />
          <Text style={styles.infoText}>
            Los puntos se descontarán solo cuando el aliado confirme la
            operación.
          </Text>
        </View>
        <InputField
          placeholder="Código del aliado"
          value={form.partnerCode}
          onChangeText={(value) => change("partnerCode", value)}
        />
        <InputField
          placeholder="Código de sede"
          value={form.locationCode}
          onChangeText={(value) => change("locationCode", value)}
        />
        <InputField
          placeholder="Puntos a redimir"
          value={form.points}
          onChangeText={(value) => change("points", value)}
        />
        <InputField
          placeholder="Referencia (opcional)"
          value={form.reference}
          onChangeText={(value) => change("reference", value)}
        />
        <CustomButton title="Confirmar redención" onPress={submit} />
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
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 34 },
  info: {
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    borderRadius: 14,
    flexDirection: "row",
    gap: 9,
    marginBottom: 20,
    padding: 13,
  },
  infoText: { color: colors.textDark, flex: 1, fontSize: 13, lineHeight: 18 },
  scan: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
    justifyContent: "center",
    marginTop: 23,
    minHeight: 44,
  },
  scanText: { color: colors.primary, fontSize: 14, fontWeight: "800" },
});
