import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword ? hidePassword : false}
        style={styles.input}
      />

      {isPassword && (
        <Pressable
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.icon}
        >
          <Ionicons
            name={hidePassword ? 'eye-off' : 'eye'}
            size={22}
            color="#64748B"
          />
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    position: 'relative',
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    paddingRight: 40,
    backgroundColor: '#FFFFFF',
  },

  icon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});