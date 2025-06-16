import { subscribeToDocument, subscribeToCollection } from "./firestoreService";
import { onSnapshot } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe("firestoreService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("subscribeToDocument calls onSnapshot with correct args", () => {
    const mockOnUpdate = jest.fn();
    const mockOnError = jest.fn();
    const mockSnap = { exists: () => true, data: () => ({ foo: "bar" }) };
    (onSnapshot as jest.Mock).mockImplementation((ref, onNext, onErr) => {
      onNext(mockSnap);
      return () => {};
    });
    subscribeToDocument({} as any, ["col", "id"], mockOnUpdate, mockOnError);
    expect(mockOnUpdate).toHaveBeenCalledWith({ foo: "bar" });
  });

  it("subscribeToDocument calls onUpdate(null) if !exists", () => {
    const mockOnUpdate = jest.fn();
    const mockOnError = jest.fn();
    const mockSnap = { exists: () => false };
    (onSnapshot as jest.Mock).mockImplementation((ref, onNext, onErr) => {
      onNext(mockSnap);
      return () => {};
    });
    subscribeToDocument({} as any, ["col", "id"], mockOnUpdate, mockOnError);
    expect(mockOnUpdate).toHaveBeenCalledWith(null);
  });

  it("subscribeToCollection calls onSnapshot and onUpdate with items", () => {
    const mockOnUpdate = jest.fn();
    const mockOnError = jest.fn();
    const mockSnap = {
      docs: [
        { id: "1", data: () => ({ foo: "bar" }) },
        { id: "2", data: () => ({ foo: "baz" }) },
      ],
    };
    (onSnapshot as jest.Mock).mockImplementation((ref, onNext, onErr) => {
      onNext(mockSnap);
      return () => {};
    });
    subscribeToCollection({} as any, "col", mockOnUpdate, mockOnError);
    expect(mockOnUpdate).toHaveBeenCalledWith([
      { id: "1", foo: "bar" },
      { id: "2", foo: "baz" },
    ]);
  });
});
