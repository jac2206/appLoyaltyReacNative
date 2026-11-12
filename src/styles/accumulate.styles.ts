import { StyleSheet } from "react-native";

import type { Colors } from "./colors";
import { spacing } from "./tokens";

export function createStyles(_colors: Colors) {
  return StyleSheet.create({
    quickAction: { marginBottom: spacing.xl },
  });
}
