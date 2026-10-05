import { StyleSheet } from "react-native";

import { Colors } from "./colors";

export function createTransactionsStyles(colors: Colors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: { padding: 20, paddingBottom: 36 },
    filters: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: "row",
      marginBottom: 18,
      padding: 4,
    },
    filter: {
      alignItems: "center",
      borderRadius: 12,
      flex: 1,
      justifyContent: "center",
      minHeight: 44,
      paddingHorizontal: 8,
    },
    activeFilter: { backgroundColor: colors.primary },
    filterText: { color: colors.textMuted, fontSize: 13, fontWeight: "700" },
    activeFilterText: { color: colors.white },
    loading: { alignItems: "center", paddingVertical: 48 },
    stateText: {
      color: colors.textMuted,
      fontSize: 15,
      lineHeight: 22,
      marginTop: 12,
      textAlign: "center",
    },
    transactionList: { gap: 12 },
    transactionCard: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: 16,
      borderWidth: 1,
      padding: 16,
    },
    transactionHeader: {
      alignItems: "center",
      flexDirection: "row",
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
      fontSize: 15,
      fontWeight: "800",
    },
    points: { fontSize: 16, fontWeight: "800" },
    positive: { color: colors.success },
    negative: { color: colors.accent },
    reference: { color: colors.textMuted, fontSize: 13, marginTop: 13 },
    details: { color: colors.textMuted, fontSize: 12, marginTop: 6 },
    moreButton: {
      alignItems: "center",
      borderColor: colors.primary,
      borderRadius: 12,
      borderWidth: 1,
      justifyContent: "center",
      marginTop: 18,
      minHeight: 48,
    },
    moreText: { color: colors.primary, fontSize: 15, fontWeight: "800" },
  });
}
