import { StyleSheet } from "react-native";
import type { Colors } from "./colors";
import { typography } from "./tokens";

export function createQrScannerStyles(colors: Colors) {
  return StyleSheet.create({
    scanHeading: { flex: 1, minWidth: 0 },
    camera: { flex: 1, backgroundColor: colors.cameraBackground },
    cameraFill: {
      bottom: 0,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
    },
    overlay: { flex: 1, justifyContent: "space-between", padding: 24 },
    overlayTop: {
      alignItems: "center",
      backgroundColor: colors.overlay,
      borderRadius: 16,
      flexDirection: "row",
      gap: 14,
      padding: 12,
    },
    close: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 22,
      height: 44,
      justifyContent: "center",
      width: 44,
    },
    scanTitle: { color: colors.white, ...typography.heading },
    scanCopy: { color: colors.white, ...typography.small, marginTop: 3 },
    frame: {
      alignSelf: "center",
      borderColor: colors.white,
      borderRadius: 22,
      borderWidth: 2,
      height: 240,
      width: 240,
    },
    hint: {
      alignSelf: "center",
      backgroundColor: colors.overlay,
      borderRadius: 18,
      color: colors.white,
      ...typography.small,
      marginBottom: 20,
      overflow: "hidden",
      paddingHorizontal: 14,
      paddingVertical: 9,
    },
  });
}
