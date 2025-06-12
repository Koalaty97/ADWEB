import { query, where, orderBy } from "firebase/firestore";
import { useCallback } from "react";
import { db, collectionInkomsten } from "../../../firebase";
import { useCollection } from "../../../hooks/useCollection";
import { Inkomst } from "../../../models/Inkomst";

interface useInkomenResponse
{
  items: Inkomst[];
  loading: boolean;
  error: Error | null;
}

export function useInkomen(huishoudboekjeId: string, maand: number) : useInkomenResponse {
    const qFn = useCallback(
        (ref: any) => query(ref, 
            where("huishoudboekjeId", "==", huishoudboekjeId), 
            where("maand", "==", maand),
            orderBy("datum", "desc")), [maand]);

    const { items, loading, error } = useCollection<Inkomst>(
        db,
        collectionInkomsten,
        qFn);

  return { items, loading, error };
}
