import * as yup from "yup";

export type Huishoudboekje = {
  id: string;
  naam: string;
  omschrijving: string;
  ownerId: string;
  participants: string[];
  isDeleted: boolean;
};

export const HuishoudboekjeSchema = yup.object({
  naam: yup.string().required(),
  omschrijving: yup.string(),
});

export type HuishoudboekjeEntry = {
  naam: string;
  omschrijving: string;
  ownerId: string;
  participants: string[];
};

export const IsOwner = (huishoudboekje: Huishoudboekje, userId: string) =>
  huishoudboekje.ownerId == userId;
