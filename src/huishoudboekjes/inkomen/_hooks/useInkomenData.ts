import { useNotifier } from "../../../contexts/NotificationContext";
import { Inkomst } from "../../../models/Inkomst";
import { addInkomst } from "../../../services/inkomstenService";
import { useInkomen } from "./useInkomen";

interface UseInkomenData {
  inkomsten: Inkomst[];
  loading: boolean;
  error: Error | null;
  add: (hoeveelheid: number, datum: Date, categorieId: string) => Promise<void>;
}

export function useInkomenData(
  huishoudboekjeId: string,
  maand: number,
): UseInkomenData {
  const {
    items: inkomsten,
    loading,
    error: loadError,
  } = useInkomen(huishoudboekjeId, maand);
  const { notify } = useNotifier();

  async function add(hoeveelheid: number, datum: Date, categorieId: string) {
    try {
      await addInkomst({ hoeveelheid, datum, categorieId, huishoudboekjeId });
      notify("Inkomst succesvol toegevoegd");
    } catch (err) {
      console.error(err);
    }
  }

  return { inkomsten, loading, error: loadError, add };
}
