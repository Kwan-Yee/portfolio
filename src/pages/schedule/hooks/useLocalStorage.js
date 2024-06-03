import { useCallback, useState } from 'react';
import { load, save } from '../utils/local-storage';

export function useLocalStorage(key, defaultValue=null) {
  const [value, setValue] = useState(() => load(key) ?? defaultValue);

  const handleValueChange = useCallback(
    (newValue) => {
      setValue((prevState) => {
        const updatedValue =
          typeof newValue === 'function'
            ? newValue(prevState)
            : newValue;
        save(key, updatedValue);
        return updatedValue;
      });
    },
    [key],
  );

  return [value, handleValueChange]
}