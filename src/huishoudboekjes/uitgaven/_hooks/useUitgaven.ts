import { query, where, orderBy } from "firebase/firestore";
import { useCallback } from "react";
import { db, collectionUitgaven } from "../../../firebase";
import { useCollection } from "../../../hooks/useCollection";
import { Uitgave } from "../../../models/Uitgave";

export function useUitgaven(huishoudboekjeId: string, maand: number) {
  const qFn = useCallback(
    (ref: any) =>
      query(
        ref,
        where("huishoudboekjeId", "==", huishoudboekjeId),
        where("maand", "==", maand),
        orderBy("datum", "desc"),
      ),
    [maand],
  );

  const { items, loading, error } = useCollection<Uitgave>(
    db,
    collectionUitgaven,
    qFn,
  );

  return { items, loading, error };
}
