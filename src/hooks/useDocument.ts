import type { Firestore } from 'firebase/firestore';
import { subscribeToDocument } from '../services/firestoreService';
import { useEffect, useState } from 'react';

export function useDocument<T>(
  db: Firestore,
  path: string[]
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToDocument<T>(
      db,
      path,
      docData => {
        setData(docData);
        setLoading(false);
      },
      err => {
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [db, ...path]);

  return { data, loading, error };
}
