import { AddUser } from "./userService";
import { addDoc, collection } from "firebase/firestore";
import { db, collectionUsers } from "../firebase";

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

jest.mock("../firebase", () => ({
  db: {},
  collectionUsers: "users",
}));

describe("userService", () => {
  it("calls addDoc with correct arguments", async () => {
    const user = { id: "1", name: "Test" };
    (collection as jest.Mock).mockReturnValue("collectionRef");
    await AddUser(user as any);
    expect(collection).toHaveBeenCalledWith(db, collectionUsers);
    expect(addDoc).toHaveBeenCalledWith("collectionRef", user);
  });
});
