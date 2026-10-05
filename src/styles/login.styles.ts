import { StyleSheet } from "react-native";

import { Colors } from "./colors";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    keyboard: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
    },

    container: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
    },

    brand: {
      marginBottom: 35,
    },

    brandIcon: {
      alignItems: "center",
      backgroundColor: colors.primary,
      borderRadius: 20,
      height: 56,
      justifyContent: "center",
      marginBottom: 22,
      width: 56,
    },

    eyebrow: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.1,
    },

    title: {
      color: colors.textDark,
      fontSize: 34,
      fontWeight: "800",
      letterSpacing: -0.7,
      marginTop: 8,
    },

    copy: {
      color: colors.textMuted,
      fontSize: 15,
      lineHeight: 22,
      marginTop: 10,
    },

    form: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 22,
      borderWidth: 1,
      padding: 20,
    },

    error: {
      color: colors.error,
      fontSize: 13,
      marginBottom: 2,
    },

    link: {
      alignItems: "center",
      marginTop: 24,
    },

    linkText: {
      color: colors.textMuted,
      fontSize: 14,
    },

    linkStrong: {
      color: colors.primary,
      fontWeight: "800",
    },
  });
}
