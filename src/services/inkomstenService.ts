import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { collectionInkomsten, db } from "../firebase";
import { Inkomst, InkomstEntry } from "../models/Inkomst";
import {
  addCategorieInkomst,
  removeCategorieInkomst,
} from "./categorieService";

export async function addInkomst(inkomst: InkomstEntry) {
  const colRef = collection(db, collectionInkomsten);
  const newRef = doc(colRef);

  const item: Inkomst = {
    id: newRef.id,
    ...inkomst,
    datum: Timestamp.fromDate(inkomst.datum),
    maand: inkomst.datum.getMonth() + 1,
  };

  setDoc(newRef, item);

  if (item.categorieId) {
    await addCategorieInkomst(item.categorieId, item.hoeveelheid);
  }
}

export async function deleteInkomst(id: string) {
  const inkomst = await getInkomstById(id);
  if (inkomst.categorieId) {
    await removeCategorieInkomst(inkomst.categorieId, inkomst.hoeveelheid);
  }

  deleteDoc(doc(db, collectionInkomsten, id));
}

export async function updateInkomstCategorie(id: string, categorieId: string) {
  const docRef = doc(db, collectionInkomsten, id);
  const inkomst = (await getDoc(docRef)).data() as Inkomst;

  if (inkomst.categorieId) {
    await removeCategorieInkomst(inkomst.categorieId, inkomst.hoeveelheid);
  }

  updateDoc(docRef, { categorieId: categorieId });

  if (categorieId) {
    await addCategorieInkomst(categorieId, inkomst.hoeveelheid);
  }
}

export async function getInkomstById(id: string): Promise<Inkomst> {
  const inkomen = await getDoc(doc(db, collectionInkomsten, id));
  if (!inkomen) {
    throw new Error("Inkomen niet gevonden");
  }

  return inkomen.data()! as Inkomst;
}

export async function resetInkomstenCategorieByCategorieId(
  categorieId: string
) {
  const inkomstenRef = collection(db, collectionInkomsten);
  const q = query(inkomstenRef, where("categorieId", "==", categorieId));
  const querySnapshot = await getDocs(q);

  const updates = querySnapshot.docs.map((docSnap) =>
    updateDoc(docSnap.ref, { categorieId: "" })
  );

  await Promise.all(updates);
}

export async function updateInkomst(inkomstId: string, inkomst: InkomstEntry) {
  const document = doc(db, collectionInkomsten, inkomstId);
  const ink = await getInkomstById(inkomstId);
  if (!ink) {
    throw new Error("Inkomst niet gevonden");
  }

  const updatedInkomst: Inkomst = {
    id: inkomstId,
    huishoudboekjeId: ink.huishoudboekjeId,
    categorieId: inkomst.categorieId,
    hoeveelheid: inkomst.hoeveelheid,
    datum: Timestamp.fromDate(inkomst.datum),
    maand: inkomst.datum.getMonth() + 1,
  };

  if (ink.categorieId != "") {
    await removeCategorieInkomst(ink.categorieId, ink.hoeveelheid);
  }

  if (inkomst.categorieId != "") {
    await addCategorieInkomst(inkomst.categorieId, inkomst.hoeveelheid);
  }

  updateDoc(document, updatedInkomst);
}
