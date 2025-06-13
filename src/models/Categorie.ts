import { Timestamp } from "firebase/firestore";
import * as yup from "yup";

export type Categorie = {
  id: string;
  naam: string;
  einddatum?: Timestamp;
  budgetIn: number;
  budgetOut: number;
  budgetRemaining: number;
  maxbudget: number;
  huishoudboekjeId: string;
};

export const categorieSchema = yup.object({
  naam: yup.string().required().min(2),
  einddatum: yup.date(),
  maxbudget: yup.number().required().min(1).label("budget"),
});

export type CategorieEntry = {
  naam: string;
  einddatum?: Date;
  maxbudget: number;
  huishoudboekjeId: string;
};
