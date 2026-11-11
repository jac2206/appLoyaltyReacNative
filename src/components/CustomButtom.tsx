import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { radius, spacing } from "../styles/tokens";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline" | "danger";
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

  const styles = createStyles(colors);

  const isDisabled = disabled || loading;
  const foreground =
    variant === "outline"
      ? colors.primaryText
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
      style={({ pressed }) => [
        styles.button,

        variant === "outline" && styles.outlineButton,

        variant === "danger" && styles.dangerButton,

        isDisabled && styles.disabled,

        pressed && !isDisabled && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon && <Ionicons name={icon} size={20} color={foreground} />}

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
      minHeight: 52,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.md,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
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

    disabled: {
      opacity: 0.55,
    },

    pressed: {
      transform: [
        {
          scale: 0.98,
        },
      ],
    },

    text: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
}
