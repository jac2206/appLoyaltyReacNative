import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { radius, spacing } from "../styles/tokens";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const documentTypes = [
  { label: "Cédula de Ciudadanía", value: "CC" },
  { label: "Cédula de Extranjería", value: "CE" },
  { label: "NIT", value: "NIT" },
  { label: "Permiso por Protección Temporal", value: "PT" },
];

export function DocumentTypeSelector({ value, onChange }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [visible, setVisible] = useState(false);
  const selectedDocument = documentTypes.find((item) => item.value === value);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Seleccionar tipo de documento"
        accessibilityState={{ expanded: visible }}
        onPress={() => setVisible(true)}
        style={styles.container}
      >
        <Text style={selectedDocument ? styles.value : styles.placeholder}>
          {selectedDocument?.label ?? "Seleccione tipo de documento"}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cerrar selección de documento"
          onPress={() => setVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Tipo de documento</Text>

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
                  {isSelected && <Text style={styles.check}>✓</Text>}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.md,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.lg,
      minHeight: 52,
      paddingHorizontal: spacing.lg,
    },
    placeholder: {
      color: colors.textMuted,
      flex: 1,
      fontSize: 16,
    },
    value: {
      color: colors.textDark,
      flex: 1,
      fontSize: 16,
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
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: radius.lg,
      borderWidth: 1,
      padding: 18,
      width: "100%",
    },
    modalTitle: {
      color: colors.textDark,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 8,
    },
    option: {
      alignItems: "center",
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      minHeight: 48,
      paddingHorizontal: 12,
    },
    selectedOption: {
      backgroundColor: colors.surfaceMuted,
    },
    optionText: {
      color: colors.textDark,
      flex: 1,
      fontSize: 15,
    },
    check: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "800",
    },
  });
}
