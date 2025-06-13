import { renderHook } from "@testing-library/react";
import { useHuishoudboekjes } from "./useHuishoudboekjes";
import * as AuthContext from "../../contexts/AuthContext";
import * as useCollectionModule from "../../hooks/useCollection";

jest.mock("../../contexts/AuthContext");
jest.mock("../../hooks/useCollection");

describe("useHuishoudboekjes", () => {
  beforeEach(() => {
    (AuthContext.useAuth as jest.Mock).mockReturnValue({
      user: { id: "user-1" },
    });
    (useCollectionModule.useCollection as jest.Mock).mockReturnValue({
      items: [{ id: "1", naam: "Test", isDeleted: false }],
      loading: false,
      error: null,
    });
  });

  it("returns non-archived huishoudboekjes for the user", () => {
    const { result } = renderHook(() => useHuishoudboekjes());
    expect(result.current.items).toEqual([
      { id: "1", naam: "Test", isDeleted: false },
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("returns loading and error from useCollection", () => {
    (useCollectionModule.useCollection as jest.Mock).mockReturnValueOnce({
      items: [],
      loading: true,
      error: new Error("fail"),
    });
    const { result } = renderHook(() => useHuishoudboekjes());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual(new Error("fail"));
  });
});
