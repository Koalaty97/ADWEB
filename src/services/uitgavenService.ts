import { collection, deleteDoc, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { collectionUitgaven, db } from '../firebase';
import { Uitgave, UitgaveEntry } from '../models/Uitgave';
import { addCategorieUitgave, removeCategorieUitgave } from './categorieService';

export async function addUitgave(uitgave: UitgaveEntry)
{
    const colRef = collection(db, collectionUitgaven);
    const newRef = doc(colRef);

    const item: Uitgave = {
        id: newRef.id,
        ...uitgave,
        datum: Timestamp.fromDate(uitgave.datum),
        maand: uitgave.datum.getMonth() + 1
    };

    setDoc(newRef, item);
    if (item.categorieId)
    {
        addCategorieUitgave(item.categorieId, item.hoeveelheid);
    }
}

export async function deleteUitgave(id: string)
{
    const inkomst = await getUitgaveById(id);
    if (inkomst.categorieId)
    {
        await removeCategorieUitgave(inkomst.categorieId, inkomst.hoeveelheid);
    }

    deleteDoc(doc(db, collectionUitgaven, id));
}

export async function updateUitgaveCategorie(id: string, categorieId: string)
{
    const docRef = doc(db, collectionUitgaven, id);
    const uitgave = (await getDoc(docRef)).data() as Uitgave;

    if (uitgave.categorieId)
    {
        await removeCategorieUitgave(uitgave.categorieId, uitgave.hoeveelheid);
    }

    updateDoc(docRef, { categorieId: categorieId });

    if (categorieId)
    {
        await addCategorieUitgave(categorieId, uitgave.hoeveelheid);
    }
}

export async function getUitgaveById(id: string) : Promise<Uitgave>
{
    const inkomen = (await getDoc(doc(db, collectionUitgaven, id)));
    if (!inkomen)
    {
        throw new Error("Uitgave niet gevonden");
    }

    return inkomen.data()! as Uitgave;
}