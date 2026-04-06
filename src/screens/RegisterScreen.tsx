import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { InputField } from '../components/CustomInputField';
import { CustomButton } from '../components/CustomButtom';
import { DocumentTypePicker } from '../components/DocumentTypePicker';
import { colors } from '../styles/colors';
import { registerRequest } from '../services/auth.service';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {

  const [form, setForm] = useState({
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {

    try {

      if (!form.documentType ||
          !form.documentNumber ||
          !form.firstName ||
          !form.lastName ||
          !form.email ||
          !form.phone ||
          !form.password) {

        Alert.alert("Error", "Todos los campos son obligatorios");
        return;
      }

      const fullName = `${form.firstName} ${form.lastName}`;

      await registerRequest({
        documentType: form.documentType as "CC" | "CE" | "NIT" | "PT",
        documentNumber: form.documentNumber,
        fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      Alert.alert("Registro exitoso", "Usuario creado correctamente");

      navigation.goBack();

    } catch (error) {

      console.log("Error register:", error);

      Alert.alert("Error", "No se pudo registrar el usuario");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Registro</Text>

      <DocumentTypePicker
        value={form.documentType}
        onChange={(value) => handleChange("documentType", value)}
      />

      <InputField
        placeholder="Número documento"
        value={form.documentNumber}
        onChangeText={(t) => handleChange('documentNumber', t)}
      />

      <InputField
        placeholder="Nombres"
        value={form.firstName}
        onChangeText={(t) => handleChange('firstName', t)}
      />

      <InputField
        placeholder="Apellidos"
        value={form.lastName}
        onChangeText={(t) => handleChange('lastName', t)}
      />

      <InputField
        placeholder="Correo"
        value={form.email}
        onChangeText={(t) => handleChange('email', t)}
      />

      <InputField
        placeholder="Teléfono"
        value={form.phone}
        onChangeText={(t) => handleChange('phone', t)}
      />

      <InputField
        placeholder="Contraseña"
        secureTextEntry
        value={form.password}
        onChangeText={(t) => handleChange('password', t)}
      />

      <CustomButton
        title="Registrar"
        onPress={handleRegister}
      />

      <Text
        style={styles.loginLink}
        onPress={() => navigation.goBack()}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 25,
    backgroundColor: colors.background,
    flexGrow: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 20,
  },

  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.primary,
  }

});