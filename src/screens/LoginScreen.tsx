import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { colors } from '../styles/colors';
import { CustomButton } from '../components/CustomButtom';
import { InputField } from '../components/CustomInputField';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {

  const {
    userEmail,
    password,
    error,
    setEmail,
    setPassword,
    validate,
  } = useLogin();

  const { login } = useAuth();

  const handleLogin = () => {
    const isValid = validate();

    if (!isValid) return;

    login(userEmail); 
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Recompensas App</Text>

      <InputField
        placeholder="Correo"
        value={userEmail}
        onChangeText={setEmail}
      />

      <InputField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && (
        <Text style={{ color: 'red', marginBottom: 10 }}>
          {error}
        </Text>
      )}

      <CustomButton title="Iniciar Sesión" onPress={handleLogin} />

      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          color: colors.primary,
        }}
        onPress={() => navigation.navigate('Register')}
      >
        ¿No tienes cuenta? Regístrate
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 20,
  },
});