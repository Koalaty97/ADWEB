import type { Firestore } from 'firebase/firestore';
import { subscribeToCollection } from '../services/firestoreService';
import { useEffect, useState } from 'react';

export function useCollection<T>(
  db: Firestore,
  colName: string,
  queryFn?: (ref: any) => any
): { items: (T & { id: string })[]; loading: boolean; error: Error | null } {
  const [items, setItems] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<T>(
      db,
      colName,
      list => {
        setItems(list);
        setLoading(false);
      },
      err => {
        setError(err);
        setLoading(false);
      },
      queryFn
    );
    return unsubscribe;
  }, [db, colName, queryFn]);

  return { items, loading, error };
}
