import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { radius, spacing, typography } from "../styles/tokens";

type Props = { title?: string; message: string; tone?: "info" | "error" };

export function InlineNotice({ title, message, tone = "info" }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const color = tone === "error" ? colors.error : colors.primaryText;
  return (
    <View
      accessibilityRole={tone === "error" ? "alert" : undefined}
      accessibilityLiveRegion={tone === "error" ? "polite" : undefined}
      style={[styles.notice, tone === "error" && styles.error]}
    >
      <Ionicons
        accessible={false}
        name={tone === "error" ? "alert-circle-outline" : "information-circle-outline"}
        color={color}
        size={22}
      />
      <View style={styles.content}>
        {title && <Text style={[styles.title, { color }]}>{title}</Text>}
        <Text style={[styles.message, tone === "error" && { color }]}>{message}</Text>
      </View>
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    notice: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.md,
      padding: spacing.lg,
      backgroundColor: colors.surfaceMuted,
      borderRadius: radius.md,
      marginBottom: spacing.lg,
    },
    error: { backgroundColor: colors.errorSurface },
    content: { flex: 1, minWidth: 0 },
    title: { ...typography.label, marginBottom: spacing.xs },
    message: { ...typography.small, color: colors.textDark },
  });
}
