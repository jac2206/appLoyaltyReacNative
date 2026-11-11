import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { spacing } from "./tokens";

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

    legal: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 18,
      textAlign: "center",
    },
  });
}
