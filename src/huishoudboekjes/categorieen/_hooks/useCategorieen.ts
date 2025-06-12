import { query, where } from "firebase/firestore";
import { useCallback } from "react";
import { db, collectionCategorieen } from "../../../firebase";
import { useCollection } from "../../../hooks/useCollection";
import { Categorie } from "../../../models/Categorie";

interface useCategorieenResponse
{
  items: Categorie[];
  loading: boolean;
  error: Error | null;
}

export function useCategorieen(huishoudboekjeId: string) : useCategorieenResponse {
  const qFn = useCallback(
      (ref: any) => query(ref, where("huishoudboekjeId", "==", huishoudboekjeId)), 
      [huishoudboekjeId]);

  const { items, loading, error } = useCollection<Categorie>(
    db, 
    collectionCategorieen,
    qFn);

  return { items, loading, error };
}

export default useCategorieen;
