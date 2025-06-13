import { Categorie } from "../../../models/Categorie";
import { Uitgave } from "../../../models/Uitgave";
import CategorieUitgaven from "../_models/categorieUitgaven";

export function useCategorieUitgaven(
  categorieen: Categorie[],
  uitgaven: Uitgave[],
): CategorieUitgaven[] {
  return categorieen.map<CategorieUitgaven>((categorie) => ({
    naam: categorie.naam,
    inkomen: categorie.budgetIn,
    maxbudget: categorie.maxbudget,
    remainingBudget: categorie.budgetRemaining,
    uitgave: uitgaven
      .filter((uitgave) => uitgave.categorieId == categorie.id)
      .reduce((total, { hoeveelheid }) => total + hoeveelheid, 0),
  }));
}
