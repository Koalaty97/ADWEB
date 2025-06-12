import { useEffect, useState } from 'react';

function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) as T : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

export default useLocalStorageState;
