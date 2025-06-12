import { collection, doc, DocumentReference, DocumentSnapshot, Firestore, onSnapshot, Query, QuerySnapshot, Unsubscribe } from 'firebase/firestore';

export function subscribeToDocument<T>(
  db: Firestore,
  path: string[],
  onUpdate: (data: T | null) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const [col, ...rest] = path;
  let ref: DocumentReference = doc(db, col, rest[0]);
  
  return onSnapshot(
    ref,
    (snap: DocumentSnapshot) => {
      if (snap.exists()) {
        onUpdate(snap.data() as T);
      } else {
        onUpdate(null);
      }
    },
    onError
  );
}

export function subscribeToCollection<T>(
  db: Firestore,
  colName: string,
  onUpdate: (items: (T & { id: string })[]) => void,
  onError: (error: Error) => void,
  queryFn?: (ref: Query) => Query
): Unsubscribe {
  let colRef: Query = collection(db, colName);
  if (queryFn) {
    colRef = queryFn(colRef);
  }

  return onSnapshot(
    colRef,
    (snap: QuerySnapshot) => {
      const list = snap.docs.map(d => ({ id: d.id, ...(d.data() as T) }));
      onUpdate(list);
    },
    onError
  );
}
