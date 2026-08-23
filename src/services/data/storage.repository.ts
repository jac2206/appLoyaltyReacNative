import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem<T>(key: string, value: T) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('Error saving item:', error);
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('Error getting item:', error);
    return null;
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing item:', error);
  }
}
