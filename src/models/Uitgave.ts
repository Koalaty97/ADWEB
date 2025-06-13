import * as yup from "yup";
import { Timestamp } from "firebase/firestore";
import { Transaction } from "../huishoudboekjes/inkomen/InkomstenUitgavenGraph";

export type Uitgave = {
  id: string;
  hoeveelheid: number;
  datum: Timestamp;
  categorieId: string;
  huishoudboekjeId: string;
  maand: number;
};

export const UitgaveSchema = yup.object({
  hoeveelheid: yup.number().required().min(1),
  datum: yup.date().required(),
});

export type UitgaveEntry = {
  hoeveelheid: number;
  datum: Date;
  categorieId: string;
  huishoudboekjeId: string;
};

export function mapUitgavenToTransactions(uitgaven: Uitgave[]): Transaction[] {
  return uitgaven.map((uitgave) => ({
    date: uitgave.datum.toDate().toISOString().slice(0, 10),
    hoeveelheid: uitgave.hoeveelheid,
  }));
}
