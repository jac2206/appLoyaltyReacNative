import type { ComponentProps } from "react";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList, QrPayload } from "../types/navigation";

import { qrScannerStyles as styles } from "../styles/qr-scanner.styles";

type Props = NativeStackScreenProps<MainStackParamList, "QRScanner">;
type ScanResult = Parameters<
  NonNullable<ComponentProps<typeof CameraView>["onBarcodeScanned"]>
>[0];

function isQrPayload(value: unknown): value is QrPayload {
  if (!value || typeof value !== "object") return false;
  const qr = value as Record<string, unknown>;
  const base =
    typeof qr.partnerCode === "string" && typeof qr.locationCode === "string";
  return (
    base &&
    ((qr.type === "ACCUMULATE" && typeof qr.amount === "number") ||
      (qr.type === "REDEEM" && typeof qr.points === "number"))
  );
}

export function QRScannerScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [mountError, setMountError] = useState(false);
  const isFocused = useIsFocused();

  const handleScan = ({ data }: ScanResult) => {
    setScanned(true);
    try {
      const payload: unknown = JSON.parse(data);
      if (!isQrPayload(payload)) throw new Error("invalid QR");
      navigation.replace(payload.type === "ACCUMULATE" ? "Accumulate" : "Redeem", {
        qrData: payload,
      });
    } catch {
      Alert.alert(
        "Código no válido",
        "Este QR no pertenece a una operación de recompensas.",
        [
          { text: "Escanear de nuevo", onPress: () => setScanned(false) },
          { text: "Volver", onPress: () => navigation.goBack() },
        ],
      );
    }
  };

  if (!permission)
    return (
      <SafeAreaView style={styles.state}>
        <Text style={styles.stateTitle}>Preparando cámara…</Text>
      </SafeAreaView>
    );
  if (!permission.granted || mountError)
    return (
      <SafeAreaView style={styles.state}>
        <View style={styles.stateIcon}>
          <Text style={styles.stateIconText}>⌁</Text>
        </View>
        <Text style={styles.stateTitle}>
          {mountError ? "No pudimos abrir la cámara" : "Activa tu cámara"}
        </Text>
        <Text style={styles.stateCopy}>
          {mountError
            ? "Cierra otras apps que usen la cámara e inténtalo otra vez."
            : "Necesitamos acceso para leer el código QR del aliado."}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setMountError(false);
            requestPermission();
          }}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionText}>Intentar nuevamente</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.cancel}
        >
          <Text style={styles.cancelText}>Volver</Text>
        </Pressable>
      </SafeAreaView>
    );

  return (
    <View style={styles.camera}>
      <CameraView
        active={isFocused}
        style={styles.cameraFill}
        onMountError={() => setMountError(true)}
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
      <SafeAreaView pointerEvents="box-none" style={styles.overlay}>
        <View style={styles.overlayTop}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver"
            onPress={() => navigation.goBack()}
            style={styles.close}
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>
          <View>
            <Text style={styles.scanTitle}>Escanea el código QR</Text>
            <Text style={styles.scanCopy}>Enfoca el código dentro del recuadro</Text>
          </View>
        </View>
        <View style={styles.frame} />
        <Text style={styles.hint}>El escaneo se realiza automáticamente</Text>
      </SafeAreaView>
    </View>
  );
}
