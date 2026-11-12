import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { radius, spacing } from "./tokens";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      padding: spacing.xl,
      paddingBottom: spacing.xxxl,
    },

    topRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },

    greeting: {
      color: colors.textDark,
      fontSize: 27,
      fontWeight: "800",
    },

    caption: {
      color: colors.textMuted,
      fontSize: 14,
      marginTop: 4,
    },

    profileButton: {
      alignItems: "center",
      borderRadius: 24,
      height: 48,
      justifyContent: "center",
      width: 48,
    },

    balanceCard: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      padding: spacing.xl,

      shadowColor: colors.textDark,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.06,
      shadowRadius: 16,

      elevation: 2,
    },

    balanceTop: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    balanceLabel: {
      color: colors.textMuted,
      fontSize: 14,
    },

    balance: {
      color: colors.textDark,
      fontSize: 36,
      fontWeight: "800",
      marginTop: 5,
    },

    coin: {
      alignItems: "center",
      borderRadius: 22,
      height: 44,
      justifyContent: "center",
      width: 44,
    },

    progressTrack: {
      backgroundColor: colors.surfaceMuted,
      borderRadius: 6,
      height: 8,
      marginTop: 20,
      overflow: "hidden",
    },

    progress: {
      backgroundColor: colors.primary,
      borderRadius: 6,
      height: "100%",
    },

    progressLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 9,
    },

    progressText: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: "600",
    },

    sectionTitle: {
      color: colors.textDark,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 12,
      marginTop: 28,
    },

    actions: {
      flexDirection: "row",
      gap: 12,
    },

    actionCard: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      flex: 1,
      minHeight: 156,
      padding: 16,
    },

    actionIcon: {
      alignItems: "center",
      borderRadius: 18,
      height: 36,
      justifyContent: "center",
      width: 36,
    },

    accumulateIcon: {
      backgroundColor: colors.surfaceMuted,
    },

    redeemIcon: {
      backgroundColor: colors.surfaceMuted,
    },

    actionTitle: {
      color: colors.textDark,
      fontSize: 16,
      fontWeight: "800",
      marginTop: 16,
    },

    actionCopy: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 5,
    },

    pressed: {
      opacity: 0.72,
    },

    chartSpacing: {
      marginTop: 26,
    },

    historyButton: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.md,
      borderWidth: 1,
      flexDirection: "row",
      gap: 9,
      justifyContent: "center",
      marginTop: 16,
      minHeight: 48,
      paddingHorizontal: 14,
    },

    historyText: {
      color: colors.primaryText,
      flex: 1,
      fontSize: 14,
      fontWeight: "800",
    },

    partners: {
      flexDirection: "row",
      gap: 10,
    },

    partner: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.md,
      borderWidth: 1,
      flex: 1,
      gap: 7,
      paddingVertical: 13,
    },

    partnerText: {
      color: colors.textDark,
      fontSize: 11,
      fontWeight: "700",
    },
  });
}
