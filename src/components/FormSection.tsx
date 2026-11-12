import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { radius, spacing, typography } from "../styles/tokens";

type Props = { title: string; description?: string; children: ReactNode };

export function FormSection({ title, description, children }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.fields}>{children}</View>
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    section: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      padding: spacing.lg,
      marginBottom: spacing.xl,
    },
    title: { ...typography.subheading, color: colors.textDark },
    description: {
      ...typography.small,
      color: colors.textMuted,
      marginTop: spacing.xs,
    },
    fields: { marginTop: spacing.lg },
  });
}
