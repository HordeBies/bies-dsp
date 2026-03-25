import { useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '@utils/storage';

export const useLocalStorage = (
  key: string,
  initialValue: Record<string, number> = {},
) => {
  const [storedValue, setStoredValue] = useState<Record<string, number>>(() => {
    return loadFromStorage();
  });

  const setValue = useCallback(
    (
      value:
        | Record<string, number>
        | ((val: Record<string, number>) => Record<string, number>),
    ) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        saveToStorage(valueToStore);
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    },
    [storedValue],
  );

  return [storedValue, setValue] as const;
};
