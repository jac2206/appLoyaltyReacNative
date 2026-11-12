import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { layout, radius, spacing, typography } from "../styles/tokens";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
};

export function ScreenHeader({ eyebrow, title, subtitle, onBack }: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.wrapper}>
      {onBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={8}
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons color={colors.primary} name="arrow-back" size={22} />
        </Pressable>
      )}

      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}

      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    wrapper: {
      marginBottom: 24,
    },

    backButton: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.md,
      borderWidth: 1,
      height: layout.touchTarget,
      justifyContent: "center",
      marginBottom: 20,
      width: layout.touchTarget,
    },

    pressed: {
      opacity: 0.65,
    },

    eyebrow: {
      color: colors.primaryText,
      ...typography.caption,
      letterSpacing: 0.7,
      marginBottom: 6,
      textTransform: "uppercase",
    },

    title: {
      color: colors.textDark,
      ...typography.title,
      letterSpacing: -0.5,
    },

    subtitle: {
      color: colors.textMuted,
      ...typography.body,
      marginTop: spacing.sm,
    },
  });
}
