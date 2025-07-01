import * as categorieService from "./categorieService";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db, collectionCategorieen } from "../firebase";
import { hu } from "date-fns/locale";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  Timestamp: { fromDate: jest.fn((d) => d) },
}));

jest.mock("../firebase", () => ({
  db: {},
  collectionCategorieen: "categorieen",
}));

describe("categorieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("addCategorie calls setDoc", async () => {
    (collection as jest.Mock).mockReturnValue("colRef");
    (doc as jest.Mock).mockReturnValue({ id: "id1" });
    await categorieService.addCategorie({
      huishoudboekjeId: "h1",
      naam: "Test",
      maxbudget: 100,
    } as any);
    expect(setDoc).toHaveBeenCalled();
  });

  it("addCategorieInkomst updates budgetIn", async () => {
    (getDoc as jest.Mock).mockResolvedValue({ data: () => ({ budgetIn: 10 }) });
    await categorieService.addCategorieInkomst("cat1", 5);
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), { budgetIn: 15 });
  });

  it("removeCategorieInkomst updates budgetIn", async () => {
    (getDoc as jest.Mock).mockResolvedValue({ data: () => ({ budgetIn: 10 }) });
    await categorieService.removeCategorieInkomst("cat1", 5);
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), { budgetIn: 5 });
  });

  it("addCategorieUitgave updates budgetOut and budgetRemaining", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ budgetOut: 10, maxbudget: 100 }),
      exists: () => true,
    });
    await categorieService.addCategorieUitgave("cat1", 5);
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
      budgetOut: 15,
      budgetRemaining: 85,
    });
  });

  it("removeCategorieUitgave updates budgetOut and budgetRemaining", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ budgetOut: 10, maxbudget: 100 }),
      exists: () => true,
    });
    await categorieService.removeCategorieUitgave("cat1", 5);
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
      budgetOut: 5,
      budgetRemaining: 95,
    });
  });

  it("removeCategorie calls deleteDoc with correct docRef", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    await categorieService.removeCategorie("cat1");
    expect(deleteDoc).toHaveBeenCalledWith("docRef");
  });

  it("getCategorieById returns categorie data if exists", async () => {
    const mockCategorie = { id: "cat1", naam: "Test" };
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockCategorie,
    });
    const result = await categorieService.getCategorieById("cat1");
    expect(result).toEqual(mockCategorie);
  });

  it("getCategorieById throws error if not exists", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
    });
    await expect(categorieService.getCategorieById("cat1")).rejects.toThrow(
      "Categorie niet gevonden"
    );
  });
});
