import { StyleSheet } from "react-native";
import type { Colors } from "./colors";
import { typography } from "./tokens";

export function createTransactionsStyles(colors: Colors) {
  return StyleSheet.create({
    filters: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 18,
      padding: 4,
    },
    filter: {
      alignItems: "center",
      borderRadius: 12,
      flexGrow: 1,
      justifyContent: "center",
      maxWidth: "100%",
      minHeight: 44,
      paddingHorizontal: 6,
    },
    activeFilter: { backgroundColor: colors.primary },
    filterText: { color: colors.textMuted, ...typography.label, textAlign: "center" },
    activeFilterText: { color: colors.onPrimary },
    transactionList: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    transactionCard: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderBottomWidth: 1,
      padding: 16,
    },
    transactionHeader: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: "space-between",
    },
    transactionType: { alignItems: "center", flexDirection: "row", gap: 8 },
    transactionIcon: {
      alignItems: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: 16,
      height: 32,
      justifyContent: "center",
      width: 32,
    },
    transactionTitle: {
      color: colors.textDark,
      ...typography.label,
    },
    points: { ...typography.subheading },
    positive: { color: colors.success },
    negative: { color: colors.textDark },
    reference: { color: colors.textMuted, ...typography.small, marginTop: 13 },
    details: { color: colors.textMuted, ...typography.caption, marginTop: 6 },
  });
}
