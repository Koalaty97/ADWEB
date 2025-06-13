import { Categorie, CategorieEntry } from "../models/Categorie";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { collectionCategorieen, db } from "../firebase";

export async function addCategorie(categorie: CategorieEntry) {
  const colRef = collection(db, collectionCategorieen);
  const newRef = doc(colRef);

  const entity: Categorie = {
    id: newRef.id,
    huishoudboekjeId: categorie.huishoudboekjeId,
    naam: categorie.naam,
    maxbudget: categorie.maxbudget,
    budgetIn: 0,
    budgetOut: 0,
    budgetRemaining: categorie.maxbudget,
  };

  if (categorie.einddatum) {
    entity.einddatum = Timestamp.fromDate(categorie.einddatum);
  }

  setDoc(newRef, entity);
}

export async function addCategorieInkomst(id: string, hoeveel: number) {
  const docRef = doc(db, collectionCategorieen, id);
  const categorie = await getDoc(docRef);

  if (!categorie) {
    throw new Error("Categorie kan niet worden gevonden");
  }

  const newBudgetIn = (categorie.data()!.budgetIn as number) + hoeveel;

  updateDoc(docRef, { budgetIn: newBudgetIn });
}

export async function removeCategorieInkomst(id: string, hoeveel: number) {
  const docRef = doc(db, collectionCategorieen, id);
  const categorie = await getDoc(docRef);

  if (!categorie) {
    throw new Error("Categorie kan niet worden gevonden");
  }

  const newBudgetIn = (categorie.data()!.budgetIn as number) - hoeveel;

  updateDoc(docRef, { budgetIn: newBudgetIn });
}

export async function addCategorieUitgave(id: string, hoeveel: number) {
  const docRef = doc(db, collectionCategorieen, id);
  const categorie = await getDoc(docRef);

  if (!categorie) {
    throw new Error("Categorie kan niet worden gevonden");
  }

  const newBudgetOut = (categorie.data()!.budgetOut as number) + hoeveel;
  const budgetRemaining = categorie.data()!.maxbudget - newBudgetOut;

  updateDoc(docRef, {
    budgetOut: newBudgetOut,
    budgetRemaining: budgetRemaining,
  });
}

export async function removeCategorieUitgave(id: string, hoeveel: number) {
  const docRef = doc(db, collectionCategorieen, id);
  const categorie = await getDoc(docRef);

  if (!categorie) {
    throw new Error("Categorie kan niet worden gevonden");
  }
  const newBudgetOut = (categorie.data()!.budgetOut as number) - hoeveel;
  const budgetRemaining = categorie.data()!.maxbudget - newBudgetOut;

  updateDoc(docRef, {
    budgetOut: newBudgetOut,
    budgetRemaining: budgetRemaining,
  });
}
