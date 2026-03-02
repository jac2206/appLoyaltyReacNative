import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export function InputField({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
});