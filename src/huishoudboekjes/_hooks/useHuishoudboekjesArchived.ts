import { collectionHuishoudboekjes, db } from '../../firebase';
import { and, or, query, where } from 'firebase/firestore';
import type { Huishoudboekje } from '../../models/Huishoudboekje';
import { useAuth } from '../../contexts/AuthContext';
import { useCallback } from 'react';
import { useCollection } from '../../hooks/useCollection';

interface useHuishoudboekjesResponse
{
  items: Huishoudboekje[];
  loading: boolean;
  error: Error | null;
}

export function useHuishoudboekjesArchived() : useHuishoudboekjesResponse {
  const { user } = useAuth();

  const qFn = useCallback(
    (ref: any) => query(ref, 
        where("isDeleted", "==", true),
        where("ownerId", "==", user!.id)
      ), []);

  const { items, loading, error } = useCollection<Huishoudboekje>(
    db, 
    collectionHuishoudboekjes,
    qFn);

  return { items, loading, error };
}
