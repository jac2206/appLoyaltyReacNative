import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { radius, spacing, typography } from "../styles/tokens";
import { CustomButton } from "./CustomButtom";

type Props = {
  title: string;
  message?: string;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  action?: { label: string; onPress: () => void };
};

export function ContentState({
  title,
  message,
  loading,
  icon = "receipt-outline",
  action,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View accessibilityLiveRegion="polite" style={styles.state}>
      <View style={styles.icon}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primaryText} />
        ) : (
          <Ionicons
            accessible={false}
            name={icon}
            size={32}
            color={colors.primaryText}
          />
        )}
      </View>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {action && (
        <View style={styles.action}>
          <CustomButton
            title={action.label}
            variant="outline"
            onPress={action.onPress}
          />
        </View>
      )}
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    state: {
      alignItems: "center",
      paddingVertical: spacing.xxl,
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      width: 64,
      height: 64,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceMuted,
      borderRadius: radius.lg,
      marginBottom: spacing.lg,
    },
    title: { ...typography.heading, color: colors.textDark, textAlign: "center" },
    message: {
      ...typography.body,
      color: colors.textMuted,
      textAlign: "center",
      marginTop: spacing.sm,
    },
    action: { alignSelf: "stretch", marginTop: spacing.sm },
  });
}
