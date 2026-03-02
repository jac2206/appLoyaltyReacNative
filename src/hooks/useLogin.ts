import { useState } from 'react';

export function useLogin() {
  const [userName, setName] = useState('admin');
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (): boolean => {
    if (userEmail.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (userEmail !== 'admin@gmail.com' || password !== '123') {
      setError('Credenciales incorrectas');
      return false;
    }

    setError(null);
    return true;
  };

  return {
    userEmail,
    password,
    error,
    userName,
    setEmail,
    setPassword,
    validate,
    setName
  };
}