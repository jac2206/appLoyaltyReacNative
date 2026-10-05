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

    legal: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 18,
      textAlign: "center",
    },
  });
}
