import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { radius, spacing, typography } from "./tokens";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      width: "100%",
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
      ...typography.caption,

      letterSpacing: 1.1,
    },

    title: {
      color: colors.textDark,
      ...typography.display,

      letterSpacing: -0.7,
      marginTop: 8,
    },

    copy: {
      color: colors.textMuted,
      ...typography.small,
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
    formTitle: { ...typography.heading, color: colors.textDark },
    formCopy: {
      ...typography.small,
      color: colors.textMuted,
      marginTop: spacing.xs,
      marginBottom: spacing.xl,
    },

    link: {
      alignItems: "center",
      marginTop: 24,
      minHeight: 48,
      justifyContent: "center",
    },

    linkText: {
      color: colors.textMuted,
      ...typography.small,
    },

    linkStrong: {
      color: colors.primaryText,
      ...typography.label,
    },
  });
}
