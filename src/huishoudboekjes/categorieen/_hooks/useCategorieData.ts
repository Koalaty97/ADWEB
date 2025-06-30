import { useCategorieen } from "./useCategorieen";
import { useNotifier } from "../../../contexts/NotificationContext";
import { addCategorie } from "../../../services/categorieService";

export function useCategorieData(huishoudboekjeId: string) {
  const {
    items: categories,
    loading,
    error: loadError,
  } = useCategorieen(huishoudboekjeId);
  const { notify } = useNotifier();

  async function add(
    naam: string,
    maxbudget: number,
    einddatum: Date | undefined
  ) {
    try {
      await addCategorie({ naam, maxbudget, einddatum, huishoudboekjeId });
      notify("Categorie succesvol toegevoegd");
    } catch (err) {
      console.error(err);
    }
  }

  return { categories, loading, loadError, add };
}
