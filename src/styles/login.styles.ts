import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { radius, spacing } from "./tokens";

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
      padding: spacing.xl,
    },

    brand: {
      marginBottom: 35,
    },

    brandIcon: {
      alignItems: "center",
      height: 64,
      justifyContent: "center",
      marginBottom: 22,
      width: 64,
    },

    eyebrow: {
      color: colors.primaryText,
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
      borderRadius: radius.lg,
      borderWidth: 1,
      padding: spacing.xl,
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
      color: colors.primaryText,
      fontWeight: "800",
    },
  });
}
