import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { InputField } from "../components/CustomInputField";
import { CustomButton } from "../components/CustomButtom";
import { colors } from "../styles/colors";
import { useAuth } from "../context/AuthContext";
import { redeemRequest } from "../services/transaction.service";
import { useQRForm } from "../hooks/useQRForm";

type Props = NativeStackScreenProps<MainStackParamList, "Redeem">;

export function RedeemScreen({ navigation, route }: Props) {

  const { user } = useAuth();

  const [form, setForm] = useState({
    partnerCode: "",
    locationCode: "",
    points: "",
    reference: "",
  });

  useQRForm({
    route,
    navigation,
    setForm,
    type: "REDEEM",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRedeem = async () => {

    try {

      if (!form.partnerCode || !form.locationCode || !form.points) {
        Alert.alert("Error", "Campos obligatorios");
        return;
      }

      await redeemRequest({
        documentType: user?.documentType ?? "",
        documentNumber: user?.documentNumber ?? "",
        partnerCode: form.partnerCode,
        locationCode: form.locationCode,
        points: Number(form.points),
        reference: form.reference || "APP-REDEEM",
      });

      Alert.alert("Éxito", "Puntos redimidos correctamente", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ]);

      setForm({
        partnerCode: "",
        locationCode: "",
        points: "",
        reference: "",
      });

    } catch (error) {
      console.log("Error redeem:", error);
      Alert.alert("Error", "No se pudo redimir");
    }
  };

// Simulación QR
//   const handleScanQR = () => {

//     const fakeQRData = {
//       partnerCode: "PARTNER_001",
//       locationCode: "LOC_001",
//       points: "500",
//       reference: "QR-REDEEM",
//     };

//     setForm(fakeQRData);

//     Alert.alert("QR leído", "Datos cargados automáticamente");
//   };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Redimir Puntos</Text>

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
        placeholder="Puntos"
        value={form.points}
        onChangeText={(t) => handleChange("points", t)}
      />

      <InputField
        placeholder="Referencia"
        value={form.reference}
        onChangeText={(t) => handleChange("reference", t)}
      />

      <CustomButton
        title="Redimir"
        onPress={handleRedeem}
      />
{/* 
      <Pressable style={styles.qrButton} onPress={handleScanQR}>
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