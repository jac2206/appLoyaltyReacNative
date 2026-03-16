import { useState } from 'react';

export function useLogin() {

  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (): boolean => {

    if (userEmail.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios');
      return false;
    }

    setError(null);
    return true;
  };

  return {
    userEmail,
    password,
    error,
    setEmail,
    setPassword,
    validate
  };
}