import * as service from "./huishoudboekjeService";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, collectionHuishoudboekjes, collectionUsers } from "../firebase";

jest.mock("firebase/firestore", () => ({
  arrayUnion: jest.fn((v) => v),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  where: jest.fn(),
}));

jest.mock("../firebase", () => ({
  db: {},
  collectionHuishoudboekjes: "huishoudboekjes",
  collectionUsers: "users",
}));

describe("huishoudboekjeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("addParticipant updates participants", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    await service.addParticipant("boekje-1", "user-2");
    expect(updateDoc).toHaveBeenCalledWith("docRef", {
      participants: "user-2",
    });
  });

  it("lookupUserByEmail returns user id if found", async () => {
    (collection as jest.Mock).mockReturnValue("colRef");
    (query as jest.Mock).mockReturnValue("queryRef");
    (getDocs as jest.Mock).mockResolvedValue({
      empty: false,
      docs: [{ data: () => ({ id: "user-1" }) }],
    });
    const id = await service.lookupUserByEmail("test@example.com");
    expect(collection).toHaveBeenCalledWith(db, collectionUsers);
    expect(id).toBe("user-1");
  });

  it("lookupUserByEmail returns null if not found", async () => {
    (getDocs as jest.Mock).mockResolvedValue({ empty: true, docs: [] });
    const id = await service.lookupUserByEmail("test@example.com");
    expect(id).toBeNull();
  });

  it("AddHuishoudboekje calls setDoc with correct data", async () => {
    (collection as jest.Mock).mockReturnValue("colRef");
    (doc as jest.Mock).mockReturnValue({ id: "id1" });
    const entry = { naam: "Test", ownerId: "user-1", participants: [] };
    await service.AddHuishoudboekje(entry as any);
    expect(setDoc).toHaveBeenCalledWith(
      { id: "id1" },
      expect.objectContaining({
        id: "id1",
        naam: "Test",
        ownerId: "user-1",
        participants: [],
        isDeleted: false,
      })
    );
  });

  it("AddHuishoudeboekjeParticipant adds participant if not present", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1", ownerId: "user-1", participants: [] }),
      id: "id1",
      ownerId: "user-1",
    });
    (getDocs as jest.Mock).mockResolvedValue({
      data: () => [{ docs: [{ id: "userId2" }] }],
      docs: [{ data: () => ({ id: "user-2" }) }],
    });
    (doc as jest.Mock).mockReturnValue("docRef");
    await service.AddHuishoudeboekjeParticipant(
      "id1",
      "user-1",
      "mail@example.com"
    );
    expect(updateDoc).toHaveBeenCalled();
  });

  it("AddHuishoudeboekjeParticipant does nothing if participant already present", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1", ownerId: "user-1", participants: ["user-2"] }),
      id: "id1",
    });
    (getDocs as jest.Mock).mockResolvedValue({
      data: () => [{ docs: [{ id: "userId2" }] }],
      docs: [{ data: () => ({ id: "user-2" }) }],
    });
    await service.AddHuishoudeboekjeParticipant(
      "id1",
      "user-1",
      "mail@example.com"
    );
    expect(updateDoc).not.toHaveBeenCalled();
  });

  it("GetHuishoudboekjeById returns boekje if owner matches", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ ownerId: "user-1", naam: "Test" }),
      id: "id1",
    });
    const boekje = await service.GetHuishoudboekjeById("id1", "user-1");
    expect(boekje).toEqual({ ownerId: "user-1", naam: "Test" });
  });

  it("GetHuishoudboekjeById throws if not found", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    (getDoc as jest.Mock).mockResolvedValue(null);
    await expect(
      service.GetHuishoudboekjeById("id1", "user-1")
    ).rejects.toThrow(/Huishoudboekje niet gevonden/);
  });

  it("ArchiveerHuishoudboekjes updates isDeleted to true", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1", ownerId: "user-1" }),
      id: "id1",
      ownerId: "user-1",
    });
    (doc as jest.Mock).mockReturnValue("docRef");
    await service.ArchiveerHuishoudboekjes("id1", "user-1");
    expect(updateDoc).toHaveBeenCalledWith("docRef", { isDeleted: true });
  });

  it("OnArchiveerHuishoudboekjes updates isDeleted to false", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1", ownerId: "user-1" }),
      id: "id1",
      ownerId: "user-1",
    });
    await service.OnArchiveerHuishoudboekjes("id1", "user-1");
    expect(updateDoc).toHaveBeenCalledWith("docRef", { isDeleted: false });
  });

  it("UpdateHuishoudboekje updates boekje", async () => {
    (doc as jest.Mock).mockReturnValue("docRef");
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ id: "id1", ownerId: "user-1" }),
      id: "id1",
      ownerId: "user-1",
    });
    await service.UpdateHuishoudboekje({ id: "id1", ownerId: "user-1" } as any);
    expect(updateDoc).toHaveBeenCalledWith("docRef", {
      id: "id1",
      ownerId: "user-1",
    });
  });
});
