import * as yup from "yup";
import { Timestamp } from "firebase/firestore";
import { Transaction } from "../huishoudboekjes/inkomen/InkomstenUitgavenGraph";

export type Inkomst = {
  id: string;
  hoeveelheid: number;
  datum: Timestamp;
  categorieId: string;
  huishoudboekjeId: string;
  maand: number;
};

export const InkomstSchema = yup.object({
  hoeveelheid: yup.number().required().min(1),
  datum: yup.date().required(),
});

export type InkomstEntry = {
  hoeveelheid: number;
  datum: Date;
  categorieId: string;
  huishoudboekjeId: string;
};

export function mapInkomstenToTransactions(
  inkomsten: Inkomst[],
): Transaction[] {
  return inkomsten.map((inkomst) => ({
    date: inkomst.datum.toDate().toISOString().slice(0, 10),
    hoeveelheid: inkomst.hoeveelheid,
  }));
}
