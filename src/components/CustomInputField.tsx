import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { radius, spacing } from "../styles/tokens";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export function InputField({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: Props) {
  const [hidePassword, setHidePassword] = useState(true);
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? hidePassword : false}
        style={styles.input}
      />

      {isPassword && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            hidePassword ? "Mostrar contraseña" : "Ocultar contraseña"
          }
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.icon}
        >
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={22}
            color={colors.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
      position: "relative",
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.md,
      minHeight: 52,
      paddingHorizontal: spacing.lg,
      paddingRight: spacing.xxxl + spacing.sm,
      backgroundColor: colors.surface,
      color: colors.textDark,
      fontSize: 16,
    },

    icon: {
      position: "absolute",
      right: 12,
      top: 4,
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
