import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { typography } from "./tokens";

export function createStyles(colors: Colors) {
  return StyleSheet.create({
    legal: {
      color: colors.textMuted,
      ...typography.caption,
      lineHeight: 18,
      marginTop: 18,
      textAlign: "center",
    },
  });
}
