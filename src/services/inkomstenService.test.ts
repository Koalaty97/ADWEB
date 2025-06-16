import * as inkomstenService from "./inkomstenService";
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
import { db, collectionInkomsten } from "../firebase";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  deleteDoc: jest.fn(),
  updateDoc: jest.fn(),
  Timestamp: { fromDate: jest.fn((d) => d) },
}));

jest.mock("./categorieService", () => ({
  addCategorieInkomst: jest.fn(),
  removeCategorieInkomst: jest.fn(),
}));

jest.mock("../firebase", () => ({
  db: {},
  collectionInkomsten: "inkomsten",
}));

describe("inkomstenService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("addInkomst calls setDoc and addCategorieInkomst", async () => {
    (collection as jest.Mock).mockReturnValue("colRef");
    (doc as jest.Mock).mockReturnValue({ id: "id1" });
    const entry = { datum: new Date(), hoeveelheid: 10, categorieId: "cat1" };
    await inkomstenService.addInkomst(entry as any);
    expect(setDoc).toHaveBeenCalled();
    expect(categorieService.addCategorieInkomst).toHaveBeenCalledWith(
      "cat1",
      10
    );
  });

  it("deleteInkomst calls removeCategorieInkomst and deleteDoc", async () => {
    const mockInkomst = { categorieId: "cat1", hoeveelheid: 10 };
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => mockInkomst,
    });
    await inkomstenService.deleteInkomst("id1");
    expect(categorieService.removeCategorieInkomst).toHaveBeenCalledWith(
      "cat1",
      10
    );
    expect(deleteDoc).toHaveBeenCalled();
  });

  it("updateInkomstCategorie updates categorie and calls add/remove", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ categorieId: "old", hoeveelheid: 5 }),
    });
    await inkomstenService.updateInkomstCategorie("id1", "new");
    expect(categorieService.removeCategorieInkomst).toHaveBeenCalledWith(
      "old",
      5
    );
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
      categorieId: "new",
    });
    expect(categorieService.addCategorieInkomst).toHaveBeenCalledWith("new", 5);
  });

  it("getInkomstById returns inkomst data", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1" }),
      id: "id1",
    });
    const inkomst = await inkomstenService.getInkomstById("id1");
    expect(inkomst).toEqual({ id: "id1" });
  });
});
