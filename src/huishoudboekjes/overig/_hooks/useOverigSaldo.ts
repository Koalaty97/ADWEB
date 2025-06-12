import { query, where, orderBy } from "firebase/firestore";
import { useCallback } from "react";
import { db, collectionInkomsten, collectionUitgaven } from "../../../firebase";
import { useCollection } from "../../../hooks/useCollection";
import { Inkomst } from "../../../models/Inkomst";
import { Uitgave } from "../../../models/Uitgave";

export function useOverigSaldo(huishoudboekjeId: string, maand: number)
{
    const qFn = useCallback(
        (ref: any) => query(ref, 
            where("huishoudboekjeId", "==", huishoudboekjeId), 
            where("maand", "==", maand),
            orderBy("datum", "desc")), [maand]);

    const { items: inkomsten } = useCollection<Inkomst>(
        db,
        collectionInkomsten,
        qFn);

    const { items: uitgaven } = useCollection<Uitgave>(
        db,
        collectionUitgaven,
        qFn);

    const totalInkomsten = inkomsten.reduce((total, {hoeveelheid}) => total + hoeveelheid, 0);
    const totalUitgaven = uitgaven.reduce((total, {hoeveelheid}) => total + hoeveelheid, 0);

    return { totalInkomsten, totalUitgaven }
}