import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function DocumentTypePicker({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        <Picker.Item label="Seleccione tipo de documento" value="" />

        <Picker.Item label="Cédula de Ciudadanía" value="CC" />

        <Picker.Item label="Cédula de Extranjería" value="CE" />

        <Picker.Item label="NIT" value="NIT" />

        <Picker.Item label="Permiso Temporal de Permanencia" value="PT" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
