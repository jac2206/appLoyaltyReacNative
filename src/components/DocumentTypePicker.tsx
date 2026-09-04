import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useTheme } from "../context/ThemeContext";
import { Colors } from "../styles/colors";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const documentTypes = [
  {
    label: "Cédula de Ciudadanía",
    value: "CC",
  },
  {
    label: "Cédula de Extranjería",
    value: "CE",
  },
  {
    label: "NIT",
    value: "NIT",
  },
  {
    label: "Permiso por Protección Temporal",
    value: "PT",
  },
];

export function DocumentTypePicker({ value, onChange }: Props) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          onChange(itemValue);
        }}
        style={styles.picker}
        dropdownIconColor={colors.textDark}
      >
        <Picker.Item
          label="Seleccione tipo de documento"
          value=""
          color={colors.textMuted}
        />

        {documentTypes.map((document) => (
          <Picker.Item
            key={document.value}
            label={document.label}
            value={document.value}
            color={colors.textDark}
          />
        ))}
      </Picker>
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 16,
      backgroundColor: colors.surface,
      overflow: "hidden",
    },

    picker: {
      color: colors.textDark,
      height: 52,
    },
  });
}
