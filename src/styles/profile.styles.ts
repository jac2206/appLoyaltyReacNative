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

    back: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 22,
      borderWidth: 1,
      height: 44,
      justifyContent: "center",
      width: 44,
    },

    profile: {
      alignItems: "center",
      marginTop: 24,
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
      fontSize: 23,
      fontWeight: "800",
      marginTop: 14,
    },

    email: {
      color: colors.textMuted,
      fontSize: 14,
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
      fontSize: 13,
    },

    points: {
      color: colors.primaryText,
      fontSize: 27,
      fontWeight: "800",
      marginTop: 5,
    },

    section: {
      color: colors.textDark,
      fontSize: 18,
      fontWeight: "800",
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
    },

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
      fontSize: 12,
    },

    detailValue: {
      color: colors.textDark,
      fontSize: 15,
      fontWeight: "700",
      marginTop: 2,
    },

    themeRow: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 25,
      padding: 16,
    },

    themeInfo: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: 13,
      minWidth: 0,
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
      fontSize: 15,
      fontWeight: "700",
    },

    themeSubtitle: {
      color: colors.textMuted,
      flexShrink: 1,
      fontSize: 12,
      marginTop: 3,
    },
  });
}
