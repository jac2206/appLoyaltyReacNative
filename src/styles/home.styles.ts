import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { radius, spacing, typography } from "./tokens";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    topRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    greetingBlock: { flex: 1, minWidth: 0, marginRight: spacing.lg },
    eyebrow: {
      ...typography.caption,
      color: colors.primaryText,
      letterSpacing: 1,
      marginBottom: spacing.xs,
    },
    balanceValue: { flex: 1, minWidth: 0 },

    greeting: {
      color: colors.textDark,
      ...typography.title,
    },

    caption: {
      color: colors.textMuted,
      ...typography.small,
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
      backgroundColor: colors.surfaceMuted,
      borderColor: colors.border,
      borderRadius: radius.xl,
      borderWidth: 1,
      padding: spacing.xl,

      shadowColor: colors.textDark,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.06,
      shadowRadius: 16,

      elevation: 0,
    },

    balanceTop: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    balanceLabel: {
      color: colors.textMuted,
      ...typography.small,
    },

    balance: {
      color: colors.textDark,
      ...typography.display,

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
      backgroundColor: colors.border,
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
      flexWrap: "wrap",
      gap: spacing.sm,
      justifyContent: "space-between",
      marginTop: 9,
    },

    progressText: {
      color: colors.textMuted,
      ...typography.caption,
    },

    sectionTitle: {
      color: colors.textDark,
      ...typography.heading,

      marginBottom: 12,
      marginTop: 28,
    },

    actions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },

    actionCard: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      flex: 1,
      flexBasis: 140,
      minHeight: 164,
      padding: 16,
    },

    actionIcon: {
      alignItems: "center",
      borderRadius: radius.md,
      height: 44,
      justifyContent: "center",
      width: 44,
    },

    accumulateIcon: {
      backgroundColor: colors.surfaceMuted,
    },

    redeemIcon: {
      backgroundColor: colors.surfaceMuted,
    },

    actionTitle: {
      color: colors.textDark,
      ...typography.subheading,

      marginTop: 16,
    },

    actionCopy: {
      color: colors.textMuted,
      ...typography.small,
      lineHeight: 21,
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
      ...typography.label,
    },

    partners: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },

    partner: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.md,
      borderWidth: 0,
      flex: 1,
      minWidth: 80,
      gap: 7,
      paddingVertical: 13,
    },

    partnerText: {
      color: colors.textDark,
      ...typography.small,
    },
  });
}
