import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { radius, spacing, typography } from "./tokens";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    profile: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.xl,
    },

    avatar: {
      alignItems: "center",
      borderRadius: 44,
      height: 88,
      justifyContent: "center",
      width: 88,
    },

    name: {
      color: colors.textDark,
      ...typography.title,

      marginTop: 14,
      textAlign: "center",
    },

    email: {
      color: colors.textMuted,
      ...typography.small,
      marginTop: 5,
    },

    pointsCard: {
      backgroundColor: colors.surfaceMuted,
      borderRadius: radius.lg,
      marginTop: 28,
      padding: 19,
    },

    pointsLabel: {
      color: colors.textMuted,
      ...typography.small,
    },

    points: {
      color: colors.primaryText,
      ...typography.title,

      marginTop: 5,
      textAlign: "center",
    },

    section: {
      color: colors.textDark,
      ...typography.heading,

      marginBottom: 11,
      marginTop: 27,
    },

    details: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
    },

    detail: {
      alignItems: "center",
      flexDirection: "row",
      gap: 13,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    detailText: { flex: 1, minWidth: 0 },

    detailIcon: {
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 16,
      height: 32,
      justifyContent: "center",
      width: 32,
    },

    detailLabel: {
      color: colors.textMuted,
      ...typography.caption,
    },

    detailValue: {
      color: colors.textDark,
      ...typography.label,

      marginTop: 2,
    },

    themeRow: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.md,
      justifyContent: "space-between",
      marginBottom: 25,
      padding: 16,
    },

    themeInfo: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: 13,
      minWidth: 180,
    },

    themeIcon: {
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 16,
      height: 36,
      justifyContent: "center",
      width: 36,
    },

    themeText: {
      flex: 1,
      minWidth: 0,
    },

    themeTitle: {
      color: colors.textDark,
      ...typography.label,
    },

    themeSubtitle: {
      color: colors.textMuted,
      flexShrink: 1,
      ...typography.caption,
      marginTop: 3,
    },
  });
}
