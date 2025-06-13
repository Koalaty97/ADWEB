import {
  query,
  where,
  CollectionReference,
  Query,
  documentId,
} from "firebase/firestore";
import { Uitgave } from "../../../models/Uitgave";
import { useCollection } from "../../../hooks/useCollection";
import { collectionUitgaven, db } from "../../../firebase";
import { useCallback } from "react";

function useFilteredUitgaven(categorieIds: string[]) {
  const queryUitgaven = useCallback(
    (ref: CollectionReference<Uitgave>): Query<Uitgave> => {
      if (categorieIds.length === 0) {
        return query(ref, where("id", "==", "__no_match__"));
      }
      return query(ref, where("categorieId", "in", categorieIds));
    },
    [categorieIds],
  );

  const {
    items: rawUitgaven,
    loading,
    error,
  } = useCollection<Uitgave>(db, collectionUitgaven, queryUitgaven);

  const items = rawUitgaven ?? [];
  return { items, loading, error };
}

export default useFilteredUitgaven;
