import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { InputField } from "../components/CustomInputField";
import { CustomButton } from "../components/CustomButtom";
import { colors } from "../styles/colors";
import { useAuth } from "../context/AuthContext";
import { accumulateRequest } from "../services/transaction.service";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useQRForm } from "../hooks/useQRForm";

type Props = NativeStackScreenProps<MainStackParamList, 'Accumulate'>;

export function AccumulateScreen( { navigation, route }: Props ) {

  const { user } = useAuth();

  const [form, setForm] = useState({
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

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAccumulate = async () => {

    try {

      if (!form.partnerCode || !form.locationCode || !form.amount) {
        Alert.alert("Error", "Campos obligatorios");
        return;
      }

      await accumulateRequest({
        documentType: user?.documentType ?? "",
        documentNumber: user?.documentNumber ?? "",
        partnerCode: form.partnerCode,
        locationCode: form.locationCode,
        amount: Number(form.amount),
        reference: form.reference || "APP-ACCUMULATE",
      });

      Alert.alert("Éxito", "Puntos acumulados correctamente", [
            {
                text: "OK",
                onPress: () => navigation.navigate("Home"),
            },
        ]);

      setForm({
        partnerCode: "",
        locationCode: "",
        amount: "",
        reference: "",
      });

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo acumular");
    }
  };

//   // Simulación QR (luego conectamos cámara real)
//   const handleScanQR = () => {

//     const fakeQRData = {
//       partnerCode: "PARTNER_001",
//       locationCode: "LOC_001",
//       amount: "200000",
//       reference: "QR-ACCUM",
//     };

//     setForm(fakeQRData);

//     Alert.alert("QR leído", "Datos cargados automáticamente");
//   };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Acumular Puntos</Text>

      <InputField
        placeholder="Partner Code"
        value={form.partnerCode}
        onChangeText={(t) => handleChange("partnerCode", t)}
      />

      <InputField
        placeholder="Location Code"
        value={form.locationCode}
        onChangeText={(t) => handleChange("locationCode", t)}
      />

      <InputField
        placeholder="Monto"
        value={form.amount}
        onChangeText={(t) => handleChange("amount", t)}
      />

      <InputField
        placeholder="Referencia"
        value={form.reference}
        onChangeText={(t) => handleChange("reference", t)}
      />

      <CustomButton
        title="Acumular"
        onPress={handleAccumulate}
      />

      {/* <Pressable style={styles.qrButton} onPress={handleScanQR}>
        <Text style={styles.qrText}>Escanear QR</Text>
      </Pressable> */}

      <Pressable
        style={styles.qrButton}
        onPress={() => navigation.navigate("QRScanner")}
        >
        <Text style={styles.qrText}>Escanear QR</Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
        >
        <Text style={styles.backText}>Volver</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 25,
    backgroundColor: colors.background,
    flexGrow: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
    marginBottom: 20,
  },

  qrButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#10B981",
    alignItems: "center",
  },

  qrText: {
    color: "#fff",
    fontWeight: "bold",
  },

  backButton: {
  marginTop: 15,
  padding: 12,
  borderRadius: 10,
  backgroundColor: "#64748B",
  alignItems: "center",
 },

  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
});