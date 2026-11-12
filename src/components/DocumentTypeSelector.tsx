import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { layout, radius, spacing, typography } from "../styles/tokens";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
};

const documentTypes = [
  { label: "Cédula de Ciudadanía", value: "CC" },
  { label: "Cédula de Extranjería", value: "CE" },
  { label: "NIT", value: "NIT" },
  { label: "Permiso por Protección Temporal", value: "PT" },
];

export function DocumentTypeSelector({
  value,
  onChange,
  error,
  disabled = false,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [visible, setVisible] = useState(false);
  const selectedDocument = documentTypes.find((item) => item.value === value);

  return (
    <>
      <Text style={styles.label}>Tipo de documento</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Tipo de documento: ${selectedDocument?.label ?? "sin seleccionar"}`}
        accessibilityHint={error}
        accessibilityState={{ expanded: visible, disabled }}
        disabled={disabled}
        onPress={() => setVisible(true)}
        style={[
          styles.container,
          visible && styles.focused,
          error ? styles.invalid : undefined,
          disabled && styles.disabled,
        ]}
      >
        <Text style={selectedDocument ? styles.value : styles.placeholder}>
          {selectedDocument?.label ?? "Seleccione tipo de documento"}
        </Text>
        <Ionicons
          accessible={false}
          name="chevron-down-outline"
          size={20}
          color={colors.textMuted}
        />
      </Pressable>
      {error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}

      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cerrar selección de documento"
            onPress={() => setVisible(false)}
            style={StyleSheet.absoluteFill}
          ></Pressable>
          <View accessibilityViewIsModal style={styles.modalCard}>
            <View style={styles.modalHeading}>
              <Text accessibilityRole="header" style={styles.modalTitle}>
                Tipo de documento
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cerrar selección"
                onPress={() => setVisible(false)}
                style={styles.close}
              >
                <Ionicons
                  accessible={false}
                  name="close-outline"
                  size={24}
                  color={colors.textDark}
                />
              </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              {documentTypes.map((document) => {
                const isSelected = document.value === value;

                return (
                  <Pressable
                    key={document.value}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: isSelected }}
                    onPress={() => {
                      onChange(document.value);
                      setVisible(false);
                    }}
                    style={[styles.option, isSelected && styles.selectedOption]}
                  >
                    <Text style={styles.optionText}>{document.label}</Text>
                    {isSelected && (
                      <Ionicons
                        accessible={false}
                        name="checkmark-circle"
                        size={22}
                        color={colors.primaryText}
                      />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.inputSurface,
      borderColor: colors.controlBorder,
      borderRadius: radius.md,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.lg,
      minHeight: layout.controlHeight,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
    },
    label: { ...typography.label, color: colors.textDark, marginBottom: spacing.sm },
    focused: { borderColor: colors.primaryText },
    invalid: { borderColor: colors.error },
    disabled: { opacity: 0.55 },
    error: {
      ...typography.small,
      color: colors.error,
      marginTop: -spacing.sm,
      marginBottom: spacing.lg,
    },
    placeholder: {
      color: colors.textMuted,
      flex: 1,
      ...typography.body,
    },
    value: {
      color: colors.textDark,
      flex: 1,
      ...typography.body,
    },
    chevron: {
      color: colors.textDark,
      fontSize: 22,
      lineHeight: 22,
      marginLeft: 8,
    },
    modalOverlay: {
      alignItems: "center",
      backgroundColor: colors.overlay,
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },
    modalCard: {
      maxWidth: layout.contentWidth,
      maxHeight: "80%",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      padding: 18,
      width: "100%",
    },
    modalTitle: {
      color: colors.textDark,
      ...typography.heading,
      flex: 1,
      marginBottom: 8,
    },
    option: {
      alignItems: "center",
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      minHeight: 48,
      paddingHorizontal: 12,
      paddingVertical: spacing.md,
      gap: spacing.sm,
    },
    selectedOption: {
      backgroundColor: colors.surfaceMuted,
    },
    optionText: {
      color: colors.textDark,
      flex: 1,
      ...typography.body,
    },
    check: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "800",
    },
    modalHeading: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    close: {
      width: layout.touchTarget,
      height: layout.touchTarget,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
