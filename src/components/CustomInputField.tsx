import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import type { TextInputProps } from "react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { layout, radius, spacing, typography } from "../styles/tokens";
import { useFocusedInput } from "./ScreenLayout";

type Props = Omit<TextInputProps, "style"> & {
  label?: string;
  hint?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function InputField({
  label,
  placeholder,
  hint,
  error,
  icon,
  secureTextEntry = false,
  editable = true,
  onFocus,
  onBlur,
  ...inputProps
}: Props) {
  const [hidePassword, setHidePassword] = useState(true);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const setFocusedInput = useFocusedInput();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const fieldLabel = label ?? placeholder;

  return (
    <View style={styles.container}>
      {fieldLabel && <Text style={styles.label}>{fieldLabel}</Text>}
      <View
        style={[
          styles.control,
          focused && styles.focused,
          error ? styles.invalid : undefined,
          !editable && styles.disabled,
        ]}
      >
        {icon && (
          <Ionicons accessible={false} name={icon} size={20} color={colors.textMuted} />
        )}
        <TextInput
          {...inputProps}
          ref={inputRef}
          accessibilityLabel={inputProps.accessibilityLabel ?? fieldLabel}
          accessibilityHint={error ?? hint ?? inputProps.accessibilityHint}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          editable={editable}
          secureTextEntry={secureTextEntry && hidePassword}
          onFocus={(event) => {
            setFocused(true);
            setFocusedInput(inputRef.current);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            setFocusedInput(null);
            onBlur?.(event);
          }}
          style={styles.input}
        />

        {secureTextEntry && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              hidePassword ? "Mostrar contraseña" : "Ocultar contraseña"
            }
            disabled={!editable}
            onPress={() => setHidePassword((current) => !current)}
            style={styles.icon}
          >
            <Ionicons
              accessible={false}
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={colors.textMuted}
            />
          </Pressable>
        )}
      </View>
      {(error || hint) && (
        <Text
          accessibilityRole={error ? "alert" : undefined}
          style={[styles.hint, error ? styles.error : undefined]}
        >
          {error ?? hint}
        </Text>
      )}
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      marginBottom: spacing.lg,
    },

    label: { ...typography.label, color: colors.textDark, marginBottom: spacing.sm },
    control: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      borderWidth: 1,
      borderColor: colors.controlBorder,
      borderRadius: radius.md,
      minHeight: layout.controlHeight,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.inputSurface,
    },
    focused: {
      borderColor: colors.primaryText,
      borderWidth: 2,
      paddingHorizontal: spacing.md - 1,
    },
    invalid: { borderColor: colors.error },
    disabled: { opacity: 0.55 },
    input: {
      ...typography.body,
      flex: 1,
      minWidth: 0,
      color: colors.textDark,
      paddingVertical: spacing.md,
    },
    hint: { ...typography.small, color: colors.textMuted, marginTop: spacing.xs },
    error: { color: colors.error },

    icon: {
      minWidth: layout.touchTarget,
      minHeight: layout.touchTarget,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
