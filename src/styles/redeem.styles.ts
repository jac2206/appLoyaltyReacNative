import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { radius, spacing } from "./tokens";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      padding: spacing.xl,
      paddingBottom: spacing.xxxl,
    },

    info: {
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: radius.md,
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
      color: colors.primaryText,
      fontSize: 14,
      fontWeight: "800",
    },
  });
}
