import { useUitgaven } from "./useUitgaven";
import { useNotifier } from "../../../contexts/NotificationContext";
import { addUitgave } from "../../../services/uitgavenService";

export function useUitgavenData(huishoudboekjeId: string, maand: number) {
  const {
    items: uitgaven,
    loading,
    error: loadError,
  } = useUitgaven(huishoudboekjeId, maand);
  const { notify } = useNotifier();

  async function add(hoeveelheid: number, datum: Date, categorieId: string) {
    try {
      await addUitgave({ hoeveelheid, datum, categorieId, huishoudboekjeId });
      notify("Uitgave succesvol toegevoegd");
    } catch (err) {
      console.error(err);
    }
  }

  return { uitgaven, loading, loadError, add };
}
