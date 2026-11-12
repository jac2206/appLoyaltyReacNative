import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { layout, radius, spacing, typography } from "../styles/tokens";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "danger" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function CustomButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  accessibilityHint,
  icon,
}: Props) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const styles = createStyles(colors);

  const isDisabled = disabled || loading;
  const foreground =
    variant === "outline" || variant === "ghost"
      ? colors.primaryText
      : variant === "secondary"
        ? colors.textDark
        : variant === "danger"
          ? colors.onError
          : colors.onPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        styles.button,

        variant === "outline" && styles.outlineButton,

        variant === "danger" && styles.dangerButton,

        variant === "secondary" && styles.secondaryButton,

        variant === "ghost" && styles.ghostButton,

        focused && styles.focused,

        isDisabled && styles.disabled,

        pressed && !isDisabled && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon && !loading && (
          <Ionicons accessible={false} name={icon} size={20} color={foreground} />
        )}

        {loading && <ActivityIndicator color={foreground} />}

        <Text style={[styles.text, { color: foreground }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      minHeight: layout.controlHeight,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      paddingVertical: spacing.md,
      borderWidth: 1,
      borderColor: "transparent",
    },

    content: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    outlineButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primary,
    },

    dangerButton: {
      backgroundColor: colors.error,
    },

    secondaryButton: {
      backgroundColor: colors.surfaceMuted,
      borderColor: colors.border,
    },
    ghostButton: { backgroundColor: "transparent" },
    focused: { borderColor: colors.textDark, borderWidth: 2 },

    disabled: {
      opacity: 0.55,
    },

    pressed: {
      opacity: 0.8,
    },

    text: {
      ...typography.subheading,
      textAlign: "center",
      flexShrink: 1,
    },
  });
}
