import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContentState } from "../components/ContentState";
import { CustomButton } from "../components/CustomButtom";
import { ScreenLayout } from "../components/ScreenLayout";
import { useTheme } from "../context/ThemeContext";
import { createQrScannerStyles } from "../styles/qr-scanner.styles";
import type { MainStackParamList, QrPayload } from "../types/navigation";

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
  const { colors } = useTheme();
  const styles = createQrScannerStyles(colors);
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
      <ScreenLayout centered>
        <ContentState
          loading
          title="Preparando cámara"
          message="Estamos comprobando los permisos del dispositivo."
        />
      </ScreenLayout>
    );
  if (!permission.granted || mountError)
    return (
      <ScreenLayout centered>
        <ContentState
          icon="camera-outline"
          title={mountError ? "No pudimos abrir la cámara" : "Activa tu cámara"}
          message={
            mountError
              ? "Cierra otras apps que usen la cámara e inténtalo otra vez."
              : "Necesitamos acceso para leer el código QR del aliado."
          }
          action={{
            label: "Intentar nuevamente",
            onPress: () => {
              setMountError(false);
              requestPermission();
            },
          }}
        />
        <CustomButton
          title="Volver"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </ScreenLayout>
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
            <Ionicons
              accessible={false}
              name="close-outline"
              size={24}
              color={colors.textDark}
            />
          </Pressable>
          <View style={styles.scanHeading}>
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
