import { StyleSheet } from "react-native";

import { Colors } from "./colors";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      padding: 20,
      paddingBottom: 34,
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
      backgroundColor: colors.primary,
      borderRadius: 44,
      height: 88,
      justifyContent: "center",
      width: 88,
    },

    initial: {
      color: colors.white,
      fontSize: 32,
      fontWeight: "800",
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
      borderRadius: 18,
      marginTop: 28,
      padding: 19,
    },

    pointsLabel: {
      color: colors.textMuted,
      fontSize: 13,
    },

    points: {
      color: colors.primary,
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
      borderRadius: 18,
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
      borderRadius: 18,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 25,
      padding: 16,
    },

    themeInfo: {
      alignItems: "center",
      flexDirection: "row",
      gap: 13,
    },

    themeIcon: {
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 16,
      height: 36,
      justifyContent: "center",
      width: 36,
    },

    themeTitle: {
      color: colors.textDark,
      fontSize: 15,
      fontWeight: "700",
    },

    themeSubtitle: {
      color: colors.textMuted,
      fontSize: 12,
      marginTop: 3,
    },
  });
}
