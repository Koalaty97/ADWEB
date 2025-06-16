import { Huishoudboekje, HuishoudboekjeEntry } from "../models/Huishoudboekje";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { collectionHuishoudboekjes, collectionUsers, db } from "../firebase";

export async function addParticipant(
  huishoudboekId: string,
  participantUid: string
): Promise<void> {
  const ref = doc(db, "huishoudboekjes", huishoudboekId);
  await updateDoc(ref, {
    participants: arrayUnion(participantUid),
  });
}

export async function lookupUserByEmail(email: string): Promise<string | null> {
  const q = query(collection(db, collectionUsers), where("email", "==", email));
  const snap = await getDocs(q);
  if (snap.empty) {
    return null;
  }

  return snap.docs[0].data().id;
}

export async function AddHuishoudboekje(huishoudboekje: HuishoudboekjeEntry) {
  const colRef = collection(db, collectionHuishoudboekjes);
  const newRef = doc(colRef);

  const boekje: Huishoudboekje = {
    id: newRef.id,
    ...huishoudboekje,
    isDeleted: false,
  };

  await setDoc(newRef, boekje);
}

export async function AddHuishoudeboekjeParticipant(
  id: string,
  userId: string,
  participantEmail: string
) {
  const boekje = await GetHuishoudboekjeById(id, userId);
  if (!boekje) {
    throw new Error("Huishoudboekje niet gevonden");
  }

  const user = await lookupUserByEmail(participantEmail);
  if (!user) {
    throw new Error("Gebruiker niet gevonden");
  }

  if (boekje.participants.includes(user)) {
    return;
  }

  boekje.participants.push(user);
  updateDoc(doc(db, collectionHuishoudboekjes, id), boekje);
}

export async function GetHuishoudboekjeById(
  id: string,
  userId: string
): Promise<Huishoudboekje> {
  const result = await getDoc(doc(db, collectionHuishoudboekjes, id));
  if (!result) {
    throw new Error("Huishoudboekje niet gevonden");
  }

  const huishoudboekje = result.data() as Huishoudboekje;

  return huishoudboekje;
}

export async function ArchiveerHuishoudboekjes(id: string, userId: string) {
  const document = doc(db, "huishoudboekjes", id);
  const boekje = GetHuishoudboekjeById(id, userId);
  if (!boekje) {
    throw new Error("Huishoudboekje niet gevonden");
  }

  updateDoc(document, { isDeleted: true });
}

export async function OnArchiveerHuishoudboekjes(id: string, userId: string) {
  const document = doc(db, "huishoudboekjes", id);
  const boekje = GetHuishoudboekjeById(id, userId);
  if (!boekje) {
    throw new Error("Huishoudboekje niet gevonden");
  }

  updateDoc(document, { isDeleted: false });
}

export async function UpdateHuishoudboekje(huishoudboekje: Huishoudboekje) {
  const document = doc(db, "huishoudboekjes", huishoudboekje.id);
  const boekje = GetHuishoudboekjeById(
    huishoudboekje.id,
    huishoudboekje.ownerId
  );
  if (!boekje) {
    throw new Error("Huishoudboekje niet gevonden");
  }

  updateDoc(document, huishoudboekje);
}
