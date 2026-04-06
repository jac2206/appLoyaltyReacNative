import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "QRScanner">;

export function QRScannerScreen({ navigation }: Props) {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleScan = ({ data }: any) => {

    setScanned(true);

    try {

      const parsed = JSON.parse(data);

      console.log("QR:", parsed);

      if (parsed.type === "ACCUMULATE") {
        navigation.replace("Accumulate", { qrData: parsed });
      }

      if (parsed.type === "REDEEM") {
        navigation.replace("Redeem", { qrData: parsed });
      }

    } catch (error) {

      Alert.alert("Error", "QR inválido");
      navigation.goBack();
    }
  };

  if (!permission) {
    return <Text>Solicitando permisos...</Text>;
  }

  if (!permission.granted) {
    return <Text>No tienes acceso a cámara</Text>;
  }

  return (
    <View style={styles.container}>

      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      <View style={styles.overlay}>
        <Text style={styles.text}>Escanea un QR</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});