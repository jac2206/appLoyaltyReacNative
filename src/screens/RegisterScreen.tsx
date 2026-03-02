import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { InputField } from '../components/CustomInputField';
import { CustomButton } from '../components/CustomButtom';
import { colors } from '../styles/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {

  const [form, setForm] = useState({
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log('Usuario registrado:', form);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <InputField placeholder="Tipo documento" value={form.documentType}
        onChangeText={(t) => handleChange('documentType', t)} />

      <InputField placeholder="Número documento" value={form.documentNumber}
        onChangeText={(t) => handleChange('documentNumber', t)} />

      <InputField placeholder="Nombres" value={form.firstName}
        onChangeText={(t) => handleChange('firstName', t)} />

      <InputField placeholder="Apellidos" value={form.lastName}
        onChangeText={(t) => handleChange('lastName', t)} />

      <InputField placeholder="Correo" value={form.email}
        onChangeText={(t) => handleChange('email', t)} />

      <InputField placeholder="Contraseña" secureTextEntry
        value={form.password}
        onChangeText={(t) => handleChange('password', t)} />

      <CustomButton title="Registrar" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 20,
  },
});