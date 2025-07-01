import * as uitgavenService from "./uitgavenService";
import * as categorieService from "./categorieService";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db, collectionUitgaven } from "../firebase";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
  where: jest.fn(),
  query: jest.fn(),
  Timestamp: { fromDate: jest.fn((d) => d) },
}));

jest.mock("./categorieService", () => ({
  addCategorieUitgave: jest.fn(),
  removeCategorieUitgave: jest.fn(),
}));

jest.mock("../firebase", () => ({
  db: {},
  collectionUitgaven: "uitgaven",
}));

describe("uitgavenService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("addUitgave calls setDoc and addCategorieUitgave", async () => {
    (collection as jest.Mock).mockReturnValue("colRef");
    (doc as jest.Mock).mockReturnValue({ id: "id1" });
    const entry = { datum: new Date(), hoeveelheid: 10, categorieId: "cat1" };
    await uitgavenService.addUitgave(entry as any);
    expect(setDoc).toHaveBeenCalled();
    expect(categorieService.addCategorieUitgave).toHaveBeenCalledWith(
      "cat1",
      10
    );
  });

  it("deleteUitgave calls removeCategorieUitgave and deleteDoc", async () => {
    const mockUitgave = { categorieId: "cat1", hoeveelheid: 10 };
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => mockUitgave,
    });
    await uitgavenService.deleteUitgave("id1");
    expect(categorieService.removeCategorieUitgave).toHaveBeenCalledWith(
      "cat1",
      10
    );
    expect(deleteDoc).toHaveBeenCalled();
  });

  it("updateUitgaveCategorie updates categorie and calls add/remove", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ categorieId: "old", hoeveelheid: 5 }),
    });
    await uitgavenService.updateUitgaveCategorie("id1", "new");
    expect(categorieService.removeCategorieUitgave).toHaveBeenCalledWith(
      "old",
      5
    );
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
      categorieId: "new",
    });
    expect(categorieService.addCategorieUitgave).toHaveBeenCalledWith("new", 5);
  });

  it("getUitgaveById returns uitgave data", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1" }),
      id: "id1",
    });
    const uitgave = await uitgavenService.getUitgaveById("id1");
    expect(uitgave).toEqual({ id: "id1" });
  });

  it("resetUitgavenCategorieByCategorieId resets categorieId for all matching uitgaven", async () => {
    const mockDocs = [{ ref: "ref1" }, { ref: "ref2" }];
    const mockQuerySnapshot = {
      docs: mockDocs,
    };
    const getDocs = require("firebase/firestore").getDocs;
    getDocs.mockResolvedValue(mockQuerySnapshot);

    await uitgavenService.resetUitgavenCategorieByCategorieId("cat1");

    expect(getDocs).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalledWith("ref1", { categorieId: "" });
    expect(updateDoc).toHaveBeenCalledWith("ref2", { categorieId: "" });
  });
});
